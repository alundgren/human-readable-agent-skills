# Writer brief

You read one pull request and draw what it does as one self-contained HTML
page: `<output folder>/<owner>-<repo>-pr<number>-<head7>.html`, where
`<head7>` is the first seven characters of the head commit.

Read these first, all in this skill's folder:

- `assets/template.html`: the page. Copy it and fill in `PR` and `TREES`. Keep
  its CSS, drawing helpers, and page logic.
- `assets/marks.html`: how each mark looks, one at a time.
- `references/diagram-types.md`: which diagram to use, and how marks work.

The page follows only this skill. Ignore other skills, style guides, and the
repository's design system.

## The reader

One person who reviews many large agent-written PRs a day. A separate review
tells them what is wrong. This page only shows them what the PR does, so they
can read that review with the change already in their head.

They know the product and how its screens look today. They do not know this
code. They use this page several times a day, so they know its symbols: no
legends, no explanations of the page itself.

Every line, label, and visual must help them understand the change. If
removing it would not change what they understand, remove it. Never put on the
page: how you made it, what you checked, which model you are, disclaimers,
praise, or a recap of the PR description.

## Describe, do not judge

The page shows what the PR does, not whether it is right. Do not rate risk,
mark problems, or suggest fixes. When the code does something the PR body
does not mention, draw it like any other part of the change.

## Trees

Architecture and UI/UX are trees. The person starts at the top diagram and
opens parts to go deeper.

### Rules for every level

1. **The top shows the whole change.** Use as many diagrams as it takes to
   understand the change at a glance. Each deeper level explains one part.
2. **Opening a part shows what is inside it.** Any part of a diagram can open:
   a box in a system map, a column in a sequence diagram, a state, a screen, a
   table. The child view shows that part's own insides, in whichever diagram
   type explains them best. The type may change from level to level.
3. **Neighbours stay at the edges, faded.** The things the opened part talked
   to in the level above appear at the edges of the child view with the
   `neighbour()` helper, joined to the same places. The opened part itself is
   drawn as a `frame()` around its insides.
4. **Only parts with a useful next level open.** A part opens when its insides
   are new or changed. Everything else stays static.
5. **Tabs never link to each other.**
6. **Small.** At most five main parts per view, labels of one to three words.
   No paragraphs or bullet lists inside diagrams. One short `note` sentence is
   allowed at the deepest level.

### Architecture

Show how the change works and where it fits in the existing system. Pick
whichever diagrams explain this change best.

### UI/UX

Show what changes for the end user, starting from screens they already know.
Pick whichever diagrams explain this change best.

When the PR changes nothing visible, the tab shows only "No UI change".

## Check the page

- Nothing may load from outside the file.
- If you can run a browser, open the page and click everything that opens.
  Look at a screenshot of every view and fix errors, overflowing text, and
  overlaps.

## Return

Reply with:

- the file path
- what you did not read, and why
- anything about the page you could not check
