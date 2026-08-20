# NeuroHub — Docs/App Split Plan

Not executed yet. This is the shared checklist for splitting process documentation out of this repo into a separate private one, without breaking cross-machine sync or any tooling that reads these files from their current path. Both machines read this from the repo, so both can work from the same plan.

## Goal

Right now `NeuroHub` mixes two different things in one repo:

- **The app** — source code, config, everything a visitor to a public portfolio repo should see.
- **Process documentation** — planning docs, session logs, internal notes, and one folder of a real client's actual site (screenshots), none of which are meant to be public.

The plan is to split these into two repos — `NeuroHub` (public-ready) and a new private one for documentation — while:

1. Not breaking any tool that currently reads these files from inside `NeuroHub/` (Claude Code loads `CLAUDE.md` automatically from the project directory; the `fe-*` skills read `ARCHITECTURE.md`, `design-handoff.md`, `page-specs.md`, `discovery-brief.md` from fixed paths; the WORKLOG.md hooks read/write it from a fixed path).
2. Keeping the documentation synced between both computers, same as today.
3. Ending with nothing about the excluded files visible in `NeuroHub`'s git history — not just "removed going forward," gone from every past commit too.

## The mechanism: symlinks + `.gitignore`, not a real move

A symlink is a file that's really just a pointer to another file living somewhere else on disk. Tools that open it (an editor, a `Read` call, a shell script) see the real content transparently — they don't know or care that it's a symlink.

