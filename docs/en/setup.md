# Setup — configuring WPM on a project

WPM is an **MCP server** (Model Context Protocol). To use it you need an
MCP client: **OpenCode**, most LLM MCP clients, or the test tools described
below.

---

## 1. Prerequisites

- **Python 3.11+** and `pip`.
- **OpenCode ≥ 1.18** (or any MCP client supporting a local server), for
  use as an AI assistant.
- **Git** for the install script.
- The **11 MCP tools** provided by the `wpm` server (see
  [`agent-behavior.md`](agent-behavior.md) for the full list).

---

## 2. Install via the script

```bash
mkdir -p "$HOME/.local/share/wpm" && \
git clone https://github.com/nohavye-dev/wpm-system.git "$HOME/.local/share/wpm/wpm-system"
```

This clone contains the package (the `install.sh` script, the server
source, `wpm.config.example.json`).

**MCP activation**: the MCP server is configured in your client's config
file. For OpenCode, add this to `opencode.json`:

```json
{
  "mcp": {
    "wpm": {
      "type": "local",
      "command": ["bash", "-c", "source \"$HOME/.local/share/wpm/wpm-system/wpm-mcp-server/.venv/bin/activate\" && \"$HOME/.local/share/wpm/wpm-system/wpm-mcp-server/wpm\" "],
      "environment": {
        "WPM_ROOT": "<your project path>",
        "WPM_ALPHA": "0.8"
      }
    }
  }
}
```

> `WPM_ROOT` must point to the **project** that benefits from the memory.
> The `.venv` is created by `install.sh` on first run.

---

## 3. What happens next

- The server launches a `bootstrap` subprocess, which:
  - creates the **SQLite schema** of the memory (`wpm_memory.db` in
    `<project>/.wpm/`);
  - indexes the **project rules** (auto-memorized by the agent,
    `rules/wpm-rules.md`).
- On the **first session** on a project with WPM active, the agent
  automatically memorizes the project structure and conventions
  (automatic `map`, see [`workflows.md`](workflows.md)).

---

## 4. Configuration options

| Variable | Role | Default |
|---|---|---|
| `WPM_ROOT` | Directory of the project carrying the memory | current directory |
| `WPM_ALPHA` | Controls the weight of recent experiences | `0.8` |

Decay rates and validation thresholds are set in `wpm.config.json` (see
[`configuration.md`](configuration.md)). A `wpm.config.example.json` file
is provided in `wpm-mcp-server/`.

---

## 5. Quick test

```bash
# From wpm-system/wpm-mcp-server/
source .venv/bin/activate
wpm list-entries      # should show "No entries" (empty store)
wpm store-entry --content "test" --type insight --source tool_execution
wpm list-entries      # should show 1 entry
```

For the details of commands and flags, see the
[server README](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/README.md).
