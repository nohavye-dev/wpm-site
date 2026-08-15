# Configuration — WPM parameters

This page describes the **`wpm.config.json`** configuration file (created
in `<project>/.wpm/` on first run). A complete example is provided:
[`wpm.config.example.json`](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/wpm.config.example.json).

> **Recommended reading first**: [`concepts.md`](concepts.md) to understand
> the notions of confidence, decay, and evidence.

---

## 1. General structure

```jsonc
{
  "storage": {
    "root_dir": ".wpm",
    "db_path": "wpm_memory.db",
    "rules_dir": "rules"
  },
  "decay": {
    "enabled": true,
    "rates": {
      "doc": 1e-5,
      "archi_decision": 1e-5,
      "insight": 1e-4,
      "convention": 1e-5,
      "bug_pattern": 1e-4
    }
  },
  "validation": {
    "source_weights": {
      "official_doc": 0.9,
      "observed_code": 0.75,
      "tool_execution": 0.7,
      "agent_inference": 0.2
    },
    "thresholds": {
      "low": 0.3,
      "high": 0.7,
      "project_rules": 0.7
    },
    "boost": 0.05,
    "penalty": 0.3,
    "link_weight": 0.1
  },
  "retrieval": {
    "min_confidence": 0.0,
    "top_k": 8,
    "graph_alpha": 0.5
  }
}
```

---

## 2. Storage (`storage`)

| Key | Role | Default |
|---|---|---|
| `root_dir` | memory directory inside the project | `.wpm` |
| `db_path` | SQLite file of the memory | `wpm_memory.db` |
| `rules_dir` | project rules directory | `rules` |

---

## 3. Decay (`decay`)

An entry's confidence **decreases** over time if it is not revalidated. The
rate is **per type**: a `doc` or an `archi_decision` ages very slowly, a
`bug_pattern` or an `insight` faster.

| Rate | Effect on an entry scored 0.9 |
|---|---|
| `1e-5` | almost stable over months (architecture decision) |
| `1e-4` | clear erosion after a few weeks (bug, insight) |

Decay applies on every **read** (`query_context`) and every **write**
(`store_entry`): an entry untouched for a long time is less reliable than
one regularly reused.

---

## 4. Validation (`validation`)

### 4.1 Source weights

Initial confidence of an entry based on its origin (see
[`concepts.md`](concepts.md)):

| Source | Weight | Reading |
|---|---|---|
| `official_doc` | `0.9` | official document read and cited |
| `observed_code` | `0.75` | code seen directly |
| `tool_execution` | `0.7` | command actually executed |
| `agent_inference` | `0.2` | deduction without direct proof |

### 4.2 Thresholds

| Threshold | Value | Role |
|---|---|---|
| `low` | `0.3` | below: "at risk" entry, poorly reliable |
| `high` | `0.7` | above: entry considered reliable |
| `project_rules` | `0.7` | above: entry eligible for project rules |

### 4.3 Rewards and penalties

- `boost` (`0.05`): confidence **increment** when an entry is **validated**
  with external evidence.
- `penalty` (`0.3`): **decrement** when an entry is **contradicted** (a
  contradiction drops the score **faster** than a confirmation raises it:
  0.3 vs 0.05).
- `link_weight` (`0.1`): confidence bonus related to **links** between
  entries (graph centrality).

---

## 5. Retrieval (`retrieval`)

| Key | Role | Default |
|---|---|---|
| `min_confidence` | threshold below which an entry is not surfaced | `0.0` |
| `top_k` | number of matches returned | `8` |
| `graph_alpha` | weight of the graph (links) vs vector similarity | `0.5` |

---

## 6. Environment variables

Environment variables **override** the config file:

| Variable | Effect |
|---|---|
| `WPM_ROOT` | overrides `storage.root_dir` (project directory) |
| `WPM_ALPHA` | overrides `retrieval.graph_alpha` |

---

## 7. FAQ

**Q: Why does `agent_inference` start at 0.2?**
A deduction without proof is a hypothesis. It stays memorized (useful for
traceability), but it must be validated with external evidence to gain
reliability.

**Q: Can I tune the thresholds?**
Yes, in `wpm.config.json`. But note: the confidence model is a **work in
progress**, not calibrated on real projects (see the
[design notes](https://github.com/nohavye-dev/wpm-system/tree/main/docs/internal)).
Changing values at random can produce a memory that no longer reflects
reality.

**Q: Why is the penalty (0.3) so high compared to the boost (0.05)?**
That is intentional: a cautious memory is better than an inflated one. A
contradiction must be visible and costly; a boost, by contrast, requires
many confirmations to durably raise an entry.

---

## 8. Going further

- [`setup.md`](setup.md) — install and configure the MCP server.
- [`concepts.md`](concepts.md) — confidence, decay, and evidence notions.
- [Server README](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/README.md) — the commands and the protocol.
