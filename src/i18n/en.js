export default {
  nav: {
    home: "Home",
    concepts: "Concepts",
    features: "Features",
    installation: "Installation",
    architecture: "Architecture",
    docs: "Documentation",
  },

  common: {
    phaseBadge: "In trial phase",
    analogy: "Analogy",
    backHome: "Back to home",
    repoPath: "unpublished repo — paths are relative to the local checkout",
  },

  home: {
    hero: {
      badge: "In trial phase",
      title: "WPM",
      subtitle: "Weighted Persistent Memory",
      lead: "A confidence-weighted persistent memory for your AI agent (OpenCode). Architecture decisions, conventions and patterns discovered during a session are not lost at the next one — and above all, we know how reliable each memory is.",
      ctaConcepts: "Discover the concepts",
      ctaInstall: "Install in 3 commands",
    },
    why: {
      title: "Why WPM?",
      text: "An AI agent works in a limited, ephemeral context: what it understands during a session is gone at the next one. WPM gives it a project-local memory, maintained automatically while working, where each piece of information carries a confidence score that evolves over time.",
    },
    ideas: {
      title: "Key ideas",
      intro: "What sets WPM apart from a simple notebook.",
      items: [
        {
          title: "Weighted confidence",
          text: "Each memory has a score (0 to 1); we distinguish what is certain from what is assumed.",
        },
        {
          title: "Provenance",
          text: "An official source is worth more than a deduction; initial confidence depends on it.",
        },
        {
          title: "Proof, not opinions",
          text: "Confidence only rises with verifiable external evidence, never from reasoning alone.",
        },
        {
          title: "Never delete",
          text: "You contradict a piece of information, you do not erase it: history stays traceable.",
        },
        {
          title: "Memorize as you go",
          text: "The agent records durable facts as they emerge, not at the end of a session.",
        },
        {
          title: "Recall at the right time",
          text: "Hybrid search (semantic + graph) to surface the right memory when it matters.",
        },
      ],
    },
    benefits: {
      title: "What you get",
      intro: "Once activated, your agent can:",
      items: [
        "Memorize (store_entry) and recall (query_context) durable facts, in English and deduplicated",
        "Validate (validate_entry) or contradict (contradict_entry) with evidence",
        "Capture tests and builds automatically (record_execution)",
        "Pin, deprecate or restore memories (pin_entry, deprecate_entry, restore_entry)",
        "Read the project rules recomposed from memory",
      ],
      workflowsNote: "Plus ready-made workflows: learn, map, bootstrap, audit, patterns.",
    },
    install: {
      title: "Start in 3 commands",
      steps: [
        {
          cmd: "./install.sh",
          text: "Installs the server + the plugin (global, once)",
        },
        {
          cmd: "wpm enable",
          text: "Activates memory for this project (writes wpm.config.json)",
        },
        {
          cmd: "restart OpenCode",
          text: "That's it.",
        },
      ],
      zeroConfig:
        "Zero OpenCode configuration. The plugin installs itself, registers the MCP server and permissions for you: no mcp entry to add in opencode.json.",
    },
    phase: {
      title: "In trial phase",
      text: "WPM is an ongoing experiment: the idea is promising, the engineering is clean, but the confidence model still needs to be validated on real projects.",
      items: [
        "The stability of OpenCode hooks (experimental.*)",
        "Validation of the confidence model on real projects",
      ],
    },
  },

  concepts: {
    title: "Concepts",
    intro:
      "Understand WPM without jargon. For the precise mechanics (data schema, formulas, protocol), see the technical documentation.",
    problem: {
      title: "The problem",
      text: "An AI agent works in a limited, ephemeral context. When it discovers an architecture decision, a code convention or a recurring bug, that information lives in its current conversation… then disappears at the next session. Result: every new session starts from scratch, re-reads the code, re-guesses what had already been understood.",
      solution:
        "WPM solves this: it gives the agent a persistent, project-specific memory that survives sessions.",
    },
    oneLiner: {
      title: "The idea in one sentence",
      text: "A shared notebook between all of the agent's sessions, where each note has a reliability level that evolves over time.",
      detail:
        "What sets WPM apart from plain note storage is that every piece of information is weighted: we know how much it can be trusted, and that trust is maintained or eroded depending on what happens next.",
    },
    sections: [
      {
        id: "project-memory",
        title: "1. The project memory",
        text: "Everything the agent deems durable about a project is recorded: architecture decisions, conventions, bug patterns, test results. This memory is stored locally, inside the project (a SQLite file in a .wpm/ folder), not in the cloud.",
        analogy:
          "A wiki internal to the project, fed automatically while working, instead of hand-written documentation that quickly goes stale.",
      },
      {
        id: "weighted-confidence",
        title: "2. Weighted confidence",
        text: "Every memory entry carries a confidence score between 0 and 1. An entry at 0.9 is near-certain; at 0.3, a fragile hunch. This score is not decorative: it decides whether information is shown to the agent, and with what weight.",
        analogy:
          "A “to verify” note vs a “confirmed by three sources” note. They are not treated the same way.",
      },
      {
        id: "provenance",
        title: "3. Provenance: where does the information come from?",
        text: "Initial confidence depends on the origin of the fact:",
        table: {
          caption: "Initial confidence by source",
          cols: ["Source", "Initial confidence", "Example"],
          rows: [
            ["Official documentation read", "high", "“the framework docs say…”"],
            ["Directly observed code", "medium-high", "“this file does X”"],
            ["Actually executed command result", "medium", "“the test passes”"],
            ["Agent deduction, no evidence", "low", "“I assume that…”"],
          ],
        },
        note: "A hypothesis stays a hypothesis, even if it seems solid: it starts with low confidence, and that is normal.",
        analogy: "A primary source is worth more than a rumor.",
      },
      {
        id: "decay",
        title: "4. Decay",
        text: "Information that has not been confirmed for a long time erodes: its score slowly drops over time. The pace depends on the type of information — an architecture decision stays reliable ~1 year, a test result only a few days.",
        analogy:
          "A password jotted down three months ago is no longer reliable; a design principle is.",
      },
      {
        id: "evidence",
        title: "5. Evidence: how confidence rises",
        text: "An entry only gains confidence through external, verifiable evidence. Plain “I think it is true” never raises the score.",
        table: {
          caption: "Evidence hierarchy",
          cols: ["Evidence", "Strength", "Effect"],
          rows: [
            ["execution_verified", "strong", "test/build/command executed, result observed"],
            ["cross_reference", "medium", "independent confirmation by another source"],
            ["reuse_without_failure", "weak", "reused without failure — weak signal"],
            ["agent_reasoning", "none", "logged, never moves the score"],
          ],
        },
        analogy: "You do not validate a hypothesis by repeating it, but by testing it.",
      },
      {
        id: "contradiction",
        title: "6. Contradiction, never deletion",
        text: "When information turns out to be false or outdated, WPM never deletes the old entry: it records a contradiction (with its evidence). The old entry stays visible, its score drops faster than a confirmation would raise it — and history stays traceable.",
        analogy:
          "Cross out a line in the notebook rather than tear it out, to keep track of what was revised and why.",
      },
      {
        id: "hybrid-recall",
        title: "7. Hybrid recall (vector + graph)",
        text: "When the agent looks up “everything we know about X”, WPM combines two mechanisms: semantic similarity (finding notes about the same thing, even with different words) and the link graph (following relations between notes to surface related but not identical information). The result separates direct matches (reliable) from associative context (related, so to be mentioned with caution).",
        analogy:
          "A search that finds not only the exact article, but also the linked pages that shed light on the context.",
      },
      {
        id: "project-rules",
        title: "8. The project rules",
        text: "WPM automatically recomposes a summary of the most reliable conventions and decisions of the project (the “project-rules” block), read by the agent at session start. That is how it respects project conventions without being re-explained each time.",
        analogy:
          "The “house rules” page of the wiki, updated by itself from the most reliable notes.",
      },
      {
        id: "as-you-go",
        title: "9. Memorizing as you go",
        text: "The agent records durable facts as soon as they emerge, while working, rather than writing everything at the end (where part would already be lost). That is what keeps memory alive and up to date.",
        analogy:
          "Take notes during the meeting rather than trying to reconstruct everything a week later.",
      },
    ],
    objectives: {
      title: "What it solves",
      items: [
        {
          title: "Continuity",
          text: "sessions no longer start from scratch.",
        },
        {
          title: "Reliability",
          text: "we distinguish what is certain from what is assumed, and false information is not allowed to pollute decisions.",
        },
        {
          title: "Traceability",
          text: "revisions and contradictions stay visible, no silent overwriting.",
        },
        {
          title: "Zero friction",
          text: "the agent memorizes while working; no configuration to maintain by hand.",
        },
      ],
    },
    limits: {
      title: "Limits (project in trial phase)",
      text: "WPM is an ongoing experiment. The confidence model (decay speeds, weights, thresholds) is calibrated on reasoned but barely measured values; it will need to be validated on real long-running projects.",
    },
  },

  features: {
    title: "Features",
    intro: "The server exposes memory via MCP: 11 tools, 3 resources, 6 prompts.",
    tools: {
      title: "The 11 MCP tools",
      cols: ["Tool", "Role"],
      rows: [
        ["store_entry(type, content, source)", "Create an entry (type ∈ doc/archi_decision/insight/convention/bug_pattern/execution_result ; source ∈ official_doc/observed_code/tool_execution/agent_inference)"],
        ["query_context(query, min_confidence?, token_budget?)", "Hybrid retrieval: vector + confidence + graph, with 1-hop expansion"],
        ["validate_entry(entry_id, evidence_type, evidence_ref, session_id)", "Record confirmation evidence (deduplicated per session)"],
        ["contradict_entry(entry_id, conflicting_entry_id, evidence_type, evidence_ref)", "Record a conflict — never deletes, lowers the score + contradicts link"],
        ["link_entries(source_id, target_id, relation_type, weight?)", "Explicit relation (related/contradicts/depends_on/refines)"],
        ["get_memory_stats()", "Diagnostics: totals, confidence distribution, never validated, contradictions, weakest"],
        ["pin_entry(entry_id)", "Pin — confidence never decays"],
        ["deprecate_entry(entry_id)", "Deprecate — excluded from results (reversible)"],
        ["restore_entry(entry_id)", "Restore to active status"],
        ["list_entries(type?, status?, min_confidence?, max_confidence?, limit?, offset?)", "Paginated, filterable listing"],
        ["record_execution(command, succeeded, session_id)", "Capture a test/build/lint: stores an execution_result entry and validates it execution_verified. Trivial commands (ls, cat, grep, git status…) are rejected"],
      ],
      note: "type and source are typed (Literal): a value outside the list is rejected by the schema before reaching the code.",
    },
    resources: {
      title: "The 3 resources",
      cols: ["Resource", "Content"],
      rows: [
        ["wpm://project-rules", "Project conventions/decisions (≥ confidence_threshold), project-rules block"],
        ["wpm://memory-rules", "Usage rules (same content as instructions)"],
        ["wpm://verification-commands", "Commands that count as strong evidence"],
      ],
    },
    prompts: {
      title: "The 6 prompts",
      cols: ["Prompt", "Role"],
      rows: [
        ["persist", "End-of-task checklist"],
        ["audit", "Memory health review"],
        ["learn(paths)", "Ingest markdown documents, section by section"],
        ["map(scopes)", "Map directories/files"],
        ["bootstrap", "Initial population (README, docs, configs, CI)"],
        ["patterns(type_filter)", "Recurring pattern analysis"],
      ],
      note: "In OpenCode: slash commands /wpm:learn:mcp, etc.",
    },
    workflows: {
      title: "The 5 workflows",
      intro: "Five ready-made workflows to feed or inspect the project memory. In OpenCode, they are slash commands (e.g. /wpm:learn:mcp); they only run on explicit invocation.",
      items: [
        {
          title: "learn <paths>",
          text: "Ingests one or more markdown documents, section by section. Each section becomes a candidate entry, deduplicated before writing, translated into English.",
        },
        {
          title: "map [scopes]",
          text: "Maps the architecture and conventions of the codebase. Not a file-by-file index: only a few structuring facts, always anchored in actually-read code.",
        },
        {
          title: "bootstrap",
          text: "Populates memory from existing artifacts (README, docs, lint configs, CI/CD, folder structure) in a single pass. Run once per project, after wpm enable.",
        },
        {
          title: "audit",
          text: "Read-only dashboard of memory health: total by type, confidence distribution, never-validated entries, active contradictions, 5 weakest entries, recent activity. Ends with a verdict.",
        },
        {
          title: "patterns [type]",
          text: "Analyzes memory to detect recurring patterns and proposes improvements: missing convention, implicit decision, contradiction to resolve. Proposed actions are executed automatically.",
        },
      ],
    },
    embeddings: {
      title: "Embeddings",
      text: "ONNX Runtime + HuggingFace tokenizers (~100 MB), model all-MiniLM-L6-v2 (384 dimensions), downloaded and cached on first run.",
    },
  },

  installation: {
    title: "Installation",
    intro: "WPM is installed once (globally), then activated project by project. The OpenCode plugin is installed by default and registers the MCP server for you: no manual OpenCode configuration needed.",
    steps: [
      {
        id: "global",
        title: "1. Global installation",
        text: "From the repository root:",
        cmd: "./install.sh",
        what: "What install.sh does:",
        items: [
          "creates a dedicated Python environment (~/.local/share/wpm-system/venv) and installs the server in it",
          "pre-downloads the embedding model (~80 MB) for first offline startup",
          "installs the wpm command (~/.local/bin/wpm)",
          "installs the OpenCode plugin in ~/.config/opencode/plugins/ (global)",
        ],
        note: "Paths honor $XDG_DATA_HOME / $XDG_BIN_HOME / $XDG_CONFIG_HOME if set.",
      },
      {
        id: "activate",
        title: "2. Activate a project",
        text: "From the root of the target project:",
        cmd: "wpm enable",
        what: "wpm enable writes wpm.config.json at the project root:",
        items: [
          "db_path defaults to .wpm/wpm.db if absent (existing keys are preserved)",
          "creates the database folder and adds it to .gitignore",
          "creates the database",
          "refuses a db_path that escapes the project (external absolute path, or relative with ..)",
        ],
        customTitle: "For a custom database folder:",
        customCmd: "wpm enable .memory",
      },
      {
        id: "what-next",
        title: "3. What happens next",
        text: "At the next OpenCode start on this project, the plugin detects wpm.config.json and:",
        items: [
          "registers the wpm MCP server (tools wpm_store_entry, wpm_query_context, …)",
          "grants the wpm_* permission so the agent can write memory, even in plan mode",
        ],
        note: "Restart OpenCode after wpm enable (or wpm disable): the configuration is only read once at startup.",
      },
      {
        id: "verify",
        title: "4. Verify it works",
        items: [
          "In OpenCode, the agent should see the wpm_* tools.",
          "From the terminal, in the activated project:",
        ],
        cmd: "wpm search \"a topic name\"",
        note: "Without activation, the tools answer “wpm is not activated in this project”.",
      },
      {
        id: "uninstall",
        title: "5. Disable / uninstall",
        cmds: [
          ["wpm disable", "removes wpm.config.json (data is kept)"],
          ["wpm uninstall", "complete global removal (venv, binary, plugin); --force to skip confirmation"],
          ["./install.sh uninstall", "equivalent, from the repository root"],
        ],
      },
    ],
    config: {
      title: "Configuration — wpm.config.json",
      intro: "In practice, you often have nothing to write by hand: wpm enable creates the file with a default db_path, and most settings are optional.",
      minimalTitle: "Minimal example (often enough):",
      minimalCode: '{ "db_path": ".wpm/wpm.db" }',
      envTitle: "Environment variables",
      envCols: ["Variable", "Overrides"],
      envRows: [
        ["WPM_CONFIG_PATH", "which JSON file is read"],
        ["WPM_DB_PATH", "db_path"],
        ["WPM_RESPONSE_LANGUAGE", "response_language"],
        ["WPM_EMBEDDING_MODEL", "embedding model (default all-MiniLM-L6-v2)"],
      ],
      note: "A missing key keeps its default value; an unknown key (typo) raises an explicit error at startup rather than being ignored.",
    },
  },

  architecture: {
    title: "Architecture",
    intro: "Three pieces make up WPM: a memory server (Python), an OpenCode plugin (TypeScript) and a CLI.",
    components: [
      {
        name: "wpm-mcp-server",
        tag: "Python · MCP",
        text: "The confidence-weighted persistent memory server. SQLite + sqlite-vec + ONNX Runtime. It is the project's source of truth: scoring, decay, graph expansion, MCP tools.",
        items: [
          "11 tools, 3 resources, 6 prompts",
          "Hybrid retrieval: vector + confidence + graph, with 1-hop expansion",
          "type and source typed (Literal) — out-of-list values rejected by the schema",
          "Launched by the OpenCode plugin, or standalone with WPM_DB_PATH",
        ],
      },
      {
        name: "wpm-opencode-plugin",
        tag: "OpenCode · TypeScript",
        text: "The OpenCode plugin, installed by default by install.sh. It does two things a pure MCP server cannot:",
        items: [
          "config — registers the wpm MCP server and the wpm_* permission automatically",
          "experimental.chat.system.transform — re-injects the compact rule card every turn",
          "experimental.session.compacting — reminds to persist before compaction",
          "tool.execute.after — captures tests/builds/lint (wpm record-execution) without relying on the LLM",
          "tool.execute.before — “memory first” nudge before a read/grep/glob",
          "event (session.idle) — triggers the end-of-session persistence pass",
        ],
        warn: "The experimental.* hooks are not stabilized on the OpenCode side and may be silently ignored depending on the version (verified on 1.18.11).",
      },
      {
        name: "scripts/wpm",
        tag: "CLI",
        text: "The wpm command, installed in ~/.local/bin.",
        items: [
          "wpm enable — activates memory (writes wpm.config.json)",
          "wpm disable — removes the config (data kept)",
          "wpm uninstall — complete global removal (venv, binary, plugin)",
          "wpm search — queries memory",
          "wpm record-execution — captures a test/build/lint result",
          "wpm plugin install|uninstall — manages the OpenCode plugin",
        ],
      },
    ],
    stack: {
      title: "Tech stack",
      cols: ["Technology", "Role"],
      rows: [
        ["SQLite", "project-local storage (.wpm/wpm.db)"],
        ["sqlite-vec", "vector search in the database"],
        ["ONNX Runtime + HuggingFace tokenizers", "embeddings (~100 MB)"],
        ["all-MiniLM-L6-v2", "embedding model, 384 dimensions"],
        ["MCP", "protocol: 11 tools, 3 resources, 6 prompts"],
      ],
    },
    flow: {
      title: "The memory cycle",
      steps: [
        {
          head: "The agent works",
          text: "“hey, a durable fact” → store_entry (with source)",
        },
        {
          head: "The memory store (local SQLite)",
          text: "each entry has a living confidence: rises (evidence), drops (time, contradictions)",
        },
        {
          head: "The agent needs info",
          text: "query_context → reliable notes surface, uncertain ones stay in the background or flagged",
        },
      ],
      footer:
        "The agent does not need to “manage” memory: it writes as it goes and queries when it needs context. The system takes care of reliability.",
    },
  },

  docs: {
    title: "Documentation",
    intro: "All of the project's documentation, organized by topic.",
    groups: [
      {
        title: "Root",
        items: [
          ["README.md", "General project overview"],
          ["install.sh", "Global installation in one command"],
        ],
      },
      {
        title: "docs/",
        items: [
          ["docs/concepts.md", "Concepts and how it works, plain-language"],
          ["docs/setup.md", "Installation, activation, uninstallation"],
          ["docs/workflows.md", "The learn, map, bootstrap, audit, patterns workflows"],
          ["docs/agent-behavior.md", "What the agent must do (reference)"],
          ["docs/configuration.md", "wpm.config.json reference"],
          ["docs/internal/", "Internal design notes (validation, calibration)"],
        ],
      },
      {
        title: "Server",
        items: [
          ["wpm-mcp-server/README.md", "The server, technical side"],
          ["wpm-mcp-server/wpm.config.example.json", "Full configuration example"],
        ],
      },
      {
        title: "OpenCode plugin",
        items: [
          ["wpm-opencode-plugin/README.md", "The OpenCode plugin"],
          ["wpm-opencode-plugin/plugin.ts", "The plugin source code"],
        ],
      },
      {
        title: "CLI",
        items: [["scripts/wpm", "The wpm command"]],
      },
    ],
    note: "The repo is not published yet: the paths above are relative to /home/noha/Projets/ai-tools/wpm-system.",
  },

  footer: {
    tagline: "A persistent, confidence-weighted memory for your AI agents.",
    forOpencode: "Built for OpenCode",
    license: "WPM — Weighted Persistent Memory",
  },
};
