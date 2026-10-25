# Review checks

Run every check. Report a finding only when it could change what the person
does with the PR: merge, ask for a fix, or look closer. Skip style nits,
formatting, naming taste, and praise. A linter or type checker catches those
anyway.

## Rating every finding

**Severity:** what happens if this merges as is.

- `high`: wrong results, data loss, a security hole, broken users, or a
  change that is hard to undo.
- `medium`: a real defect or cost with a workaround, or one that will grow.

Anything smaller is not a finding. Leave it out.

**Confidence:** how sure you are it is real.

- `sure`: you traced it in the code, or ran it.
- `likely`: strong reading of the code, but you did not prove it.

If you cannot get to at least `likely`, leave it out. A guess costs the
person attention and gives them nothing to act on.

**Origin:**

- `introduced`: this PR causes it.
- `pre-existing`: it was already there, and this PR makes it matter more.
  Report pre-existing problems only then.

Check the base before you choose. Agents often blame
a PR for behaviour that was already there.

**Same bug elsewhere:** whenever you find a bug, search the repository for
the same pattern. List other places in the same finding instead of adding new
findings.

## Checks

### `security`

- Every new entry point checks who the caller is and what they may do. Look
  for routes, handlers, IPC channels, jobs, and webhooks.
- Untrusted input is validated and bounded: size, count, time.
- Secrets and personal data stay out of logs, errors, URLs, and the client.
- "Not found" and "no access" do not leak which one it is, where that matters.
- Missing config or a disabled flag fails closed, not open.

### `architecture`

- Does it fit how the codebase already does this kind of thing?
- Does it use an existing concept, but in the wrong way?
- Does it add a new concept? Name it, and say whether an existing one already
  does the job.
- Is it a workaround for a problem that should be fixed where it lives?
- Does it rely on code that changed on the base branch since the agent
  started? Check that called functions and contracts still exist at the base.

### `ui-ux`

- Each screen has one clear purpose.
- It uses standard patterns for its controls and flows.
- It does not show more than the end user needs at that moment.
- Empty, loading, error, and long-content states exist and make sense.
- Dangerous actions look different from safe ones and can be undone or
  confirmed.
- It works with a keyboard, has labels for controls, and has enough contrast.

### `performance`

- Work inside loops, render paths, or per-request paths that could run once.
- Repeated queries or calls where one would do.
- Lists, caches, or memory that grow without a limit.
- Slow work blocking the main thread or the UI.
- Large new bundles or assets.

### `tests`

- Do tests check the requirement, or only repeat the implementation? A test
  that asserts a mock was called proves little.
- Which kinds exist: unit, integration, end-to-end. Is the main path covered
  at the level where it could really break?
- **Tests changed so they pass.** Diff test, CI, and lint config files against
  the base. Look for loosened assertions, changed expected values, new skips,
  deleted tests, answers hard-coded for one fixture, and relaxed rules.
- When the same agent wrote both code and tests, trust passing tests less.

### `overengineering`

- Handling for edge cases that will almost never happen, at real cost in code.
- An abstraction with one user, config nobody will set, or a recovery path for
  a state that cannot occur.
- Every substantial addition (a dependency, a state machine, a process, a
  protocol) needs a requirement that asks for it.

### `dependencies`

- List every new third-party package.
- For each one: does it exist in the registry under exactly that name? How
  old is it, who maintains it, how widely is it used, what is its license?
  Agents invent package names, and attackers register them.
- Does the project already have something that does the same job?
- Unexplained lockfile churn.

### `errors-races`

- Errors swallowed, caught too broadly, or hidden by a fallback that looks like
  success.
- Check-then-act races, lost updates, and work that depends on order without
  enforcing it.
- Retries that are not safe to repeat.
- Partial failure that leaves data half-changed.

### `claims`

- Comments, docs, the PR body, or test names that claim something the code
  does not do: "validated upstream", "safe", "tested", "handles X".
- Docs left out of date by this change.

### `missing-work`

- Map what the PR body and linked issues ask for to the code. Name anything
  asked for that is not there.
- Stub functions, TODOs, and placeholder values left in.

### `scope`

- Changes that have nothing to do with the PR's goal: drive-by refactors,
  reformatting, unrelated fixes. They hide in large PRs and get merged unread.

### `rollout`

- Database or storage migrations: their order, whether they can run twice,
  whether old data still loads.
- Old clients or a mix of old and new versions running at once.
- Feature flag defaults.
- Whether a rollback really works after this ships.

### `findable`

Agents find code by file names, folder names, and search hits before they read
anything. They read small files whole, and only the start of large ones. In
order of weight:

1. Folder and file names say what is inside.
2. Function and type names can be found by search, with no clever
   indirection such as names built from strings or deep re-export chains.
3. Files are small enough to read whole. A very large new file is a finding.
4. Code with special rules has an `AGENTS.md` nearby.
5. The first lines of a large file say what it is for.
