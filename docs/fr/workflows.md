# Workflows — les 5 commandes de WPM

WPM expose 5 workflows sous forme de commandes : `learn`, `map`,
`bootstrap`, `audit`, `patterns`. Elles peuvent être invoquées
directement (CLI) ou par l'agent via les outils MCP correspondants.

L'usage quotidien est décrit dans [`agent-behavior.md`](agent-behavior.md) ;
ce document décrit **ce que chaque workflow fait**.

---

## 1. `wpm learn`

But : **mémoriser un fait durable** découvert pendant le travail.

En une phrase : *« on vient de découvrir ça, on le note, avec sa source et
son degré de certitude. »*

| Point | Détail |
|---|---|
| Type d'entrée | `doc`, `archi_decision`, `insight`, `convention`, `bug_pattern`, `execution_result` |
| Source | `official_doc`, `observed_code`, `tool_execution`, `agent_inference` |
| Effet | crée l'entrée avec une **confiance de départ** selon la source (haute pour un fait vérifié, basse pour une hypothèse) |
| Variante | `wpm enable` active la mémorisation automatique au fil de l'eau |

C'est la commande **la plus utilisée** : c'est elle qui alimente la mémoire.

---

## 2. `wpm map`

But : **inventorier le projet** — sa structure, ses conventions, ses règles.

En une phrase : *« au premier passage sur un projet, on prend des notes sur
la façon dont il est organisé. »*

| Point | Détail |
|---|---|
| Type d'entrée | `doc`, `insight`, `convention` |
| Source | `observed_code` (défaut) |
| Effet | mémorise la structure (`src/`, conventions de nommage, architecture) |
| Auto | exécuté automatiquement à la première session sur un projet |

---

## 3. `wpm bootstrap`

But : **initialiser la base de mémoire** et les règles du projet.

En une phrase : *« on prépare le terrain la première fois. »*

| Point | Détail |
|---|---|
| Schéma | crée `wpm_memory.db` dans `<projet>/.wpm/` (table `memory`…) |
| Règles | indexe `rules/wpm-rules.md` (auto-généré) |
| N'affiche rien | s'exécute en sous-processus, silencieux |

Il est lancé automatiquement par le serveur au démarrage ; pas besoin de
l'appeler à la main, sauf pour déboguer.

---

## 4. `wpm audit`

But : **examiner l'état de la mémoire**.

En une phrase : *« qu'est-ce qu'on a en mémoire, est-ce que c'est
fiable, est-ce que ça contredit autre chose ? »*

| Point | Détail |
|---|---|
| Statistiques | nombre d'entrées par type, distribution de confiance, entrées jamais validées, contradictions actives, 5 entrées les moins fiables |
| Diagnostic | liste les entrées à faible confiance (à valider ou dépolluer) |
| Usage | à lancer régulièrement pour maintenir une mémoire saine |

---

## 5. `wpm patterns`

But : **détecter des patterns récurrents** dans la mémoire.

En une phrase : *« y a-t-il des schémas qui ressortent des notes, qu'on
n'a pas remarqués ? »*

| Point | Détail |
|---|---|
| Analyse | met en évidence des régularités entre entrées liées |
| Usage | utile en fin de travail ou de sprint pour capitaliser |
| État | workflow expérimental, résultats à interpréter |

---

## Résumé

| Commande | But | Fréquence |
|---|---|---|
| `learn` | mémoriser un fait | au fil de l'eau |
| `map` | inventorier le projet | première session + nouveautés |
| `bootstrap` | initialiser la base | automatique |
| `audit` | diagnostiquer la mémoire | régulier |
| `patterns` | détecter des régularités | occasionnel |

La mémorisation de ces commandes est **automatique** : quand l'agent les
exécute, les résultats utiles sont persistés dans la mémoire (via
`record_execution` pour les commandes de vérification, via `store_entry`
pour les faits découverts).
