---
name: vercel-deployment-check
description: Verify Vercel deployments for this repository after GitHub pushes, pull request updates, merges into main, production deploys, or deployment failure investigations. Use when Codex needs to confirm the GitHub commit or branch deployed to Vercel, inspect preview or production deployment state, verify production aliases, or diagnose Vercel deployment status for the Indegser website.
---

# Vercel Deployment Check

Use this skill to verify that GitHub activity for `indegser/website` produced the expected Vercel deployment and that production aliases point to a READY deployment when `main` is involved.

## Default Workflow

1. Identify the expected Git commit and branch.

```bash
git log -1 --oneline
git branch --show-current
```

2. Run the helper from the repository root.

```bash
.agents/skills/vercel-deployment-check/scripts/check_vercel_deployment.sh
```

The helper reads `.vercel/project.json` and uses `vercel api` through the local Vercel CLI authentication.

Pass explicit values when verifying a merge commit, a remote branch, or a commit that is not local `HEAD`:

```bash
.agents/skills/vercel-deployment-check/scripts/check_vercel_deployment.sh indegser <sha> <branch>
```

3. Treat the check as passing only when:

- the matching deployment exists,
- the deployment state is `READY`,
- the deployment Git metadata matches the expected branch and SHA,
- `main` deployments have `target=production`,
- `https://www.indegser.com` and `https://indegser.com` inspect to the matching READY deployment for production.

## Manual Fallback

Use these commands when the helper cannot run or when a manual audit is clearer:

```bash
vercel ls indegser
vercel ls indegser -F json
vercel api '/v7/deployments?projectId=<projectId>&teamId=<teamId>&limit=20' --raw
vercel inspect <deployment-url>
vercel inspect <deployment-url> -F json
vercel inspect https://www.indegser.com
vercel inspect https://indegser.com
```

Prefer the Vercel CLI over Vercel MCP for this repo's deployment checks. Use MCP mainly for Vercel documentation lookup or when the CLI is unavailable.

## Failure Investigation

If a deployment is missing, wait briefly and run the helper again before concluding failure. GitHub-triggered deployments can lag behind the push by a short interval.

If the deployment exists but is not READY:

```bash
vercel inspect <deployment-url>
vercel inspect <deployment-url> --logs
```

Run local validation only after confirming what failed remotely:

```bash
pnpm run build
vercel build --prod
```

Use `vercel build --prod` carefully: it is closer to Vercel output generation than `pnpm run build`, but it can recreate `node_modules` and may need network access.

## Knowledge Updates

Load [references/knowledge.md](./references/knowledge.md) when investigating unusual Vercel behavior or updating this skill.

Do not silently add durable knowledge. When a new reusable deployment fact, failure mode, or workflow improvement is discovered:

1. Propose the exact addition to `references/knowledge.md`.
2. Explain why it is reusable.
3. Wait for user approval.
4. Apply the approved update and validate the skill.
