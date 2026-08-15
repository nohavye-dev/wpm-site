# Agent behavior — what the AI does with WPM

This document describes the **expected behavior of the AI agent** when WPM
is active: the reflexes to have, the invariants to respect, and the role of
project rules. For the mechanics of the commands, see
[`workflows.md`](workflows.md); for tuning the parameters,
[`configuration.md`](configuration.md).

> **Reminder**: this behavior is **imposed by the agent's system prompt**,
> not merely suggested. The agent does not "think it's a good idea": it
> does it, because it is its procedure.

---

## The 3 golden rules (absolute priority)

1. **MEMORY FIRST.** Before reading a file or running a search, the agent
   calls `query_context` on the topic. The answer may already be in memory.
2. **WRITE AS YOU GO.** As soon as a durable fact emerges (decision,
   convention, test result, understood bug), the agent calls `store_entry`
   **immediately**. Do not defer persistence: unpersisted facts are lost
   at context compaction.
3. **PROOF BEFORE VALIDATION.** The agent validates an entry only with
   **external, checkable evidence** (a test log, a file path, another
   entry). Never "I think it's true" to raise a score.

---

## The invariants

### Never guess reliability

Confidence is **decided by the system** (entry source, evidence, time), not
by the agent's mood. The agent does not raise its own score: it brings
evidence, and the model does the rest.

### Never delete

Even when an entry is contradicted, the agent **does not delete it**. It
records a contradiction (with its proof), which drops the score of the
faulty entry while keeping the trace.

### Consult memory before answering

At the start of every substantive answer, the agent calls `query_context`
on the current topic. It does not answer from reasoning alone.

### Check conflicts

Before trusting a direct match from `query_context`, the agent looks at the
`conflicts` section (entries with an active "contradicts" link). An entry
with an active conflict must not be considered reliable without further
evidence.

---

## The work cycle

```
              ┌──────────────────────────────────────────────┐
              │  1. MEMORY FIRST                             │
              │  query_context(topic) → is there already     │
              │  a reliable entry on this topic?             │
              └──────────────┬───────────────────────────────┘
                             ▼
              ┌──────────────────────────────────────────────┐
              │  2. WRITE AS YOU GO                          │
              │  durable fact? → store_entry immediately,    │
              │  with source (doc / code / execution /       │
              │  inference)                                  │
              └──────────────┬───────────────────────────────┘
                             ▼
              ┌──────────────────────────────────────────────┐
              │  3. PROOF BEFORE VALIDATION                  │
              │  entry confirmed by external evidence?       │
              │  → validate_entry(evidence, evidence_ref)    │
              │  contradicted? → contradict_entry(evidence)  │
              └──────────────────────────────────────────────┘
```

---

## Links between entries

When two entries are related (an architecture decision **depends on** a
convention, an insight **refines** another), the agent calls
`link_entries(source, target, relation)` with one of the relations:
`related`, `contradicts`, `depends_on`, `refines`. The "contradicts" link
is **reserved** for real contradictions (never to express doubt).

---

## Project rules: "project" memory vs "session" memory

- **Project** memory is persistent and shared across sessions: this is what
  WPM stores and weights.
- Project rules (`rules/wpm-rules.md`) are **recomposed** by the system
  from the most reliable entries; the agent reads them at the start of
  every session to respect the project's conventions.

---

## Pitfalls to avoid

| Pitfall | Correct behavior |
|---|---|
| Validating an entry "to boost it" | Provide external evidence or do nothing |
| Deleting a false entry | Record a contradiction with proof |
| Answering without querying memory | Always `query_context` on the current topic |
| Writing all facts at end of session | `store_entry` as soon as a durable fact emerges |
| Confusing `agent_inference` with a verified fact | Record the true source, even if unflattering |

---

## In summary

WPM does not ask the agent to be **smarter**, just more **rigorous and
disciplined**: query before answering, memorize as you go, prove before
validating. It is this discipline, repeated every session, that keeps the
project's memory reliable over time.
