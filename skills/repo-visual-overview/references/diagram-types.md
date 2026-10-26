# Diagram types

Pick the type that answers the question of the level you are drawing. One
diagram answers one question. Draw the parts that matter at this level, plus
the neighbours needed to place them.

Every type uses the same marks and the helpers in
`assets/template.html`: `part()` for any box, column, state, or table,
`neighbour()` for faded context at the edges, `frame()` for the part you
opened, and `arrow()`. Any part may open a deeper level. Mark it with the `›`
and give the child its own question.

## Marks

The person uses these pages many times a day and learns the marks quickly.
`assets/marks.html` shows each one and the helper that draws it.

- Never draw a legend.
- A mark means the same in every diagram type: a box, a sequence column, a
  state, a table, a screen region.
- The round `›` is the only sign that something opens. Never put it on
  anything static, and never make a part clickable without it.
- `part` is a main part of the repository. `ctx` is a supporting part, such
  as tests, scripts, or shared helpers, shown only to place the main ones.
  `ext` is a system or package outside the repository.
- Labels sit inside or right next to their part. Never shrink text below
  11 px to fit more in. Cut content instead.
- Leave space. A diagram with room around each part reads faster than a full
  one.

## Pick the type

Choose from what the part does, not by habit:

| The part… | Start with |
| --- | --- |
| is made of several pieces that talk | system map |
| handles one request top to bottom | layers |
| moves or transforms data | data flow |
| follows a protocol where order matters | sequence |
| has a lifecycle: pause, retry, expire | state machine |
| stores data | data model |
| makes decisions with several branches | flowchart |
| is imported by many others | dependency graph |
| runs in more than one place | deployment |
| exposes endpoints, flags, or config keys | contract table |
| is a screen | screen |

## Architecture

### System map

**Answers:** what are the main parts, and which talk to which?
**Use for:** the top of the Architecture tab, and any part with pieces of
its own.
**Draw:** the main parts, plus the outside systems they talk to. Five to seven
parts at most. External systems are pills at the edge.

### Layers

**Answers:** which layers does one request pass through?
**Use for:** code that is organised top to bottom, such as UI to API to
storage.
**Draw:** horizontal bands, one per layer, with the main piece inside each
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
**Draw:** rounded states, arrows labelled with the event.

### Data model

**Answers:** what is stored, and how do the pieces relate?
**Use for:** tables, records, files, schemas.
**Draw:** one table per entity with its name and at most four key fields.
A plain line end for one, a three-prong fork for many.

### Flowchart

**Answers:** which way does the logic go, and where does it branch?
**Use for:** validation, permission checks, routing, error handling.
**Draw:** the decision diamonds and outcomes that matter. Fade the common
path when one branch is the point.

### Dependency graph

**Answers:** what depends on this, and what does it use?
**Use for:** shared modules, libraries, anything many callers import.
**Draw:** the module in the middle, its dependents faded on the left, what it
uses on the right. Third-party packages are pills. Count dependents instead
of drawing more than five.

### Deployment

**Answers:** where does it run?
**Use for:** infra, config, environments, containers.
**Draw:** environments or regions as faded frames, the services inside them
as parts.

### Contract table

**Answers:** which endpoints, flags, config keys, or permissions exist?
**Use for:** APIs, config, and permissions. A table beats a diagram.
**Draw:** an HTML table, not an SVG: the exact name in mono and what it does
in two to five words. No other columns.

## UI/UX

### Screen map

**Answers:** which main screens are there, and how does an end user move
between them?
**Use for:** the top of the UI/UX tab.
**Draw:** small screen thumbnails, arrows labelled with the end user's
action. Five to seven screens at most.

### Screen

**Answers:** what is on this screen?
**Use for:** one screen opened from the screen map.
**Draw:** a wireframe with the real labels from the code for controls that
matter and grey lines for user content.

### Journey storyboard

**Answers:** which screens does an end user go through for one task?
**Use for:** a flow across screens, such as setup, a wizard, or a reset.
**Draw:** small screen thumbnails left to right, arrows labelled with the end
user's action, the starting screen faded at the left edge. Six screens at
most per row.

### Screen states

**Answers:** which states can this screen be in?
**Use for:** the inside of one screen: ready, empty, loading, error, long
content.
