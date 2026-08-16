export const steps = [
  {
    type: "prompt",
    text: "Peux-tu me dire le maximum de choses que tu connais sur ce projet en utilisant seulement wpm, aucune lecture de fichier.",
  },
  { type: "thought", text: "1.5s" },
  { type: "tool", name: "list_mcp_resources", args: "[server=wpm]" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=project overview structure stack description, token_budget=4000]",
  },
  { type: "thought", text: "330ms" },
  {
    type: "tool",
    name: "read_mcp_resource",
    args: "[server=wpm, uri=wpm://project-rules]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=wpm-site pages components routes i18n navigation theme design, token_budget=4000]",
  },
  { type: "thought", text: "656ms" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=docs migration markdown rendering docsData Markdown.jsx DocPage content source, token_budget=3000]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=git commit history push GitHub Pages deploy workflow CI, token_budget=3000]",
  },
  { type: "tool", name: "wpm_get_memory_stats" },
  { type: "thought", text: "1.7s" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=mobile navbar hamburger burger menu overlay implemented status, token_budget=2000]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=home landing hero page i18n dictionaries fr.js en.js I18nContext dark theme CSS variables, token_budget=2500]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=english docs translation en files concepts setup workflows agent-behavior configuration, token_budget=2000]",
  },
  { type: "thought", text: "643ms" },
  { type: "tool", name: "wpm_list_entries", args: "[limit=50]" },
  { type: "thought", text: "11.5s" },
  {
    type: "answer",
    markdown: `Voici tout ce que wpm sait sur ce projet (33 entrées en mémoire, sans avoir lu un seul fichier).

## Le projet
**wpm-site** est le site vitrine du projet **wpm-system** (dans \`~/Projets/ai-tools/wpm-site\`). Il présente le concept, les fonctionnalités, l'installation et la documentation de WPM.

### Le projet présenté (wpm-system)
- **WPM** = "Weighted Persistent Memory" : une mémoire persistante pondérée par la confiance pour les agents de codage IA (OpenCode). Faits durables stockés dans une base SQLite locale par projet, score de confiance 0–1 qui décroît avec le temps et ne monte qu'avec des preuves externes vérifiables. Concepts clés : confiance initiale par provenance, validation par preuve (jamais \`agent_reasoning\`), contradiction au lieu de suppression, récupération hybride (similarité vectorielle + liens de graphe), project-rules auto-composées. Statut : phase de test.
- 3 composants : **wpm-mcp-server** (Python, SQLite + sqlite-vec + ONNX Runtime, embedding \`all-MiniLM-L6-v2\` 384d, 11 tools/3 resources/6 prompts), **wpm-opencode-plugin** (TypeScript, installé globalement), **scripts/wpm** (CLI). \`install.sh\` installe tout globalement.

## Stack et structure du site
- **Vite 5 + React 18 SPA**, react-router-dom v6, i18n FR/EN maison (\`I18nContext.jsx\` + dictionnaires \`fr.js\`/\`en.js\`), thème sombre tech/AI en CSS custom, **aucune lib UI**.
- Routes : \`/\`, \`/concepts\`, \`/features\`, \`/installation\`, \`/architecture\`, \`/docs\` (index), \`/docs/:slug\` (DocPage).
- Navbar : 6 liens internes + 1 lien GitHub externe. Contenu sourcé depuis README.md et docs/*.md de wpm-system.

## Documentation (source de vérité migrée)
- Migration depuis wpm-system : \`docs/fr/*.md\` et \`docs/en/*.md\`, 5 docs chacune (**concepts, setup, workflows, agent-behavior, configuration**). Pas de sous-module/sync ; wpm-system ne garde que \`docs/internal/\`.
- Rendu : react-markdown v10 + remark-gfm v4, \`import.meta.glob\` dans \`src/docs/docsData.js\`, \`DOC_ORDER\` partagé. \`Markdown.jsx\` réécrit les liens \`.md\` relatifs en routes internes ; URL externes en nouvel onglet.
- Le toggle FR/EN par doc a été **supprimé** (commit 9b2a4db) : la langue des docs suit le **switch global de la navbar**. Lien GitHub \`https://github.com/nohavye-dev/wpm-system\` dans navbar, footer et hero.

## Déploiement (GitHub Pages)
- Repo public \`wpm-site\`, live sur **https://nohavye-dev.github.io/wpm-site/**, basename \`/wpm-site\` partout, \`public/404.html\` fallback SPA (sessionStorage \`wpm-redirect\`), CI \`.github/workflows/deploy.yml\` (npm ci → vite build → upload/deploy-pages) déclenchée sur push main. Pages source configurée en "GitHub Actions" manuellement. Push avec clé SSH \`nohavye-dev\`.

## Bugs résolus (patrons en mémoire)
1. **Deep-link GitHub Pages** (042443f) : \`404.html\` stockait le chemin sans le basename → page blanche ; corrigé en stockant \`base + rest\`.
2. **Marges latérales mobile** : \`.page\` (shorthand) écrasait le padding de \`.container\` ; corrigé en longhands. ⚠️ *contradiction* : une entrée plus ancienne (747aee14) imputait la cause à "body plus large que le viewport" — l'entrée la plus récente et vérifiée (bc11cae6) la contredit.
3. **Titre dupliqué** dans DocPage (h1 page + h1 markdown) : suppression du bloc \`page__title\`.
4. **Tableaux larges en mobile** → rendus en **cartes empilées** (data-label sur td, thead masqué, lignes en cartes), validé utilisateur.

## Mobile / responsive
- \`overflow-x: clip\` global, \`.footer__links\` en wrap, tableaux markdown dans \`.md-table-wrap\` scrollable, \`.doc-page\` max-width 800px.
- **Navbar mobile en cours** : actuellement 2e ligne avec scroll horizontal (7 liens) — jugée impraticable. Décision : menu **hamburger** en overlay full-width absolu sous la navbar sticky (le burger JSX, aria et close Escape sont déjà en place ; la version 1 en-row a été rejetée "l'affichage n'est pas terrible"). Statut : **planifié, implémentation finale non confirmée**.

## Git / vérification
- Branche main, commits poussés : b117a37 → 042443f → 454768b ("fix: mobile layout…") ainsi que e004f4e ("add faithful EN translations") et 2b45bc2. \`npm run build\` passe (multiples preuves), vite preview sert toutes routes en 200.

## Points d'attention (incertitudes)
- Une entrée (9da7666a, conf. 0.65) signale \`docs/en/\` **vide à un moment donné**, ce qui contredit l'ajout des traductions EN poussées ensuite — probablement obsolète, mais non tranché.
- Les entrées de faible confiance (stack initial, layout docs) sont basées sur inférence d'agent, pas de preuve externe.`,
  },
  { type: "footer", text: "Plan · Big Pickle · 39.0s", tone: "orange" },
  {
    type: "message",
    text: "Session ended. End-of-task memory pass (wpm persistent memory): if and only if durable facts from this session — decisions, confirmed results, understood bug patterns — were not yet persisted via wpm_store_entry or wpm_record_execution, persist them now. Do not invent evidence, do not store transient details or trivia, and do not validate anything without external proof. If nothing remains to persist, reply exactly: \"nothing to persist\".",
  },
  { type: "thought", text: "807ms" },
  { type: "plain", text: "nothing to persist" },
  { type: "footer", text: "Build · Big Pickle · 3.2s" },
];

