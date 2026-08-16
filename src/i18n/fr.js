export default {
  nav: {
    home: "Accueil",
    concepts: "Concepts",
    features: "Fonctionnalités",
    installation: "Installation",
    architecture: "Architecture",
    docs: "Documentation",
  },

  common: {
    phaseBadge: "En phase d'essais",
    analogy: "Analogie",
    backHome: "Retour à l'accueil",
    github: "GitHub",
    menu: "Menu",
    close: "Fermer",
    repoUrl: "https://github.com/nohavye-dev/wpm-system",
  },

  home: {
    hero: {
      badge: "En phase d'essais",
      title: "WPM",
      subtitle: "Weighted Persistent Memory",
      lead: "Une mémoire persistante pondérée par la confiance pour votre agent IA (OpenCode). Les décisions d'architecture, conventions et patterns découverts pendant une session ne sont pas perdus à la suivante — et surtout, on sait à quel point chaque souvenir est fiable.",
      ctaConcepts: "Découvrir les concepts",
      ctaInstall: "Installer en 3 commandes",
    },
    why: {
      title: "Pourquoi WPM ?",
      text: "Le contexte d'un agent IA est éphémère : ce qu'il comprend pendant une session disparaît à la suivante. WPM lui donne une mémoire locale au projet, entretenue automatiquement pendant le travail, où chaque information porte un score de confiance qui évolue dans le temps.",
    },
    proof: {
      badge: "Fun fact",
      title: "Blind test : il connaît le site par cœur",
      intro:
        "Pour vérifier que sa mémoire ne bluffe pas, on a mis l'agent au défi : décrire tout le projet… sans lire un seul fichier. 39 secondes plus tard, il n'avait rien oublié.",
      stats: [
        { value: "33", label: "souvenirs en tête" },
        { value: "0", label: "fichier ouvert (promis, juré)" },
        { value: "0.99", label: "de confiance dans ses dires" },
        { value: "100 %", label: "sorti de mémoire" },
      ],
      footnote:
        "WPM, c'est la mémoire qui fait le travail à sa place. Elle se construit à chaque session et ne valide qu'avec des preuves — pas des impressions.",
      cta: "Comment il a fait ?",
    },
    ideas: {
      title: "Les idées clés",
      intro: "Ce qui distingue WPM d'un simple carnet de notes.",
      items: [
        {
          title: "Confiance pondérée",
          text: "Chaque souvenir a un score (0 à 1) ; on distingue ce qui est sûr de ce qui est supposé.",
        },
        {
          title: "Provenance",
          text: "Une source officielle vaut plus qu'une déduction ; la confiance de départ en dépend.",
        },
        {
          title: "Preuves, pas d'opinions",
          text: "La confiance ne monte qu'avec des preuves externes vérifiables, jamais avec du raisonnement seul.",
        },
        {
          title: "Jamais de suppression",
          text: "On contredit une information, on ne l'efface pas : l'historique reste traçable.",
        },
        {
          title: "Mémorisation au fil de l'eau",
          text: "L'agent note les faits durables dès qu'ils émergent, pas en fin de session.",
        },
        {
          title: "Rappel au bon moment",
          text: "Recherche hybride (sémantique + graphe) pour ressortir le bon souvenir quand il compte.",
        },
      ],
    },
    benefits: {
      title: "Ce que vous obtenez",
      intro: "Une fois activé, votre agent peut :",
      items: [
        "Mémoriser (store_entry) et relire (query_context) des faits durables, en anglais et dédupliqués",
        "Valider (validate_entry) ou contredire (contradict_entry) avec des preuves",
        "Capturer les tests et builds automatiquement (record_execution)",
        "Épingler, déprécier ou restaurer des souvenirs (pin_entry, deprecate_entry, restore_entry)",
        "Lire les règles du projet recomposées depuis la mémoire",
      ],
      workflowsNote: "Et des workflows prêts à l'emploi : learn, map, bootstrap, audit, patterns.",
    },
    install: {
      title: "Démarrage en 3 commandes",
      steps: [
        {
          cmd: "./install.sh",
          text: "Installe le serveur + le plugin (global, une fois)",
        },
        {
          cmd: "wpm enable",
          text: "Active la mémoire sur ce projet (écrit wpm.config.json)",
        },
        {
          cmd: "redémarrez OpenCode",
          text: "C'est tout.",
        },
      ],
      zeroConfig:
        "Zéro configuration OpenCode. Le plugin s'installe tout seul, enregistre le serveur MCP et les permissions à votre place : pas d'entrée mcp à ajouter dans opencode.json.",
    },
    phase: {
      title: "En phase d'essais",
      text: "WPM est une expérience en cours : l'idée est prometteuse, l'ingénierie est propre, mais le modèle de confiance reste à valider sur de vrais projets.",
      items: [
        "La stabilité des hooks OpenCode (experimental.*)",
        "La validation du modèle de confiance sur de vrais projets",
      ],
    },
  },

  concepts: {
    title: "Concepts",
    intro:
      "Comprendre WPM sans jargon. Pour la mécanique précise (schéma de données, formules, protocole), voir la documentation technique.",
    problem: {
      title: "Le problème",
      text: "Un agent IA travaille dans un contexte limité et éphémère. Quand il découvre une décision d'architecture, une convention de code ou un bug récurrent, cette information vit dans sa conversation en cours… puis disparaît à la session suivante. Résultat : chaque nouvelle session repart de zéro, re-lit le code, re-devine ce qui avait déjà été compris.",
      solution:
        "WPM résout ça : il donne à l'agent une mémoire persistante, propre au projet, qui survit aux sessions.",
    },
    oneLiner: {
      title: "L'idée en une phrase",
      text: "Un carnet de notes partagé entre toutes les sessions de l'agent, où chaque note a un degré de fiabilité qui évolue dans le temps.",
      detail:
        "Ce qui distingue WPM d'un simple stockage de notes, c'est que chaque information est pondérée : on sait à quel point on peut lui faire confiance, et cette confiance est entretenue ou érodée selon ce qui se passe ensuite.",
    },
    sections: [
      {
        id: "memoire-du-projet",
        title: "1. La mémoire du projet",
        text: "Tout ce que l'agent juge durable sur un projet est consigné : décisions d'architecture, conventions, patterns de bugs, résultats de tests. Cette mémoire est stockée localement, dans le projet (un fichier SQLite dans un dossier .wpm/), pas dans le cloud.",
        analogy:
          "Un wiki interne au projet, alimenté automatiquement pendant le travail, au lieu d'une documentation écrite à la main et vite obsolète.",
      },
      {
        id: "confiance-ponderee",
        title: "2. La confiance pondérée",
        text: "Chaque entrée de mémoire porte un score de confiance entre 0 et 1. Une entrée à 0.9 est une quasi-certitude ; à 0.3, une intuition fragile. Ce score n'est pas décoratif : c'est lui qui décide si une information est montrée à l'agent, et avec quel poids.",
        analogy:
          "Une note « à vérifier » vs une note « confirmée par trois sources ». On ne les traite pas de la même façon.",
      },
      {
        id: "provenance",
        title: "3. La provenance : d'où vient l'information ?",
        text: "La confiance de départ dépend de l'origine du fait :",
        table: {
          caption: "Confiance de départ selon la source",
          cols: ["Source", "Confiance de départ", "Exemple"],
          rows: [
            ["Documentation officielle lue", "haute", "« la doc du framework dit que… »"],
            ["Code observé directement", "moyenne-haute", "« ce fichier fait X »"],
            ["Résultat d'une commande réellement exécutée", "moyenne", "« le test passe »"],
            ["Déduction de l'agent, sans preuve", "basse", "« je suppose que… »"],
          ],
        },
        note: "Une hypothèse reste une hypothèse, même si elle semble solide : elle part avec une confiance basse, et c'est normal.",
        analogy: "Une source primaire vaut plus qu'une rumeur.",
      },
      {
        id: "decroissance",
        title: "4. La décroissance (decay)",
        text: "Une information qui n'est plus confirmée depuis longtemps s'érode : son score baisse lentement avec le temps. Le rythme dépend du type d'information — une décision d'architecture reste fiable ~1 an, un résultat de test seulement quelques jours.",
        analogy:
          "Un mot de passe noté il y a trois mois n'est plus fiable ; un principe de conception, si.",
      },
      {
        id: "preuves",
        title: "5. Les preuves : comment la confiance monte",
        text: "Une entrée ne gagne en confiance qu'avec des preuves externes et vérifiables. Le simple « je pense que c'est vrai » ne fait jamais monter le score.",
        table: {
          caption: "Hiérarchie des preuves",
          cols: ["Preuve", "Force", "Effet"],
          rows: [
            ["execution_verified", "forte", "test/build/commande exécutée, résultat constaté"],
            ["cross_reference", "moyenne", "confirmation indépendante par une autre source"],
            ["reuse_without_failure", "faible", "réutilisée sans échec — signal faible"],
            ["agent_reasoning", "nulle", "journalisé, ne fait jamais bouger le score"],
          ],
        },
        analogy: "On ne valide pas une hypothèse en la répétant, mais en la testant.",
      },
      {
        id: "contradiction",
        title: "6. La contradiction, jamais la suppression",
        text: "Quand une information se révèle fausse ou dépassée, WPM ne supprime jamais l'ancienne entrée : il enregistre une contradiction (avec sa preuve). L'ancienne entrée reste visible, son score chute plus vite qu'une confirmation ne le ferait monter — et l'historique reste traçable.",
        analogy:
          "On barre une ligne dans le carnet plutôt que de l'arracher, pour garder la trace de ce qu'on a révisé et pourquoi.",
      },
      {
        id: "rappel-hybride",
        title: "7. Le rappel hybride (vecteur + graphe)",
        text: "Quand l'agent cherche « tout ce qu'on sait sur X », WPM combine deux mécanismes : la similarité sémantique (trouver les notes qui parlent de la même chose, même avec des mots différents) et le graphe de liens (suivre les relations entre notes pour remonter des informations liées mais pas identiques). Le résultat distingue les correspondances directes (fiables) du contexte associatif (lié, donc à mentionner avec prudence).",
        analogy:
          "Une recherche qui trouve non seulement l'article exact, mais aussi les pages liées qui éclairent le contexte.",
      },
      {
        id: "regles-du-projet",
        title: "8. Les règles du projet",
        text: "WPM recompose automatiquement un résumé des conventions et décisions les plus fiables du projet (le bloc « project-rules »), que l'agent lit en début de session. C'est ce qui lui permet de respecter les usages du projet sans qu'on les lui réexplique à chaque fois.",
        analogy:
          "La page « règles de la maison » du wiki, mise à jour toute seule à partir des notes les plus fiables.",
      },
      {
        id: "au-fil-de-l-eau",
        title: "9. La mémorisation au fil de l'eau",
        text: "L'agent note les faits durables dès qu'ils émergent, pendant son travail, plutôt que de tout écrire à la fin (où une partie serait déjà perdue). C'est ce qui rend la mémoire vivante et à jour.",
        analogy:
          "Prendre ses notes en réunion plutôt qu'essayer de tout reconstituer une semaine plus tard.",
      },
    ],
    objectives: {
      title: "Ce que ça résout",
      items: [
        {
          title: "Continuité",
          text: "les sessions ne repartent plus de zéro.",
        },
        {
          title: "Fiabilité",
          text: "on distingue ce qui est sûr de ce qui est supposé, et on ne laisse pas une information fausse polluer les décisions.",
        },
        {
          title: "Traçabilité",
          text: "les révisions et contradictions restent visibles, pas d'écrasement silencieux.",
        },
        {
          title: "Zéro friction",
          text: "l'agent mémorise pendant son travail ; pas de configuration à maintenir à la main.",
        },
      ],
    },
    limits: {
      title: "Limites (projet en phase d'essais)",
      text: "WPM est une expérience en cours. Le modèle de confiance (vitesses de décroissance, poids, seuils) est calé sur des valeurs raisonnées mais encore peu mesurées ; il faudra le valider sur de vrais projets longs.",
    },
  },

  features: {
    title: "Fonctionnalités",
    intro: "Le serveur expose la mémoire via MCP : 11 outils, 3 ressources, 6 prompts.",
    tools: {
      title: "Les 11 outils MCP",
      cols: ["Outil", "Rôle"],
      rows: [
        ["store_entry(type, content, source)", "Créer une entrée (type ∈ doc/archi_decision/insight/convention/bug_pattern/execution_result ; source ∈ official_doc/observed_code/tool_execution/agent_inference)"],
        ["query_context(query, min_confidence?, token_budget?)", "Récupération hybride vecteur + confiance + graphe, avec expansion à 1 saut"],
        ["validate_entry(entry_id, evidence_type, evidence_ref, session_id)", "Enregistrer une preuve de confirmation (dédupliquée par session)"],
        ["contradict_entry(entry_id, conflicting_entry_id, evidence_type, evidence_ref)", "Enregistrer un conflit — ne supprime jamais, baisse le score + lien contradicts"],
        ["link_entries(source_id, target_id, relation_type, weight?)", "Relation explicite (related/contradicts/depends_on/refines)"],
        ["get_memory_stats()", "Diagnostic : totaux, distribution de confiance, jamais validées, contradictions, plus faibles"],
        ["pin_entry(entry_id)", "Épingler — la confiance ne décroît jamais"],
        ["deprecate_entry(entry_id)", "Déprécier — exclue des résultats (réversible)"],
        ["restore_entry(entry_id)", "Restaurer en statut actif"],
        ["list_entries(type?, status?, min_confidence?, max_confidence?, limit?, offset?)", "Liste paginée et filtrable"],
        ["record_execution(command, succeeded, session_id)", "Capturer un test/build/lint : stocke une entrée execution_result et la valide execution_verified. Les commandes triviales (ls, cat, grep, git status…) sont rejetées"],
      ],
      note: "type et source sont typés (Literal) : une valeur hors liste est rejetée par le schéma avant même d'atteindre le code.",
    },
    resources: {
      title: "Les 3 ressources",
      cols: ["Resource", "Contenu"],
      rows: [
        ["wpm://project-rules", "Conventions/décisions du projet (≥ confidence_threshold), bloc project-rules"],
        ["wpm://memory-rules", "Les règles d'usage (même contenu que instructions)"],
        ["wpm://verification-commands", "Commandes comptant comme preuve forte"],
      ],
    },
    prompts: {
      title: "Les 6 prompts",
      cols: ["Prompt", "Rôle"],
      rows: [
        ["persist", "Checklist de fin de tâche"],
        ["audit", "Revue de la santé de la mémoire"],
        ["learn(paths)", "Ingest de documents markdown, section par section"],
        ["map(scopes)", "Cartographie de répertoires/fichiers"],
        ["bootstrap", "Peuplement initial (README, docs, configs, CI)"],
        ["patterns(type_filter)", "Analyse de patterns récurrents"],
      ],
      note: "Dans OpenCode : commandes slash /wpm:learn:mcp, etc.",
    },
    workflows: {
      title: "Les 5 workflows",
      intro: "Cinq workflows prêts à l'emploi pour alimenter ou inspecter la mémoire du projet. Dans OpenCode, ce sont des commandes slash (ex. /wpm:learn:mcp) ; ils ne s'exécutent que sur invocation explicite.",
      items: [
        {
          title: "learn <chemins>",
          text: "Ingère un ou plusieurs documents markdown, section par section. Chaque section devient une entrée candidate, dédupliquée avant écriture, traduite en anglais.",
        },
        {
          title: "map [scopes]",
          text: "Cartographie l'architecture et les conventions de la base de code. Pas un index fichier par fichier : seuls quelques faits structurants, toujours ancrés dans du code réellement lu.",
        },
        {
          title: "bootstrap",
          text: "Peuple la mémoire à partir des artefacts existants (README, docs, configs de lint, CI/CD, structure de dossiers) en une seule passe. À lancer une fois par projet, après wpm enable.",
        },
        {
          title: "audit",
          text: "Tableau de bord en lecture seule de la santé de la mémoire : total par type, distribution de confiance, entrées jamais validées, contradictions actives, 5 entrées les plus faibles, activité récente. Se termine par un verdict.",
        },
        {
          title: "patterns [type]",
          text: "Analyse la mémoire pour détecter des patterns récurrents et propose des améliorations : convention manquante, décision implicite, contradiction à résoudre. Les actions proposées sont exécutées automatiquement.",
        },
      ],
    },
    embeddings: {
      title: "Embeddings",
      text: "ONNX Runtime + tokenizers HuggingFace (~100 MB), modèle all-MiniLM-L6-v2 (384 dimensions), téléchargé et mis en cache au premier démarrage.",
    },
  },

  installation: {
    title: "Installation",
    intro: "WPM s'installe une fois (globalement), puis s'active projet par projet. Le plugin OpenCode est installé par défaut et enregistre le serveur MCP à votre place : aucune configuration OpenCode manuelle n'est nécessaire.",
    steps: [
      {
        id: "globale",
        title: "1. Installation globale",
        text: "Depuis la racine du dépôt :",
        cmd: "./install.sh",
        what: "Ce que fait install.sh :",
        items: [
          "crée un environnement Python dédié (~/.local/share/wpm-system/venv) et y installe le serveur",
          "pré-télécharge le modèle d'embedding (~80 MB) pour un premier démarrage hors-ligne",
          "installe la commande wpm (~/.local/bin/wpm)",
          "installe le plugin OpenCode dans ~/.config/opencode/plugins/ (global)",
        ],
        note: "Les chemins honorent $XDG_DATA_HOME / $XDG_BIN_HOME / $XDG_CONFIG_HOME s'ils sont définis.",
      },
      {
        id: "activer",
        title: "2. Activer un projet",
        text: "Depuis la racine du projet concerné :",
        cmd: "wpm enable",
        what: "wpm enable écrit wpm.config.json à la racine du projet :",
        items: [
          "db_path par défaut .wpm/wpm.db s'il est absent (les clés existantes sont préservées)",
          "crée le dossier de la base et l'ajoute au .gitignore",
          "crée la base de données",
          "refuse un db_path qui sort du projet (chemin absolu externe, ou relatif avec ..)",
        ],
        customTitle: "Pour un dossier de base personnalisé :",
        customCmd: "wpm enable .memory",
      },
      {
        id: "ensuite",
        title: "3. Ce qui se passe ensuite",
        text: "Au prochain démarrage d'OpenCode sur ce projet, le plugin détecte le wpm.config.json et :",
        items: [
          "enregistre le serveur MCP wpm (outils wpm_store_entry, wpm_query_context, …)",
          "accorde la permission wpm_* pour que l'agent puisse écrire la mémoire, même en mode plan",
        ],
        note: "Redémarrez OpenCode après wpm enable (ou wpm disable) : la configuration n'est lue qu'une fois au démarrage.",
      },
      {
        id: "verifier",
        title: "4. Vérifier que ça marche",
        items: [
          "Dans OpenCode, l'agent doit voir les outils wpm_*.",
          "Depuis le terminal, dans le projet activé :",
        ],
        cmd: "wpm search \"nom d'un sujet\"",
        note: "Sans activation, les outils répondent « wpm is not activated in this project ».",
      },
      {
        id: "desinstaller",
        title: "5. Désactiver / désinstaller",
        cmds: [
          ["wpm disable", "retire wpm.config.json (les données sont conservées)"],
          ["wpm uninstall", "suppression globale complète (venv, binaire, plugin) ; --force pour sauter la confirmation"],
          ["./install.sh uninstall", "équivalent, depuis la racine du dépôt"],
        ],
      },
    ],
    config: {
      title: "Configuration — wpm.config.json",
      intro: "Dans la pratique, vous n'avez souvent rien à écrire à la main : wpm enable crée le fichier avec un db_path par défaut, et la plupart des réglages sont optionnels.",
      minimalTitle: "Exemple minimal (souvent suffisant) :",
      minimalCode: '{ "db_path": ".wpm/wpm.db" }',
      envTitle: "Variables d'environnement",
      envCols: ["Variable", "Remplace"],
      envRows: [
        ["WPM_CONFIG_PATH", "quel fichier JSON est lu"],
        ["WPM_DB_PATH", "db_path"],
        ["WPM_RESPONSE_LANGUAGE", "response_language"],
        ["WPM_EMBEDDING_MODEL", "modèle d'embedding (défaut all-MiniLM-L6-v2)"],
      ],
      note: "Une clé absente garde sa valeur par défaut ; une clé inconnue (typo) fait lever une erreur explicite au démarrage plutôt que d'être ignorée.",
    },
  },

  architecture: {
    title: "Architecture",
    intro: "Trois briques composent WPM : un serveur de mémoire (Python), un plugin OpenCode (TypeScript) et une CLI.",
    components: [
      {
        name: "wpm-mcp-server",
        tag: "Python · MCP",
        text: "Le serveur de mémoire persistante pondérée par la confiance. SQLite + sqlite-vec + ONNX Runtime. C'est la source de vérité du projet : scoring, décroissance, expansion de graphe, outils MCP.",
        items: [
          "11 outils, 3 ressources, 6 prompts",
          "Recherche hybride vecteur + confiance + graphe, avec expansion à 1 saut",
          "type et source typés (Literal) — une valeur hors liste est rejetée par le schéma",
          "Lancé par le plugin OpenCode, ou en autonome avec WPM_DB_PATH",
        ],
      },
      {
        name: "wpm-opencode-plugin",
        tag: "OpenCode · TypeScript",
        text: "Le plugin OpenCode, installé par défaut par install.sh. Il fait deux choses qu'un serveur MCP pur ne peut pas faire :",
        items: [
          "config — enregistre le serveur MCP wpm et la permission wpm_* automatiquement",
          "experimental.chat.system.transform — ré-injecte la carte de règles compacte à chaque tour",
          "experimental.session.compacting — rappelle de persister avant compaction",
          "tool.execute.after — capture les tests/builds/lint (wpm record-execution) sans dépendre du LLM",
          "tool.execute.before — nudge « memory first » avant une lecture/grep/glob",
          "event (session.idle) — déclenche la passe de persistance de fin de session",
        ],
        warn: "Les hooks experimental.* ne sont pas stabilisés côté OpenCode et peuvent être ignorés silencieusement selon la version (vérifiés sur 1.18.11).",
      },
      {
        name: "scripts/wpm",
        tag: "CLI",
        text: "La commande wpm, installée dans ~/.local/bin.",
        items: [
          "wpm enable — active la mémoire (écrit wpm.config.json)",
          "wpm disable — retire la config (données conservées)",
          "wpm uninstall — suppression globale complète (venv, binaire, plugin)",
          "wpm search — interroge la mémoire",
          "wpm record-execution — capture un résultat de test/build/lint",
          "wpm plugin install|uninstall — gère le plugin OpenCode",
        ],
      },
    ],
    stack: {
      title: "Stack technique",
      cols: ["Technologie", "Rôle"],
      rows: [
        ["SQLite", "stockage local par projet (.wpm/wpm.db)"],
        ["sqlite-vec", "recherche vectorielle dans la base"],
        ["ONNX Runtime + tokenizers HuggingFace", "embeddings (~100 MB)"],
        ["all-MiniLM-L6-v2", "modèle d'embedding, 384 dimensions"],
        ["MCP", "protocole : 11 outils, 3 ressources, 6 prompts"],
      ],
    },
    flow: {
      title: "Le cycle de la mémoire",
      steps: [
        {
          head: "L'agent travaille",
          text: "« tiens, un fait durable » → store_entry (avec source)",
        },
        {
          head: "La base de mémoire (SQLite locale)",
          text: "chaque entrée a une confiance qui vit : monte (preuves), baisse (temps, contradictions)",
        },
        {
          head: "L'agent a besoin d'infos",
          text: "query_context → les notes fiables remontent, les incertaines restent en retrait ou signalées",
        },
      ],
      footer:
        "L'agent n'a pas besoin de « gérer » la mémoire : il écrit au fil de l'eau et interroge quand il a besoin d'un contexte. Le système s'occupe de la fiabilité.",
    },
  },

  docs: {
    title: "Documentation",
    intro: "La documentation complète de WPM, disponible en français et en anglais.",
    items: {
      concepts: "Concepts et fonctionnement, vulgarisés",
      setup: "Installation, activation, désinstallation",
      workflows: "Les workflows learn, map, bootstrap, audit, patterns",
      "agent-behavior": "Ce que l'agent doit faire (référence)",
      configuration: "Référence wpm.config.json",
    },
    note: "La documentation est proposée en français et en anglais : le commutateur FR/EN (en haut de page) détermine la langue lue.",
    docNote: "Ces docs sont aussi dans le dépôt GitHub",
    githubLabel: "wpm-system sur GitHub",
    notFound: "Cette page de documentation n'existe pas.",
    backToDocs: "Retour à la documentation",
  },

  footer: {
    tagline: "Une mémoire persistante, pondérée par la confiance, pour vos agents IA.",
    forOpencode: "Conçu pour OpenCode",
    license: "WPM — Weighted Persistent Memory",
  },
};
