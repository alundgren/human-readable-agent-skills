# human-readable-agent-skills

Agent skills for people who review more agent output than they can read.

## Skills

| Skill | What it does |
| --- | --- |
| `pr-visual-guided-review` | Writes a diagram-first HTML review of one pull request, with drill-down architecture, UI, and findings tabs. |
| `pr-visual-overview` | Draws what one pull request does, with the same drill-down architecture and UI tabs and no findings. Pair it with another review. |
| `repo-visual-overview` | Draws how one repository works, with drill-down architecture and UI tabs and no findings. |

## Install

```bash
npx skills add alundgren/human-readable-agent-skills --skill pr-visual-guided-review -g
npx skills add alundgren/human-readable-agent-skills --skill pr-visual-overview -g
npx skills add alundgren/human-readable-agent-skills --skill repo-visual-overview -g
```

The skills work in Claude Code and Codex. They never start on their own.
Invoke one with `/<skill> <target>` in Claude Code or `$<skill> <target>` in
Codex. The target is a PR URL for the PR skills, and a GitHub repository or a
local folder for `repo-visual-overview`. With no target,
`repo-visual-overview` draws the current checkout.

## Credits

The pages use a visual style inspired by
[OpenGhost](https://github.com/andretripol/OpenGhost) (MIT, Copyright (c) 2026
Andrew). No OpenGhost code is included.

## License

MIT
