# Diagram types

Pick the type that answers the question of the level you are drawing. One
diagram answers one question. Draw only what the change touches, plus the
untouched neighbours needed to place it.

Every type uses the same marks and the helpers in
`assets/template.html`: `part()` for any box, column, state, or table,
`neighbour()` for faded context at the edges, `frame()` for the part you
opened, `arrow()`, and `badge()`. Any part may open a deeper level. Mark it
with the `›` and give the child its own question.

## Marks

The person uses this page many times a day and learns the marks quickly.
`assets/marks.html` shows each one and the helper that draws it.

- Never draw a legend.
- A mark means the same in every diagram type: a box, a sequence column, a
  state, a table, a screen region.
- The round `›` is the only sign that something opens. Never put it on
  anything static, and never make a part clickable without it.
- Never use thick or colored outlines to mark new or changed parts.
- Labels sit inside or right next to their part. Never shrink text below
  11 px to fit more in. Cut content instead.
- Leave space. A diagram with room around each part reads faster than a full
  one.

## Pick the type

Choose from the change, not by habit:

| The change… | Start with |
| --- | --- |
| adds or rewires parts of the system | system map |
| changes how parts talk, in order | sequence |
| adds a lifecycle: pause, retry, expire | state machine |
| adds or alters stored data | data model |
| changes logic with new branches | flowchart before/after |
| touches code many others import | dependency graph |
| changes infra, config, or deployment | deployment |
| needs steps in a fixed order to ship | order of steps |
| changes endpoints, flags, or config keys | contract table |
| changes a screen | screen before/after |

## Architecture

### System map

**Answers:** where does the change sit, and what did it add or touch?
**Use for:** placing the change among the parts it talks to.
**Draw:** the parts the change adds or changes, plus one ring of untouched
neighbours they talk to. Five to seven parts at most. External systems are
pills at the edge.

### Layers

**Answers:** which layers does one request pass through?
**Use for:** a change that cuts top to bottom, such as UI to API to storage.
**Draw:** horizontal bands, one per layer, with the changed piece inside each
band and one vertical arrow through them.

### Data flow

**Answers:** where does the data come from, how does it change, where does it
end up?
**Use for:** imports, exports, pipelines, generation, sync.
**Draw:** left to right. Stores are rounded, steps are boxes, arrows carry a
one- or two-word label for what moves, or a tiny example value such as
`3 notes`. One branch per view.

### Sequence

**Answers:** who calls whom, in what order?
**Use for:** a protocol, a handshake, a retry path, anything where order is
the point. Often the inside of one part from the system map: its own pieces
as columns, its neighbours as faded columns at the edges.
**Draw:** one column per participant with a dashed lifeline. Numbered arrows
top to bottom. Six to ten steps at most.

### State machine

**Answers:** which states can this be in, and what moves it between them?
**Use for:** jobs, runs, tokens, anything with pause, stop, retry, expire.
**Draw:** rounded states, arrows labelled with the event. A broken transition
is a red dashed arrow with its finding badge.

### Data model

**Answers:** what is stored, and how do the pieces relate?
**Use for:** new tables, records, files, schema changes.
**Draw:** one table per entity with its name and at most four key fields.
A plain line end for one, a three-prong fork for many. New fields marked.

### Flowchart before/after

**Answers:** which branches are new, and which have no test?
**Use for:** validation, permission checks, error handling, any logic change.
**Draw:** the decision diamonds and outcomes the change adds or alters, with
the untouched path faded. Mark a branch with no test with a short red
`no test` label. When the old logic matters, put before and after side by
side.

### Dependency graph

**Answers:** what else depends on the changed code, and which new
dependencies did it add?
**Use for:** shared modules, libraries, anything many callers import.
**Draw:** the changed module in the middle, its dependents faded on the left,
what it uses on the right. A new third-party package is a pill marked new.
Count dependents instead of drawing more than five.

### Deployment

**Answers:** where does it run?
**Use for:** infra, config, environment, and container changes.
**Draw:** environments or regions as faded frames, the services inside them
as parts. Mark what changed. Number the rollout order if it matters.

### Order of steps

**Answers:** what must happen before what, to ship this safely?
**Use for:** migrations, backfills, flag flips, multi-step rollouts.
**Draw:** a horizontal line with numbered steps. Mark a step that cannot be
undone, or that has no rollback, in red.

### Contract table

**Answers:** which endpoints, flags, config keys, or permissions changed?
**Use for:** API, config, and permission changes. A table beats a diagram.
**Draw:** an HTML table, not an SVG: a `+`, `~`, or removed mark, the exact
name in mono, and the change in two to five words. No other columns.

## UI/UX

### Screen before/after

**Answers:** what changed on the screen the end user already knows?
**Use for:** a change to a screen the end user already knows.
**Draw:** the screen before and after, side by side, with the same layout and
landmarks in both. Real labels from the code for controls that matter, grey
lines for user content. Mark only the new and changed regions.

### Journey storyboard

**Answers:** which screens does an end user go through?
**Use for:** a flow across screens, such as setup, a wizard, or a reset.
**Draw:** small screen thumbnails left to right, arrows labelled with the end
user's action, the known starting screen faded at the left edge. Six screens
at most per row.

### Screen states

**Answers:** which states can this screen be in?
**Use for:** the inside of one screen: ready, empty, loading, error, long
content. Draw a broken state in red with its finding badge.

### Sweep grid

**Answers:** where does one change apply, and is it the same everywhere?
**Use for:** a change across many screens or components, such as a shared
control, a header, or a theme.
**Draw:** one example wireframe showing the change, next to a grid of small
tiles, one per affected screen. Tiles where it differs or has a finding get a
badge.

## Inside a finding

### Trust boundary

**Answers:** where does untrusted data cross into trusted code, and what check
is missing?
**Use for:** a security finding where the path matters more than the line.
**Draw:** a small diagram under the finding's Problem: the trusted zone as a
dashed frame, the untrusted source outside it, the crossing marked red with a
three- or four-word label. Add it to `FINDING_DIAGRAMS` in the template, keyed by the
finding ID.

Other findings get no diagram. The code under Where is the evidence.