export const stepsEn = [
  {
    type: "prompt",
    text: "Can you tell me as much as you know about this project using only wpm, without reading any file.",
  },
  { type: "thought", text: "1.5s" },
  { type: "tool", name: "list_mcp_resources", args: "[server=wpm]" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=project overview structure stack description, token_budget=4000]",
  },
  { type: "thought", text: "330ms" },
  {
    type: "tool",
    name: "read_mcp_resource",
    args: "[server=wpm, uri=wpm://project-rules]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=wpm-site pages components routes i18n navigation theme design, token_budget=4000]",
  },
  { type: "thought", text: "656ms" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=docs migration markdown rendering docsData Markdown.jsx DocPage content source, token_budget=3000]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=git commit history push GitHub Pages deploy workflow CI, token_budget=3000]",
  },
  { type: "tool", name: "wpm_get_memory_stats" },
  { type: "thought", text: "1.7s" },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=mobile navbar hamburger burger menu overlay implemented status, token_budget=2000]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=home landing hero page i18n dictionaries fr.js en.js I18nContext dark theme CSS variables, token_budget=2500]",
  },
  {
    type: "tool",
    name: "wpm_query_context",
    args: "[query=english docs translation en files concepts setup workflows agent-behavior configuration, token_budget=2000]",
  },
  { type: "thought", text: "643ms" },
  { type: "tool", name: "wpm_list_entries", args: "[limit=50]" },
  { type: "thought", text: "11.5s" },
  {
    type: "answer",
    markdown: `Here is everything wpm knows about this project (33 entries in memory, without having read a single file).

## The project
**wpm-site** is the showcase site of the **wpm-system** project (in \`~/Projets/ai-tools/wpm-site\`). It presents WPM's concept, features, installation and documentation.

### The project presented (wpm-system)
- **WPM** = "Weighted Persistent Memory": a persistent confidence-weighted memory for AI coding agents (OpenCode). Durable facts stored in a local SQLite database per project, with a 0–1 confidence score that decays over time and only rises with verifiable external evidence. Key concepts: provenance-based initial confidence, evidence-based validation (never \`agent_reasoning\`), contradiction instead of deletion, hybrid retrieval (semantic similarity + graph links), auto-composed project-rules. Status: trial phase.
- 3 components: **wpm-mcp-server** (Python, SQLite + sqlite-vec + ONNX Runtime, \`all-MiniLM-L6-v2\` 384d embeddings, 11 tools/3 resources/6 prompts), **wpm-opencode-plugin** (TypeScript, installed globally), **scripts/wpm** (CLI). \`install.sh\` installs everything globally.

## Stack and site structure
- **Vite 5 + React 18 SPA**, react-router-dom v6, in-house FR/EN i18n (\`I18nContext.jsx\` + \`fr.js\`/\`en.js\` dictionaries), dark tech/AI theme in custom CSS, **no UI library**.
- Routes: \`/\`, \`/concepts\`, \`/features\`, \`/installation\`, \`/architecture\`, \`/docs\` (index), \`/docs/:slug\` (DocPage).
- Navbar: 6 internal links + 1 external GitHub link. Content sourced from wpm-system's README.md and docs/*.md.

## Documentation (migrated source of truth)
- Migrated from wpm-system: \`docs/fr/*.md\` and \`docs/en/*.md\`, 5 docs each (**concepts, setup, workflows, agent-behavior, configuration**). No submodule/sync; wpm-system only keeps \`docs/internal/\`.
- Rendering: react-markdown v10 + remark-gfm v4, \`import.meta.glob\` in \`src/docs/docsData.js\`, shared \`DOC_ORDER\`. \`Markdown.jsx\` rewrites relative \`.md\` links to internal routes; external URLs open in a new tab.
- The per-doc FR/EN toggle has been **removed** (commit 9b2a4db): the docs language follows the **global navbar switch**. GitHub link \`https://github.com/nohavye-dev/wpm-system\` in navbar, footer and hero.

## Deployment (GitHub Pages)
- Public repo \`wpm-site\`, live at **https://nohavye-dev.github.io/wpm-site/**, \`/wpm-site\` basename everywhere, \`public/404.html\` SPA fallback (sessionStorage \`wpm-redirect\`), CI \`.github/workflows/deploy.yml\` (npm ci → vite build → upload/deploy-pages) triggered on push to main. Pages source set to "GitHub Actions" manually. Push with the \`nohavye-dev\` SSH key.

## Resolved bugs (patterns in memory)
1. **GitHub Pages deep-link** (042443f): \`404.html\` stored the path without the basename → blank page; fixed by storing \`base + rest\`.
2. **Mobile side margins**: \`.page\` (shorthand) overrode \`.container\`'s padding; fixed with longhands. ⚠️ *contradiction*: an older entry (747aee14) blamed "body wider than the viewport" — the newer, verified entry (bc11cae6) contradicts it.
3. **Duplicate title** in DocPage (page h1 + markdown h1): removed the \`page__title\` block.
4. **Wide tables on mobile** → rendered as **stacked cards** (data-label on td, hidden thead, rows as cards), user-validated.

## Mobile / responsive
- Global \`overflow-x: clip\`, \`.footer__links\` wraps, markdown tables in a scrollable \`.md-table-wrap\`, \`.doc-page\` max-width 800px.
- **Mobile navbar in progress**: currently a 2nd row with horizontal scroll (7 links) — judged impractical. Decision: **hamburger** menu as a full-width absolute overlay under the sticky navbar (the burger JSX, aria and Escape close are already in place; the v1 in-row version was rejected "the display isn't great"). Status: **planned, final implementation not confirmed**.

## Git / verification
- main branch, pushed commits: b117a37 → 042443f → 454768b ("fix: mobile layout…") plus e004f4e ("add faithful EN translations") and 2b45bc2. \`npm run build\` passes (multiple proofs), vite preview serves all routes in 200.

## Points of attention (uncertainties)
- One entry (9da7666a, conf. 0.65) reports \`docs/en/\` **empty at some point**, contradicting the EN translations added and pushed later — probably stale, but not settled.
- Low-confidence entries (initial stack, docs layout) are based on agent inference, not external proof.`,
  },
  { type: "footer", text: "Plan · Big Pickle · 39.0s", tone: "orange" },
  {
    type: "message",
    text: "Session ended. End-of-task memory pass (wpm persistent memory): if and only if durable facts from this session — decisions, confirmed results, understood bug patterns — were not yet persisted via wpm_store_entry or wpm_record_execution, persist them now. Do not invent evidence, do not store transient details or trivia, and do not validate anything without external proof. If nothing remains to persist, reply exactly: \"nothing to persist\".",
  },
  { type: "thought", text: "807ms" },
  { type: "plain", text: "nothing to persist" },
  { type: "footer", text: "Build · Big Pickle · 3.2s" },
];