- The real file lives in the new private repo (versioned there, synced between machines via that repo's own git history).
- Inside `NeuroHub/`, at the exact path a tool expects (e.g. `NeuroHub/MILESTONE_LOG.md`), there's a symlink pointing to that real file.
- That symlink's filename is added to `NeuroHub/.gitignore` — so `NeuroHub`'s git never tracks it at all. Not as a file, not as a visible symlink entry. Cloning the public repo, that path simply doesn't exist.

This is different from just deleting the files: deleting only removes them going forward, but they'd still exist in every commit already made. The symlink approach means new commits never contain them in the first place — combined with the one-time history purge (last section) for what's already committed, nothing survives anywhere in `NeuroHub`.

## Step-by-step

### Step 0 — do this from either machine, once

1. Create a new **private** GitHub repo — suggested name `neurohub-docs`, or reuse an existing personal docs/notes repo if one already fits, organized with one folder per project (so this pattern can be reused later for other projects, not just NeuroHub).
2. Clone it somewhere outside `NeuroHub/`, e.g. `~/Development/PORTFOLIO/neurohub-docs/`.
3. Inside it, create a `NeuroHub/` subfolder.

### Step 1 — move the files (on the machine doing the move)

Move these into `neurohub-docs/NeuroHub/`, preserving filenames:

- `ARCHITECTURE.md`
- `CLAUDE.md`
- `MILESTONE_LOG.md`
- `WORKLOG.md`
- `TECH_LEARNING_LOG.md`
- `design-handoff.md`
- `discovery-brief.md`, `discovery-brief.html`, `discovery-brief.pdf`
- `page-specs.md`
- `typography-comparison.html`
- `Screenshoot vesion worpress/` (the whole folder)
- `.claude/settings.json` and `.claude/hooks/` — see note below, this one's different from the rest

**Note on `.claude/`:** these two are currently the one exception in `NeuroHub/.gitignore` (kept tracked specifically so the WORKLOG.md automation works on any machine this repo is cloned to). Once `WORKLOG.md` itself lives in the docs repo, that reason goes away — `.claude/settings.json` and `.claude/hooks/` can move to `neurohub-docs/NeuroHub/.claude/` and get symlinked back the same way as everything else. This also finally matches the general rule already stated in the global `CLAUDE.md` ("`.claude/` va en `.gitignore`") — right now `NeuroHub` is the one place that rule has an exception, and this removes the need for it.

Commit and push these into `neurohub-docs`.

### Step 2 — remove from `NeuroHub`'s tracking and gitignore them

```bash
cd NeuroHub
git rm --cached ARCHITECTURE.md CLAUDE.md MILESTONE_LOG.md WORKLOG.md TECH_LEARNING_LOG.md \
  design-handoff.md discovery-brief.md discovery-brief.html discovery-brief.pdf \
  page-specs.md typography-comparison.html
git rm -r --cached "Screenshoot vesion worpress"
git rm -r --cached .claude
```

`--cached` removes them from git's tracking without touching the actual files on disk yet — the real files still sit there for one more step, until the symlinks replace them.

Add to `NeuroHub/.gitignore`:

```
ARCHITECTURE.md
CLAUDE.md
MILESTONE_LOG.md
WORKLOG.md
TECH_LEARNING_LOG.md
design-handoff.md
discovery-brief.md
discovery-brief.html
discovery-brief.pdf
page-specs.md
typography-comparison.html
Screenshoot vesion worpress/
.claude/
```

(This replaces the current narrower `.claude/*` + exceptions block — the whole folder can be ignored now.)

### Step 3 — replace with symlinks

```bash
cd NeuroHub
ln -s ../neurohub-docs/NeuroHub/ARCHITECTURE.md ARCHITECTURE.md
ln -s ../neurohub-docs/NeuroHub/CLAUDE.md CLAUDE.md
ln -s ../neurohub-docs/NeuroHub/MILESTONE_LOG.md MILESTONE_LOG.md
ln -s ../neurohub-docs/NeuroHub/WORKLOG.md WORKLOG.md
ln -s ../neurohub-docs/NeuroHub/TECH_LEARNING_LOG.md TECH_LEARNING_LOG.md
ln -s ../neurohub-docs/NeuroHub/design-handoff.md design-handoff.md
ln -s ../neurohub-docs/NeuroHub/discovery-brief.md discovery-brief.md
ln -s ../neurohub-docs/NeuroHub/discovery-brief.html discovery-brief.html
ln -s ../neurohub-docs/NeuroHub/discovery-brief.pdf discovery-brief.pdf
ln -s ../neurohub-docs/NeuroHub/page-specs.md page-specs.md
ln -s ../neurohub-docs/NeuroHub/typography-comparison.html typography-comparison.html
ln -s ../neurohub-docs/NeuroHub/Screenshoot\ vesion\ worpress "Screenshoot vesion worpress"
ln -s ../neurohub-docs/NeuroHub/.claude .claude
```

(Paths above assume `neurohub-docs` sits next to `NeuroHub` in the same parent folder, matching Step 0. Adjust the `../` if your folder layout differs.)

Verify: `cat CLAUDE.md` from inside `NeuroHub/` should show the real content, transparently. `git status` in `NeuroHub` should show nothing for any of these — no file, no symlink, no diff.

### Step 4 — repeat on the other machine

The other computer doesn't need to move anything (the files already moved once, from wherever Step 1 ran) — it just needs to catch up:

1. `git pull` in `neurohub-docs` (gets the real files).
2. `git pull` in `NeuroHub` (gets the updated `.gitignore` and the `git rm`).
3. Delete the local copies of these files/folders in `NeuroHub/` on this machine (they're about to be replaced by symlinks — if this machine had its own uncommitted edits to any of them, reconcile those into `neurohub-docs` first, don't just discard).
4. Run the same `ln -s` block from Step 3 here too.

### Step 5 — purge what's already committed in `NeuroHub`'s history

Steps 1-4 stop anything new from entering `NeuroHub`'s history, but every commit already made (all of today's session, plus earlier ones) still has the old content baked in. This step removes it retroactively.

**Do this once, as the last thing before making `NeuroHub` public** — not now. It rewrites every commit hash from the earliest touched commit onward, which means:

