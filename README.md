# human-readable-agent-skills

Agent skills for people who review more agent output than they can read.

## Skills

| Skill | What it does |
| --- | --- |
| `pr-visual-guided-review` | Writes a diagram-first HTML review of one pull request, with drill-down architecture, UI, and findings tabs. |

## Install

```bash
npx skills add alundgren/human-readable-agent-skills --skill pr-visual-guided-review -g
```

The skill works in Claude Code and Codex. It never starts on its own. Invoke it
with `/pr-visual-guided-review <pr-url>` in Claude Code or
`$pr-visual-guided-review <pr-url>` in Codex.

## Credits

The review pages use a visual style inspired by
[OpenGhost](https://github.com/andretripol/OpenGhost) (MIT, Copyright (c) 2026
Andrew). No OpenGhost code is included.

## License

MIT
