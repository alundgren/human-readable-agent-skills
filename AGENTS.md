# Project guidance

This repo holds agent skills and tools that help a person spend their limited
time and attention well while working with AI agents. Agents can produce far
more than anyone can read. Each skill here turns that output into something a
person can act on quickly.

## Human attention is the scarcest resource

This rule covers what the skills in this repo put in front of a person: the
pages, diagrams, and messages they produce. It does not govern the operator's
other work, their repositories, or other skills.

Every line, label, and visual a person must look at has to earn its place. If
removing it would not change a decision, remove it. Process notes, check
results, and disclaimers go in the agent's reply or in hidden data, never on
what the person sees.

## Layout

- `skills/<name>/SKILL.md` is a skill. `npx skills add` finds skills there.
- Each skill is standalone. It must not depend on other skills, and it keeps
  its own visual style instead of following the operator's or a repository's
  style guides.
- A skill only a person should start sets `disable-model-invocation: true` in
  `SKILL.md` and `policy.allow_implicit_invocation: false` in
  `agents/openai.yaml`. Keep the two flags in step.
- Scripts use Node with no packages, so they run wherever `npx skills` ran,
  including Windows.

## Public repository

This repo is public. Never commit review output, content from private
repositories, local paths, hostnames, or account details. Examples use
made-up projects.
