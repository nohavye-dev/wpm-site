# Workflows — the 5 WPM commands

WPM exposes 5 workflows as commands: `learn`, `map`, `bootstrap`, `audit`,
`patterns`. They can be invoked directly (CLI) or by the agent through the
corresponding MCP tools.

Daily usage is described in [`agent-behavior.md`](agent-behavior.md); this
document describes **what each workflow does**.

---

## 1. `wpm learn`

Purpose: **memorize a durable fact** discovered during work.

In one sentence: *"we just discovered this, let's write it down, with its
source and its level of certainty."*

| Point | Detail |
|---|---|
| Entry type | `doc`, `archi_decision`, `insight`, `convention`, `bug_pattern`, `execution_result` |
| Source | `official_doc`, `observed_code`, `tool_execution`, `agent_inference` |
| Effect | creates the entry with an **initial confidence** based on the source (high for a verified fact, low for a hypothesis) |
| Variant | `wpm enable` activates automatic write-as-you-go memorization |

This is the **most used** command: it is what feeds the memory.

---

## 2. `wpm map`

Purpose: **inventory the project** — its structure, conventions, rules.

In one sentence: *"on the first pass over a project, we take notes on how
it is organized."*

| Point | Detail |
|---|---|
| Entry type | `doc`, `insight`, `convention` |
| Source | `observed_code` (default) |
| Effect | memorizes the structure (`src/`, naming conventions, architecture) |
| Auto | run automatically on the first session on a project |

---

## 3. `wpm bootstrap`

Purpose: **initialize the memory store** and the project rules.

In one sentence: *"we prepare the ground the first time."*

| Point | Detail |
|---|---|
| Schema | creates `wpm_memory.db` in `<project>/.wpm/` (`memory` table…) |
| Rules | indexes `rules/wpm-rules.md` (auto-generated) |
| Silent | runs as a subprocess, no output |

It is launched automatically by the server at startup; no need to call it
by hand, except to debug.

---

## 4. `wpm audit`

Purpose: **examine the state of the memory**.

In one sentence: *"what do we have in memory, is it reliable, does it
contradict anything else?"*

| Point | Detail |
|---|---|
| Statistics | number of entries by type, confidence distribution, entries never validated, active contradictions, 5 least reliable entries |
| Diagnostics | lists low-confidence entries (to validate or clean up) |
| Usage | run regularly to keep the memory healthy |

---

## 5. `wpm patterns`

Purpose: **detect recurring patterns** in the memory.

In one sentence: *"are there patterns emerging from the notes that we had
not noticed?"*

| Point | Detail |
|---|---|
| Analysis | highlights regularities among linked entries |
| Usage | useful at the end of work or a sprint to capitalize |
| Status | experimental workflow, results to interpret |

---

## Summary

| Command | Purpose | Frequency |
|---|---|---|
| `learn` | memorize a fact | as you go |
| `map` | inventory the project | first session + new things |
| `bootstrap` | initialize the store | automatic |
| `audit` | diagnose the memory | regularly |
| `patterns` | detect regularities | occasional |

Memorization of these commands is **automatic**: when the agent runs them,
the useful results are persisted in memory (via `record_execution` for
verification commands, via `store_entry` for discovered facts).
