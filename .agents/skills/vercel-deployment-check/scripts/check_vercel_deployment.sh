#!/usr/bin/env bash
set -euo pipefail

PROJECT="${1:-${VERCEL_PROJECT:-indegser}}"
EXPECTED_SHA="${2:-${EXPECTED_SHA:-}}"
EXPECTED_BRANCH="${3:-${EXPECTED_BRANCH:-}}"

if ! command -v git >/dev/null 2>&1; then
  echo "error: git is required" >&2
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "error: vercel CLI is required" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "error: node is required for JSON parsing" >&2
  exit 1
fi

if [ ! -f ".vercel/project.json" ]; then
  echo "error: .vercel/project.json is required for project and team IDs" >&2
  exit 1
fi

PROJECT_ID="$(node -e 'const fs=require("fs"); const j=JSON.parse(fs.readFileSync(".vercel/project.json","utf8")); process.stdout.write(j.projectId || "");')"
TEAM_ID="$(node -e 'const fs=require("fs"); const j=JSON.parse(fs.readFileSync(".vercel/project.json","utf8")); process.stdout.write(j.orgId || "");')"

if [ -z "$PROJECT_ID" ] || [ -z "$TEAM_ID" ]; then
  echo "error: .vercel/project.json is missing projectId or orgId" >&2
  exit 1
fi

if [ -z "$EXPECTED_SHA" ]; then
  EXPECTED_SHA="$(git rev-parse HEAD)"
fi

if [ -z "$EXPECTED_BRANCH" ]; then
  EXPECTED_BRANCH="$(git branch --show-current)"
fi

if [ -z "$EXPECTED_BRANCH" ]; then
  EXPECTED_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
fi

api_json() {
  local endpoint="$1"
  local destination="$2"
  local output

  if ! output="$(vercel api "$endpoint" --raw 2>&1)"; then
    printf '%s\n' "$output" >&2
    return 1
  fi

  printf '%s\n' "$output" | sed -n '/^[[:space:]]*[{[]/,$p' > "$destination"
}

json_file="$(mktemp)"
alias_file="$(mktemp)"
trap 'rm -f "$json_file" "$alias_file"' EXIT

echo "Vercel deployment check"
echo "Project:  $PROJECT"
echo "Expected: $EXPECTED_BRANCH ${EXPECTED_SHA:0:12}"

if ! api_json "/v7/deployments?projectId=$PROJECT_ID&teamId=$TEAM_ID&limit=20" "$json_file"; then
  echo "error: failed to list Vercel deployments" >&2
  exit 1
fi

if [ ! -s "$json_file" ]; then
  echo "error: Vercel CLI did not return JSON deployment data" >&2
  exit 1
fi

match_line="$(
  node - "$json_file" "$EXPECTED_SHA" "$EXPECTED_BRANCH" <<'NODE'
const fs = require("fs");

const file = process.argv[2];
const expectedSha = process.argv[3];
const expectedBranch = process.argv[4];
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const deployments = data.deployments || [];

const shaMatches = (deployment) => {
  const sha = deployment.meta?.githubCommitSha || "";
  if (!sha) return false;
  return sha === expectedSha || sha.startsWith(expectedSha) || expectedSha.startsWith(sha);
};

let match = deployments.find(shaMatches);
if (!match && expectedBranch) {
  match = deployments.find((deployment) => deployment.meta?.githubCommitRef === expectedBranch);
}

if (!match) {
  process.exit(20);
}

const meta = match.meta || {};
const row = [
  match.url || "",
  match.state || match.readyState || "",
  match.target || "",
  meta.githubCommitSha || "",
  meta.githubCommitRef || "",
  String(match.createdAt || ""),
].join("\t");

console.log(row);
NODE
)" || {
  code=$?
  if [ "$code" -eq 20 ]; then
    echo "error: no Vercel deployment matched $EXPECTED_BRANCH ${EXPECTED_SHA:0:12}" >&2
    echo "hint: wait briefly if the GitHub push or merge just happened, then rerun this check" >&2
    exit 2
  fi
  exit "$code"
}

IFS=$'\t' read -r DEPLOYMENT_URL DEPLOYMENT_STATE DEPLOYMENT_TARGET DEPLOYMENT_SHA DEPLOYMENT_BRANCH DEPLOYMENT_CREATED_AT <<< "$match_line"

echo "Deployment: https://$DEPLOYMENT_URL"
echo "State:      $DEPLOYMENT_STATE"
echo "Target:     ${DEPLOYMENT_TARGET:-preview}"
echo "Git:        $DEPLOYMENT_BRANCH ${DEPLOYMENT_SHA:0:12}"
echo "Created:    $DEPLOYMENT_CREATED_AT"

if [ "$DEPLOYMENT_STATE" != "READY" ]; then
  echo "error: matching deployment is not READY" >&2
  echo "inspect: vercel inspect https://$DEPLOYMENT_URL" >&2
  echo "logs:    vercel inspect https://$DEPLOYMENT_URL --logs" >&2
  exit 3
fi

if [ "$EXPECTED_BRANCH" = "main" ] || [ "$DEPLOYMENT_TARGET" = "production" ]; then
  if [ "$DEPLOYMENT_TARGET" != "production" ]; then
    echo "error: main deployment is READY but target is not production" >&2
    exit 4
  fi

  for domain in "https://www.indegser.com" "https://indegser.com"; do
    alias_id="${domain#https://}"
    if ! api_json "/v13/deployments/$alias_id?teamId=$TEAM_ID" "$alias_file"; then
      echo "error: failed to inspect production alias $domain" >&2
      exit 5
    fi

    alias_line="$(
      node - "$alias_file" <<'NODE'
const fs = require("fs");

const file = process.argv[2];
const data = JSON.parse(fs.readFileSync(file, "utf8"));
console.log([data.url || "", data.readyState || data.status || "", data.target || ""].join("\t"));
NODE
    )"

    IFS=$'\t' read -r ALIAS_URL ALIAS_STATE ALIAS_TARGET <<< "$alias_line"
    echo "Alias:      $domain -> https://$ALIAS_URL ($ALIAS_STATE ${ALIAS_TARGET:-preview})"

    if [ "$ALIAS_URL" != "$DEPLOYMENT_URL" ]; then
      echo "error: production alias $domain does not point to the matching deployment" >&2
      exit 6
    fi

    if [ "$ALIAS_STATE" != "READY" ] || [ "$ALIAS_TARGET" != "production" ]; then
      echo "error: production alias $domain is not a READY production deployment" >&2
      exit 7
    fi
  done
fi

echo "Result:     PASS"
