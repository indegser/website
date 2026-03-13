---
name: git-commit-pr
description: Commit requested changes and open a pull request with repository-safe validation. Use when the user asks to commit, push, open a PR, raise a PR, or wants a one-step git commit plus pull request workflow. Supports conventional commit message generation from the diff, selective staging, validation before commit, branch push, and PR creation with gh or compare URL fallback.
---

# Git Commit and PR Workflow

Use this skill when the user wants local changes turned into a commit and a pull request.

## Outcomes

- Commit only the requested change set.
- Run the smallest validation that safely covers the change.
- Default to creating a new branch from `main` unless the user explicitly asked to continue an existing branch or pull request.
- Push the chosen branch to `origin`.
- Create a pull request with a focused title and body.
- Switch back to `main` after the pull request is created or the compare URL is prepared.
- Report commit, validation, PR link, and any remaining local changes.

## Workflow

1. Confirm scope from the request and inspect repository state.

```bash
git status --short
git branch --show-current
git diff --staged
git diff
```

Classify the request explicitly as one of:

- `continue-existing-branch`
- `new-branch-from-main`

Never reuse the current branch by default.
Use `continue-existing-branch` only when the user explicitly asks to continue the existing branch or PR.
Otherwise default to `new-branch-from-main`.

Before any `git add`, `git commit`, or `git push`, state the branch decision and commit scope in one short line.
After any interrupted turn or context shift, redo this branch classification from scratch.

If the request is `new-branch-from-main`, switch to `main`, fast-forward it, and create a fresh branch before staging:

```bash
git switch main
git pull --ff-only origin main
git switch -c <new-branch-name>
```

2. Stage only the files that belong to the requested work.

```bash
git add path/to/file
git add path/to/file1 path/to/file2
git diff --cached
```

Never stage all files blindly. Do not include unrelated edits, generated noise, secrets, or local environment files.

3. Generate a conventional commit message from the staged diff.

Use:

- `feat` for new behavior
- `fix` for defect correction
- `refactor` for internal structure changes without behavior change
- `docs`, `test`, `build`, `ci`, `chore`, `perf`, `style` as appropriate

Format:

```text
<type>[optional scope]: <short imperative summary>
```

Keep the summary under 72 characters when possible.

4. Validate before commit.

Default validation for this repository:

```bash
pnpm lint
```

If behavior changed, tests were touched, or the risk is not purely static, also run:

```bash
pnpm test
```

Prefer the smallest targeted command that proves the touched change safely.

5. Commit the staged changes.

```bash
git commit -m "type(scope): summary"
```

Do not use `--no-verify` unless the user explicitly asks.
Do not amend a commit unless the user explicitly asks.

6. Push the branch.

```bash
git push -u origin "$(git branch --show-current)"
```

7. Create the pull request.

If `gh` is available and authenticated:

```bash
gh pr create --title "type(scope): summary" --body "$(cat <<'EOF'
## Summary
- item 1
- item 2

## Validation
- pnpm lint
- pnpm test
EOF
)"
```

If `gh` is unavailable or PR creation is blocked, derive the compare URL from the git remote and return that URL with a ready-to-paste PR body.

8. Return to `main`.

After the branch is pushed and the pull request URL or compare URL is ready, switch back to `main`.

```bash
git checkout main
```

If returning to `main` is blocked by local changes, report the blocker clearly instead of forcing the checkout.

## Guardrails

- Never stage unrelated files just because they are modified.
- Never commit `.env*`, credentials, keys, or secrets.
- Never use destructive git commands without explicit user approval.
- Never force-push `main` or `master`.
- If hooks or validation fail, fix the issue and create a new normal commit flow. Do not bypass checks by default.

## Output Format

Report results in this order:

1. Files included in the commit
2. Commit hash and commit message
3. Validation commands run and whether they passed
4. Pull request URL, or compare URL fallback if PR creation was blocked
5. Final checked out branch
6. Remaining uncommitted or unstaged files
