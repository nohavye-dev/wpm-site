# Configuration — les paramètres de WPM

Cette page décrit le fichier de configuration **`wpm.config.json`** (créé
dans `<projet>/.wpm/` à la première exécution). Un exemple complet est
fourni : [`wpm.config.example.json`](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/wpm.config.example.json).

> **Lecture conseillée avant** : [`concepts.md`](concepts.md) pour
> comprendre les notions de confiance, de décroissance et de preuves.

---

## 1. Structure générale

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

## 2. Stockage (`storage`)

| Clé | Rôle | Défaut |
|---|---|---|
| `root_dir` | dossier de la mémoire dans le projet | `.wpm` |
| `db_path` | fichier SQLite de la mémoire | `wpm_memory.db` |
| `rules_dir` | dossier des règles projet | `rules` |

---

## 3. Décroissance (`decay`)

La confiance d'une entrée **diminue** avec le temps si elle n'est pas
revalidée. Le taux est **par type** : une `doc` ou une `archi_decision`
vieillit très lentement, un `bug_pattern` ou un `insight` plus vite.

| Taux | Effet sur une entrée notée à 0.9 |
|---|---|
| `1e-5` | quasi stable sur des mois (décision d'architecture) |
| `1e-4` | érosion nette après quelques semaines (bug, insight) |

La décroissance s'applique à chaque **lecture** (`query_context`) et à
chaque **écriture** (`store_entry`) : une entrée non touchée depuis
longtemps est moins fiable qu'une entrée régulièrement réutilisée.

---

## 4. Validation (`validation`)

### 4.1 Poids des sources

Confiance de départ d'une entrée selon son origine (voir
[`concepts.md`](concepts.md)) :

| Source | Poids | Lecture |
|---|---|---|
| `official_doc` | `0.9` | document officiel lu et cité |
| `observed_code` | `0.75` | code vu directement |
| `tool_execution` | `0.7` | commande réellement exécutée |
| `agent_inference` | `0.2` | déduction sans preuve directe |

### 4.2 Seuils

| Seuil | Valeur | Rôle |
|---|---|---|
| `low` | `0.3` | en dessous : entrée « à risque », peu fiabilisée |
| `high` | `0.7` | au-dessus : entrée considérée fiable |
| `project_rules` | `0.7` | au-dessus : entrée éligible aux règles projet |

### 4.3 Récompenses et pénalités

- `boost` (`0.05`) : **incrément** de confiance quand une entrée est
  **validée** avec une preuve externe.
- `penalty` (`0.3`) : **décrément** quand une entrée est **contredite**
  (la contradiction fait chuter le score **plus vite** qu'une confirmation
  ne le ferait monter : 0.3 vs 0.05).
- `link_weight` (`0.1`) : bonus de confiance lié aux **liens** entre
  entrées (centralité du graphe).

---

## 5. Rappel (`retrieval`)

| Clé | Rôle | Défaut |
|---|---|---|
| `min_confidence` | seuil en dessous duquel on ne remonte pas une entrée | `0.0` |
| `top_k` | nombre de correspondances renvoyées | `8` |
| `graph_alpha` | poids du graphe (liens) vs similarité vectorielle | `0.5` |

---

## 6. Variables d'environnement

Les variables d'environnement **priment** sur le fichier de config :

| Variable | Effet |
|---|---|
| `WPM_ROOT` | surcharge `storage.root_dir` (répertoire du projet) |
| `WPM_ALPHA` | surcharge `retrieval.graph_alpha` |

---

## 7. FAQ

**Q : Pourquoi `agent_inference` part à 0.2 ?**
Une déduction sans preuve est une hypothèse. Elle reste mémorisée (utile
pour la traçabilité), mais elle doit être validée par une preuve externe
pour gagner en fiabilité.

**Q : Puis-je régler les seuils ?**
Oui, dans `wpm.config.json`. Mais rappel : le modèle de confiance est une
**expérience en cours**, non calibrée sur de vrais projets (voir les
[notes de conception](https://github.com/nohavye-dev/wpm-system/tree/main/docs/internal)).
Changer les valeurs au hasard peut donner une mémoire qui ne reflète plus
la réalité.

**Q : Pourquoi la pénalité (0.3) est-elle si élevée face au boost (0.05) ?**
C'est voulu : mieux vaut une mémoire prudente qu'une mémoire gonflée. Une
contradiction doit être visible et son coût élevé ; un boost, lui, exige
beaucoup de confirmations pour faire grimper durablement une entrée.

---

## 8. Pour aller plus loin

- [`setup.md`](setup.md) — installer et configurer le serveur MCP.
- [`concepts.md`](concepts.md) — les notions de confiance, décroissance, preuves.
- [README du serveur](https://github.com/nohavye-dev/wpm-system/blob/main/wpm-mcp-server/README.md) — les commandes et le protocole.