- Requires `git push --force` to update GitHub.
- The other machine's clone of `NeuroHub` will no longer match — it needs a fresh `git clone`, not a `git pull`, after this runs. Doing this mid-project (like right now, while both machines are actively used) creates exactly that kind of disruption — hence waiting.

When ready:

```bash
# from a fresh clone of NeuroHub, per git-filter-repo's own recommendation
git filter-repo --path ARCHITECTURE.md --path CLAUDE.md --path MILESTONE_LOG.md \
  --path WORKLOG.md --path TECH_LEARNING_LOG.md --path design-handoff.md \
  --path discovery-brief.md --path discovery-brief.html --path discovery-brief.pdf \
  --path page-specs.md --path typography-comparison.html \
  --path "Screenshoot vesion worpress" --path .claude \
  --invert-paths
git push --force
```

(`git filter-repo` isn't installed yet — it's a separate tool, `brew install git-filter-repo` on macOS.)

Commits that touched **only** these paths disappear entirely (nothing left to keep). Commits that also touched real app files survive, keep their original author/commit dates, but get a new hash — that's the part that requires the force-push and the other machine's fresh clone.

## Audit — everything else in the project root that isn't core app code

Requested separately: a full pass over what's _not_ essential to the running app, so each item gets a real yes/no instead of assuming. "Essential" here means: the app doesn't build, run, test, lint, or deploy correctly without it.

| Path                                                                  | Essential to the app?   | Notes                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/`, `public/`, `index.html`                                       | Yes                     | The actual application.                                                                                                                                                                                                                                                 |
| `package.json`, `package-lock.json`                                   | Yes                     | Dependencies won't install without them.                                                                                                                                                                                                                                |
| `vite.config.js`, `eslint.config.js`, `.prettierrc.json`              | Yes                     | Build/lint/format config — also genuinely good portfolio signal (real tooling, not just app code).                                                                                                                                                                      |
| `.husky/`, `.github/workflows/ci.yml`                                 | Yes                     | Pre-commit hook + CI pipeline — same as above, this is the kind of thing worth _keeping_ visible in a portfolio repo, not hiding.                                                                                                                                       |
| `.vscode/settings.json`                                               | Yes (as of today)       | Editor config so Prettier format-on-save works for anyone who opens the project — see `MILESTONE_LOG.md` bug entry.                                                                                                                                                     |
| `ARCHITECTURE.md`, `CLAUDE.md`                                        | No — process doc        | In scope for the move above. Worth a second look before deciding "private," though: `ARCHITECTURE.md` specifically reads like real portfolio material (it documents actual engineering decisions and reasoning) — your call whether it's more valuable shown or hidden. |
| `MILESTONE_LOG.md`, `WORKLOG.md`, `TECH_LEARNING_LOG.md`              | No — process doc        | Session-tracking / internal checklist, not meant for a visitor. In scope for the move.                                                                                                                                                                                  |
| `design-handoff.md`, `page-specs.md`, `discovery-brief.md/.html/.pdf` | No — process doc        | Planning artifacts from `fe-brief`/`fe-design`. Same call as `ARCHITECTURE.md` above — real portfolio-quality thinking, but your decision whether it's public-facing or internal.                                                                                       |
| `typography-comparison.html`                                          | No — working file       | A one-off comparison tool used once during design, not part of the live app (never linked from anywhere in `src/`).                                                                                                                                                     |
| `Screenshoot vesion worpress/`                                        | No — reference material | Real screenshots of the actual client's live site (branded "neurored.org"). This is the one with a real confidentiality angle, not just tidiness — recommend private regardless of what you decide for the others.                                                      |
| `.claude/`                                                            | No — tooling config     | Already covered above (folds into the same move, resolves the existing `.gitignore` exception).                                                                                                                                                                         |
| `.remember/`                                                          | Already excluded        | Already fully gitignored, nothing tracked — no action needed.                                                                                                                                                                                                           |

Nothing else in the root fell outside "essential app tooling" or one of the categories above.
