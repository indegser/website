# Vercel Deployment Knowledge

This reference stores approved repo-specific Vercel deployment facts and reusable failure notes.

## Project Facts

- Vercel project: `indegser`
- GitHub repo: `indegser/website`
- Production branch: `main`
- Production domains: `https://www.indegser.com`, `https://indegser.com`
- Vercel CLI is the preferred deployment-check tool for this repo.
- Vercel MCP may fail for the `jaekwon-hans-projects` scope with 403 even when the local Vercel CLI is authenticated for that scope.

## Tooling Notes

- Current known-good Vercel CLI update command: `pnpm add -g vercel@latest`
- `vercel ls indegser -F json` returns deployment metadata including `state`, `target`, `meta.githubCommitSha`, and `meta.githubCommitRef`.
- `vercel inspect <url> -F json` returns alias-resolved deployment details, including `url`, `readyState`, `target`, and `aliases`.
- For automation, prefer `vercel api ... --raw` over parsing `vercel ls -F json`; `vercel api` is stable under command substitution and pipes.
- Read `.vercel/project.json` for the Vercel `projectId` and team `orgId` instead of hard-coding those IDs in scripts.

## Failure Notes

- `BUILD_FAILED: Resource provisioning failed` with sub-second duration and empty build logs should be treated first as Vercel provisioning or builder setup failure, not as a Next.js compile error.
- `pnpm run build` validates the app build but does not fully reproduce Vercel output generation.
- `vercel build --prod` is a stronger local reproduction step for Vercel output generation, but it can recreate `node_modules` and may require network access.
