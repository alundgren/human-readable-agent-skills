---
name: pr-visual-guided-review
description: Write an interactive, diagram-first HTML review of one GitHub pull request. Run only when explicitly invoked with a PR URL or number.
disable-model-invocation: true
argument-hint: "[pull-request-url-or-number]"
license: MIT
---

# PR visual guided review

A fresh agent reviews one pull request and writes one self-contained HTML
page. It sees only the PR, never this session.

1. Ask which model and reasoning effort should write the review. Offer only
   models this runtime can launch as a fresh agent. No default.
2. Launch one fresh agent on that model with no history: the Agent tool with
   `general-purpose` in Claude Code, `spawn_agent` with `fork_turns: "none"`
   in Codex, or `delegate_task` in T3 Code. Give it only the PR URL, the
   path of `references/writer-brief.md`, and the output folder printed by
   `node <skill-dir>/scripts/reviews.mjs path`.
3. Reply with the page path, the verdict, and the finding counts.

## Files

Only the writer reads these. `references/writer-brief.md` points to the rest:
`references/review-checks.md`, `references/diagram-types.md`,
`assets/template.html`, and `assets/marks.html`.

Old reviews stay until the person asks to remove them. Then run
`node <skill-dir>/scripts/reviews.mjs clean --older-than <days> --dry-run`,
show the list, and run it without `--dry-run` once they confirm.
