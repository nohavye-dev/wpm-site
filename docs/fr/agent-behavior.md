# Comportement de l'agent — ce que fait l'IA avec WPM

Ce document décrit le **comportement attendu de l'agent IA** quand WPM est
actif : les réflexes à avoir, les invariants à respecter, et le rôle des
règles projet. Pour la mécanique des commandes, voir
[`workflows.md`](workflows.md) ; pour le réglage des paramètres,
[`configuration.md`](configuration.md).

> **Rappel** : ce comportement est **imposé par le prompt système** de
> l'agent, pas juste suggéré. L'agent ne « pense pas que c'est une bonne
> idée » : il le fait, parce que c'est sa procédure.

---

## Les 3 règles d'or (priorité absolue)

1. **MEMORY FIRST.** Avant de lire un fichier ou de lancer une recherche,
   l'agent appelle `query_context` sur le sujet. La réponse est peut-être
   déjà en mémoire.
2. **WRITE AS YOU GO.** Dès qu'un fait durable émerge (décision, convention,
   résultat de test, bug compris), l'agent appelle `store_entry`
   **immédiatement**. Ne pas différer la persistance : les faits non
   persistés sont perdus à la compaction du contexte.
3. **PROOF BEFORE VALIDATION.** L'agent ne valide une entrée qu'avec une
   **preuve externe, vérifiable** (un log de test, un chemin de fichier,
   une autre entrée). Jamais de « je pense que c'est vrai » pour faire
   monter un score.

---

## Les invariants

### Ne jamais deviner la fiabilité

La confiance est **décidée par le système** (source de l'entrée, preuves,
temps), pas par l'humeur de l'agent. L'agent n'augmente pas son propre
score : il apporte des preuves, et le modèle fait le reste.

### Ne jamais supprimer

Même quand une entrée est contredite, l'agent **ne la supprime pas**. Il
enregistre une contradiction (avec sa preuve), qui fait chuter le score de
l'entrée fautive tout en gardant la trace.

### Relire la mémoire avant de répondre

Au début de chaque réponse substantielle, l'agent interroge `query_context`
sur le sujet du moment. Il ne répond pas à partir du seul raisonnement.

### Vérifier les conflits

Avant de se fier à une correspondance directe de `query_context`, l'agent
regarde la section `conflicts` (entrées avec un lien « contredit » actif).
Une entrée avec un conflit actif ne doit pas être considérée comme fiable
sans preuve supplémentaire.

---

## Le cycle de travail

```
              ┌──────────────────────────────────────────────┐
              │  1. MEMORY FIRST                             │
              │  query_context(sujet) → y a-t-il déjà        │
              │  une entrée fiable sur ce sujet ?            │
              └──────────────┬───────────────────────────────┘
                             ▼
              ┌──────────────────────────────────────────────┐
              │  2. WRITE AS YOU GO                          │
              │  fait durable ? → store_entry immédiat,      │
              │  avec source (doc / code / exécution /       │
              │  inference)                                  │
              └──────────────┬───────────────────────────────┘
                             ▼
              ┌──────────────────────────────────────────────┐
              │  3. PROOF BEFORE VALIDATION                  │
              │  entrée confirmée par une preuve externe ?   │
              │  → validate_entry(preuve, evidence_ref)      │
              │  contredite ? → contradict_entry(preuve)     │
              └──────────────────────────────────────────────┘
```

---

## Les liens entre entrées

Quand deux entrées sont liées (une décision d'architecture **dépend de**
une convention, un insight **affine** un autre), l'agent appelle
`link_entries(source, cible, relation)` avec l'une des relations :
`related`, `contradicts`, `depends_on`, `refines`. Le lien « contredit »
est **réservé** aux vraies contradictions (jamais pour exprimer un doute).

---

## Les règles projet : la mémoire « projet » vs la mémoire « session »

- La mémoire **projet** est persistante et partagée entre sessions : c'est
  celle que WPM stocke et pondère.
- Les règles projet (`rules/wpm-rules.md`) sont **recomposées** par le
  système à partir des entrées les plus fiables ; l'agent les lit en début
  de session pour respecter les conventions du projet.

---

## Pièges à éviter

| Piège | Comportement correct |
|---|---|
| Valider une entrée « pour la booster » | Fournir une preuve externe ou ne rien faire |
| Supprimer une entrée fausse | Enregistrer une contradiction avec preuve |
| Répondre sans avoir interrogé la mémoire | Toujours `query_context` sur le sujet du moment |
| Écrire tous les faits à la fin de session | `store_entry` dès qu'un fait durable émerge |
| Confondre `agent_inference` et fait vérifié | Noter la vraie source, même si elle est peu flatteuse |

---

## En résumé

WPM ne demande pas à l'agent d'être **plus intelligent**, juste plus
**rigoureux et discipliné** : interroger avant de répondre, mémoriser au
fil de l'eau, prouver avant de valider. C'est cette discipline, répétée à
chaque session, qui rend la mémoire du projet fiable dans le temps.
