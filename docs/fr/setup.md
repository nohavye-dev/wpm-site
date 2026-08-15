# Installation — configurer WPM sur un projet

WPM est un **serveur MCP** (Model Context Protocol). Pour l'utiliser, il
faut donc un client MCP : **OpenCode**, la plupart des clients MCP de
LLM, ou les outils de test décrits plus bas.

---

## 1. Prérequis

- **Python 3.11+** et `pip`.
- **OpenCode ≥ 1.18** (ou tout client MCP supportant un serveur local),
  pour une utilisation en assistant IA.
- **Git** pour le script d'installation.
- Les **11 outils MCP** fournis par le serveur `wpm` (voir
  [`agent-behavior.md`](agent-behavior.md) pour la liste complète).

---

## 2. Installation via le script

```bash
mkdir -p "$HOME/.local/share/wpm" && \
git clone https://github.com/nohavye-dev/wpm-system.git "$HOME/.local/share/wpm/wpm-system"
```

Ce clone contient le package (script `install.sh`, source du serveur,
`wpm.config.example.json`).

**Activation du MCP** : le serveur MCP est configuré dans le fichier de
config de votre client. Pour OpenCode, ajoutez ceci à `opencode.json` :

```json
{
  "mcp": {
    "wpm": {
      "type": "local",
      "command": ["bash", "-c", "source \"$HOME/.local/share/wpm/wpm-system/wpm-mcp-server/.venv/bin/activate\" && \"$HOME/.local/share/wpm/wpm-system/wpm-mcp-server/wpm\" "],
      "environment": {
        "WPM_ROOT": "<chemin de votre projet>",
        "WPM_ALPHA": "0.8"
      }
    }
  }
}
```

> `WPM_ROOT` doit pointer vers le **projet** qui bénéficie de la mémoire.
> Le `.venv` est créé par `install.sh` au premier lancement.

---

## 3. Ce qui se passe ensuite

- Le serveur lance un sous-processus `bootstrap`, qui :
  - crée le **schéma SQLite** de la mémoire (`wpm_memory.db` dans
    `<projet>/.wpm/`) ;
  - indexe les **règles du projet** (auto-mémorisées par l'agent,
    `rules/wpm-rules.md`).
- À la **première session** sur un projet avec WPM actif, l'agent
  mémorise automatiquement la structure et les conventions du projet
  (`map` automatique, voir [`workflows.md`](workflows.md)).

---

## 4. Options de configuration

| Variable | Rôle | Défaut |
|---|---|---|
| `WPM_ROOT` | Répertoire du projet qui porte la mémoire | répertoire courant |
| `WPM_ALPHA` | Contrôle le poids des expériences récentes | `0.8` |

Les vitesses de décroissance et les seuils de validation se règlent dans
`wpm.config.json` (voir [`configuration.md`](configuration.md)). Un fichier
`wpm.config.example.json` est fourni dans `wpm-mcp-server/`.

---

## 5. Test rapide

```bash
# Depuis wpm-system/wpm-mcp-server/
source .venv/bin/activate
wpm list-entries      # doit afficher « Aucune entrée » (base vide)
wpm store-entry --content "test" --type insight --source tool_execution
wpm list-entries      # doit afficher 1 entrée
```

Pour le détail des commandes et des flags, voir le
[README du serveur](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/README.md).
