# Concepts — understanding WPM without jargon

This document explains **what WPM does and why**, with as little technical
jargon as possible. For the precise mechanics (data schema, formulas,
protocol), see [`configuration.md`](configuration.md) and the
[GitHub repository](https://github.com/nohavye-dev/wpm-system).

---

## The problem

An AI agent works within a **limited, ephemeral context**. When it learns
an architecture decision, a code convention, or a recurring bug, that
information lives in its current conversation… then disappears at the next
session. Result: every new session starts from scratch, re-reads the code,
re-guesses what had already been understood.

**WPM solves this**: it gives the agent **persistent, project-scoped
memory** that survives sessions.

---

## The idea in one sentence

> A shared notebook for all of the agent's sessions, where every note has
> a **level of reliability** that evolves over time.

What sets WPM apart from a plain note store is that every piece of
information is **weighted**: you know how much you can trust it, and that
trust is maintained or eroded by what happens next.

---

## The concepts, one by one

### 1. Project memory

Everything the agent deems durable about a project is recorded: architecture
decisions, conventions, bug patterns, test results. This memory is stored
**locally, inside the project** (a SQLite file in a `.wpm/` directory), not
in the cloud.

*Analogy: a wiki internal to the project, fed automatically during work,
instead of hand-written documentation that quickly goes stale.*

### 2. Weighted confidence

Every memory entry carries a **confidence score between 0 and 1**. An entry
at 0.9 is almost a certainty; at 0.3, a fragile guess. This score is not
decorative: it decides whether an item is shown to the agent, and with what
weight.

*Analogy: a "to verify" note vs a "confirmed by three sources" note. They
are not treated the same way.*

### 3. Provenance: where the information comes from

The **initial** confidence depends on the origin of the fact:

| Source | Initial confidence | Example |
|---|---|---|
| Official documentation read | high | "the framework docs say…" |
| Code observed directly | medium-high | "this file does X" |
| Command actually executed | medium | "the test passes" |
| Agent inference, no proof | low | "I assume that…" |

A hypothesis stays a hypothesis, even if it feels solid: it starts with
low confidence, and that is normal.

*Analogy: a primary source is worth more than a rumor.*

### 4. Decay

An item that has **not been re-confirmed for a long time** erodes: its
score slowly drops over time. The pace depends on the entry type — an
architecture decision stays reliable for about a year, a test result only
for a few days.

*Analogy: a password written down three months ago is no longer reliable;
a design principle is.*

### 5. Evidence: how confidence rises

An entry only gains confidence through **external, checkable evidence**: a
passing test, a second confirming source, a reuse without failure. Simply
"thinking it is true" **never** raises the score.

*Analogy: you do not validate a hypothesis by repeating it, but by testing
it.*

### 6. Contradiction, never deletion

When an item turns out to be false or outdated, WPM **never deletes** the
old entry: it records a **contradiction** (with its proof). The old entry
stays visible, its score drops faster than a confirmation would raise it —
and the history stays traceable.

*Analogy: you strike a line through a notebook entry rather than tear the
page out, keeping track of what you revised and why.*

### 7. Hybrid recall (vector + graph)

When the agent asks "everything we know about X", WPM combines two
mechanisms:
- **semantic similarity** (finding notes about the same thing, even with
  different wording);
- **the link graph** (following relationships between notes to surface
  related but not identical information).

The result distinguishes **direct matches** (reliable) from **associative
context** (related, so to be mentioned with caution).

*Analogy: a search that returns not only the exact article, but also the
linked pages that shed light on the context.*

### 8. Project rules

WPM automatically recomposes a summary of the project's **most reliable
conventions and decisions** (the "project-rules" block), which the agent
reads at the start of every session. This is what lets it respect project
customs without being re-explained each time.

*Analogy: the "house rules" page of the wiki, updated automatically from
the most reliable notes.*

### 9. Write-as-you-go

The agent records durable facts **as they emerge**, during work, rather
than writing everything at the end (when some of it is already lost). This
is what keeps the memory alive and up to date.

*Analogy: taking notes during a meeting rather than trying to reconstruct
everything a week later.*

---

## How it all fits together

```
              agent work:
              ┌─────────────────────────────────────────┐
              │  as you go: "hey, a durable fact"       │
              │  → store_entry (with source)            │
              └─────────────────┬───────────────────────┘
                                ▼
                      ┌────────────────────┐   each entry has a living confidence:
                      │   memory store     │
                      │  (local SQLite)    │     • rises (evidence)
                      └────────────────────┘     • falls (time, contradictions)
                                │
                                ▼
              ┌───────────────────────────────────────┐
              │  when the agent needs information:    │
              │  query_context → reliable notes       │
              │  surface, uncertain ones stay         │
              │  in the background or flagged         │
              └───────────────────────────────────────┘
```

The agent does not need to "manage" the memory: it writes as it goes and
queries when it needs context. The system handles reliability.

---

## What this solves (goals)

- **Continuity**: sessions no longer start from zero.
- **Reliability**: what is certain is distinguished from what is assumed,
  and false information is not left to pollute decisions.
- **Traceability**: revisions and contradictions stay visible; no silent
  overwrites.
- **Zero friction**: the agent memorizes during work; no config to
  maintain by hand.

---

## Limitations (the project is experimental)

WPM is a **work in progress**. The confidence model (decay rates, weights,
thresholds) is tuned to **reasoned but barely measured** values; it will
need to be validated on real long-term projects. See the
[design notes](https://github.com/nohavye-dev/wpm-system/tree/main/docs/internal)
for details and the validation plan.

---

## Going further

- [`setup.md`](setup.md) — install and enable WPM on a project.
- [`workflows.md`](workflows.md) — the `learn`, `map`, `bootstrap`, `audit`, `patterns` commands.
- [`agent-behavior.md`](agent-behavior.md) — what the agent is expected to do.
- [MCP server README](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/README.md) — the technical side of the server.
