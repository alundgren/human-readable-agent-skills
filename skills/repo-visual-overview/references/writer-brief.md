# Writer brief

You read one repository and draw how it works as one self-contained HTML
page: `<output folder>/<name>-<head7>.html`, where `<name>` is
`<owner>-<repo>` for a GitHub repository or the folder name for a local one,
and `<head7>` is the first seven characters of the commit you read.

You get a GitHub repository or a local folder. Read a local folder where it
is, on its current branch. Clone a GitHub repository shallowly, on its
default branch, into a new empty temporary folder, and read it there.

Read these first, all in this skill's folder:

- `assets/template.html`: the page. Copy it and fill in `REPO` and `TREES`.
  Keep its CSS, drawing helpers, and page logic.
- `assets/marks.html`: how each mark looks, one at a time.
- `references/diagram-types.md`: which diagram to use, and how marks work.

The page follows only this skill. Ignore other skills, style guides, and the
repository's design system.

## The reader

One person who has to understand a codebase they do not know, before they
work in it, review changes to it, or direct agents in it. They may know the
product. They use this page often, so they know its symbols: no legends, no
explanations of the page itself.

Every line, label, and visual must help them understand how the code works.
If removing it would not change what they understand, remove it. Never put on
the page: how you made it, what you checked, which model you are,
disclaimers, praise, or a recap of the README.

## Describe, do not judge

The page shows how the repository works, not whether it is good. Do not rate
quality, mark problems, or suggest changes.

## What to read

You cannot read everything in a large repository. Start with the README,
any `AGENTS.md` or `CLAUDE.md`, the folder layout, the package and build
files, and the entry points. Then read just enough of each main part to draw
it and the level below it.

## Trees

Architecture and UI/UX are trees. The person starts at the top diagram and
opens parts to go deeper.

### Rules for every level

1. **The top shows the whole repository.** Use as many diagrams as it takes
   to understand it at a glance. Each deeper level explains one part.
2. **Opening a part shows what is inside it.** Any part of a diagram can open:
   a box in a system map, a column in a sequence diagram, a state, a screen, a
   table. The child view shows that part's own insides, in whichever diagram
   type explains them best. The type may change from level to level.
3. **Neighbours stay at the edges, faded.** The things the opened part talked
   to in the level above appear at the edges of the child view with the
   `neighbour()` helper, joined to the same places. The opened part itself is
   drawn as a `frame()` around its insides.
4. **Only parts with a useful next level open.** A part opens when its insides
   are hard to guess from its name. Everything else stays static. Go at most
   three levels below the top.
5. **Tabs never link to each other.**
6. **Small.** At most five main parts per view, labels of one to three words.
   No paragraphs or bullet lists inside diagrams. One short `note` sentence is
   allowed at the deepest level.

### Architecture

Show what the main parts are, how they talk, and where data lives. Pick
whichever diagrams explain this repository best.

### UI/UX

Show what the end user sees: the main screens and how they move between
them. Pick whichever diagrams explain this best.

When the repository has no user interface, the tab shows only "No UI".

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
