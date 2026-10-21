# Week 6 lab verification

Checked on 21 October 2026 against implementation commit `ec56407`, which includes
Factory Method commit `ad00ef0`.

## Method

The app was served over a temporary local HTTP server and exercised with Playwright
in headless Microsoft Edge. Each backend used an isolated browser context, without
access to the normal browser profile or its saved tasks.

For the temporary backend check, the server substituted `InMemoryStorageFactory`
for `LocalStorageFactory` in the served `main.js` response. Both the import and
constructor changed in that response. This tested the alternative startup path
without changing the saved project, whose default remains `LocalStorageFactory`.

## Results

| Check | Result |
| --- | --- |
| Exactly ten JavaScript source files in `src/` | PASS |
| Factory Method commit leaves `TodoService.js` unchanged | PASS |
| `main.js` creates its service through `LocalStorageFactory` and does not construct a handler directly | PASS |
| Source has no task-type equality branch or inline `desc: trimmed` construction in `TodoService` | PASS |
| Add Task trims text, adds a normal task, and clears valid input | PASS |
| Add Urgent produces the `[URGENT]` label, high priority styling, and correct workload count | PASS |
| Enter creates a normal task and clears valid input | PASS |
| Short input shows an alert, adds nothing, and preserves the input | PASS |
| Done, Undo, and Delete update lists, workload counts, and the page title | PASS |
| Local-storage tasks survive an actual browser reload | PASS |
| In-memory tasks disappear after an actual browser reload and do not write to local storage | PASS |
| Builder methods chain and produce a `Task` with the expected fields and optional priority/label | PASS |
| No browser JavaScript or console errors during the local-storage interaction checks; no page errors in either backend | PASS |

The reload checks use real browser Web Storage and page reloads. These checks
cover the lab scenarios above rather than every possible input or concurrency
case.

## Checkpoints and design records

- Checkpoint 1: both storage backends work, and the Factory Method commit preserves
  the original service implementation. The later Builder commit intentionally
  updates the service.
- Checkpoint 2: new tasks use `TaskBuilder`; the service and controller have
  separate normal and urgent actions; buttons, Enter, and existing task controls work.
- The implementation is already present on GitHub `main`. The required design
  records are [Factory Method #7](https://github.com/granitllugiqi/swen383-todo/issues/7)
  and [Builder #8](https://github.com/granitllugiqi/swen383-todo/issues/8).
