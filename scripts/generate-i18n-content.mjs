import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';

const docsRoot = join(process.cwd(), 'docs');
const i18nRoot = join(process.cwd(), 'i18n');

const P0_IDS = new Set([
  'guides/getting-started/overview',
  'guides/getting-started/repositories',
  'guides/getting-started/mobile-setup',
  'guides/getting-started/website-setup',
  'guides/getting-started/first-change',
  'guides/architecture/system-overview',
  'guides/architecture/cross-app',
  'troubleshooting/overview',
  'security/model',
  'reference/documentation-status',
]);

const technicalTerms = [
  'Supabase',
  'RLS',
  'RPC',
  'React Native',
  'TanStack Start',
  'Vercel',
  'PostgreSQL',
  'Node.js',
  'Storage',
  'Auth',
  'Edge Function',
  'Mobile',
  'website',
  'IPAC',
  'Docusaurus',
  'Expo',
  'GitHub',
  'Git',
  'npm',
  'SQL',
  'TypeScript',
  'JavaScript',
  'Android',
  'iOS',
];

const docTitleTranslations = {
  fr: {
    'adr/adr-0001-website-framework': ['ADR-0001: framework website', 'ADR-0001', 'Pourquoi website utilise TanStack Start plutôt qu Expo Web.'],
    'adr/adr-0002-repository-migration': ['ADR-0002: migration des dépôts', 'ADR-0002', 'Comment les noms historiques des dépôts et les identifiants actuels sont traités.'],
    'adr/adr-0003-report-packed-date': ['ADR-0003: date packed du rapport', 'ADR-0003', 'Décision sur la source de vérité pour la date packed dans les rapports.'],
    'adr/overview': ['Architectural Decision Records', 'ADR', 'Index des décisions architecturales IPAC.'],
    'backend/database-model': ['Modèle de base de données', 'Modèle de données', 'Tables, vues, RPC et hypothèses backend vérifiées.'],
    'backend/live-verification': ['Vérification live du backend', 'Vérification live', 'Inventaire live Supabase et limites de vérification.'],
    'backend/schema-provenance': ['Provenance du schéma', 'Provenance du schéma', 'Origine des informations de schéma utilisées dans la documentation.'],
    'guides/architecture/cross-app-impact-checklist': ['Checklist d impact cross-app', 'Checklist impact', 'Checklist à utiliser avant de modifier une surface partagée.'],
    'guides/architecture/mobile-architecture': ['Architecture Mobile', 'Mobile', 'Structure de l application Mobile et risques d architecture.'],
    'guides/architecture/shared-backend-model': ['Modèle backend partagé', 'Backend partagé', 'Comment les deux applications partagent Supabase.'],
    'guides/architecture/trigger-driven-behaviour': ['Comportement piloté par triggers', 'Triggers', 'Comportements déclenchés par la base de données et leurs limites.'],
    'guides/architecture/website-architecture': ['Architecture website', 'website', 'Structure de l application website.'],
    'guides/getting-started/environment-variables': ['Variables d environnement', 'Variables d environnement', 'Variables et secrets nécessaires pour exécuter IPAC localement.'],
    'guides/getting-started/prerequisites': ['Prérequis', 'Prérequis', 'Outils et accès requis avant d exécuter IPAC localement.'],
    'guides/introduction': ['Introduction', 'Introduction', 'Ce que couvre ce site de documentation et comment lire son niveau de confiance.'],
    'mobile/build-and-release': ['Build et release Mobile', 'Build et release', 'Comment l application Mobile est buildée et publiée.'],
    'reference/open-questions': ['Questions ouvertes', 'Questions ouvertes', 'Contradictions et lacunes connues qui nécessitent une vérification.'],
    'reference/terminology-glossary': ['Glossaire terminologique', 'Glossaire', 'Traductions standardisées et termes techniques non traduits.'],
    'security/findings': ['Findings sécurité', 'Findings', 'Findings de sécurité vérifiés et risques actifs.'],
    'troubleshooting/authentication': ['Dépannage de l authentification', 'Authentification', 'Diagnostiquer les problèmes de login, session, rôles et profil.'],
    'troubleshooting/configuration': ['Dépannage de configuration', 'Configuration', 'Diagnostiquer variables, réseau, webhooks et environnement.'],
    'troubleshooting/mobile': ['Dépannage Mobile', 'Mobile', 'Diagnostiquer les problèmes de build et runtime Mobile.'],
    'troubleshooting/website': ['Dépannage website', 'website', 'Diagnostiquer les problèmes de build, accès et déploiement website.'],
    'website/roles-and-permissions': ['Rôles et permissions', 'Rôles et permissions', 'Modèle de rôles website, Mobile et Supabase.'],
    'workflows/overview': ['Vue d ensemble des workflows', 'Vue d ensemble', 'Workflows métier IPAC et surfaces partagées.'],
    'workflows/w1-user-provisioning': ['W1: provisioning utilisateur', 'W1 utilisateurs', 'Création d utilisateurs et attribution des rôles.'],
    'workflows/w2-packer-team-assignment': ['W2: affectation packer-team', 'W2 équipes packer', 'Affecter les packers aux teams.'],
    'workflows/w3-attendance': ['W3: attendance', 'W3 attendance', 'Pointage et présence terrain.'],
    'workflows/w4-task-lifecycle': ['W4: cycle de vie des tasks', 'W4 tasks', 'Transitions et statuts des tasks.'],
    'workflows/w5-packer-session': ['W5: session packer', 'W5 session packer', 'Cycle de vie d une session packer.'],
    'workflows/w6-packing-evidence': ['W6: preuve de packing', 'W6 preuve', 'Médias, packed date et preuves de packing.'],
  },
  ar: {
    'adr/adr-0001-website-framework': ['ADR-0001: framework website', 'ADR-0001', 'لماذا يستخدم website ‏TanStack Start بدلا من Expo Web.'],
    'adr/adr-0002-repository-migration': ['ADR-0002: ترحيل المستودعات', 'ADR-0002', 'كيفية التعامل مع أسماء المستودعات التاريخية والمعرفات الحالية.'],
    'adr/adr-0003-report-packed-date': ['ADR-0003: تاريخ packed في التقرير', 'ADR-0003', 'قرار مصدر الحقيقة لتاريخ packed في التقارير.'],
    'adr/overview': ['سجلات القرارات المعمارية', 'ADR', 'فهرس قرارات الهندسة في IPAC.'],
    'backend/database-model': ['نموذج قاعدة البيانات', 'نموذج البيانات', 'الجداول والعروض وRPC وافتراضات backend التي تم التحقق منها.'],
    'backend/live-verification': ['تحقق backend live', 'تحقق live', 'جرد Supabase live وحدود التحقق.'],
    'backend/schema-provenance': ['مصدر المخطط', 'مصدر المخطط', 'أصل معلومات schema المستخدمة في التوثيق.'],
    'guides/architecture/cross-app-impact-checklist': ['Checklist تأثير cross-app', 'Checklist التأثير', 'Checklist قبل تعديل سطح مشترك.'],
    'guides/architecture/mobile-architecture': ['هندسة Mobile', 'Mobile', 'بنية تطبيق Mobile ومخاطر الهندسة.'],
    'guides/architecture/shared-backend-model': ['نموذج backend المشترك', 'Backend مشترك', 'كيف يشترك التطبيقان في Supabase.'],
    'guides/architecture/trigger-driven-behaviour': ['سلوك تقوده triggers', 'Triggers', 'السلوكيات التي تطلقها قاعدة البيانات وحدودها.'],
    'guides/architecture/website-architecture': ['هندسة website', 'website', 'بنية تطبيق website.'],
    'guides/getting-started/environment-variables': ['متغيرات البيئة', 'متغيرات البيئة', 'المتغيرات والأسرار المطلوبة لتشغيل IPAC محليا.'],
    'guides/getting-started/prerequisites': ['المتطلبات', 'المتطلبات', 'الأدوات والوصول المطلوبان قبل تشغيل IPAC محليا.'],
    'guides/introduction': ['مقدمة', 'مقدمة', 'ما يغطيه موقع التوثيق وكيف تقرأ مستوى الثقة.'],
    'mobile/build-and-release': ['Build وrelease لتطبيق Mobile', 'Build وrelease', 'كيف يتم build ونشر تطبيق Mobile.'],
    'reference/open-questions': ['أسئلة مفتوحة', 'أسئلة مفتوحة', 'تناقضات وفجوات معروفة تحتاج إلى تحقق.'],
    'reference/terminology-glossary': ['Glossary المصطلحات', 'Glossary', 'ترجمات موحدة ومصطلحات تقنية لا تترجم.'],
    'security/findings': ['Findings الأمان', 'Findings', 'Findings أمان تم التحقق منها ومخاطر نشطة.'],
    'troubleshooting/authentication': ['استكشاف أخطاء المصادقة', 'المصادقة', 'تشخيص مشاكل login وsession وroles وprofile.'],
    'troubleshooting/configuration': ['استكشاف أخطاء الإعداد', 'الإعداد', 'تشخيص variables وnetwork وwebhooks والبيئة.'],
    'troubleshooting/mobile': ['استكشاف أخطاء Mobile', 'Mobile', 'تشخيص مشاكل build وruntime في Mobile.'],
    'troubleshooting/website': ['استكشاف أخطاء website', 'website', 'تشخيص مشاكل build والوصول والنشر في website.'],
    'website/roles-and-permissions': ['الأدوار والصلاحيات', 'الأدوار والصلاحيات', 'نموذج roles في website وMobile وSupabase.'],
    'workflows/overview': ['نظرة عامة على workflows', 'نظرة عامة', 'Workflows العمل في IPAC والأسطح المشتركة.'],
    'workflows/w1-user-provisioning': ['W1: provisioning المستخدم', 'W1 المستخدمون', 'إنشاء المستخدمين وإسناد roles.'],
    'workflows/w2-packer-team-assignment': ['W2: إسناد packer-team', 'W2 فرق packer', 'إسناد packers إلى teams.'],
    'workflows/w3-attendance': ['W3: attendance', 'W3 attendance', 'تسجيل الحضور في الميدان.'],
    'workflows/w4-task-lifecycle': ['W4: دورة حياة tasks', 'W4 tasks', 'انتقالات وحالات tasks.'],
    'workflows/w5-packer-session': ['W5: جلسة packer', 'W5 جلسة packer', 'دورة حياة جلسة packer.'],
    'workflows/w6-packing-evidence': ['W6: دليل packing', 'W6 دليل', 'Media وpacked date وأدلة packing.'],
  },
};

const phraseTranslations = {
  fr: [
    ['The application inventory, stacks and shared-backend relationship above were checked directly against both repositories.', 'L inventaire applicatif, les stacks et la relation backend partagé ci-dessus ont été vérifiés directement dans les deux dépôts.'],
    ['Tooling requirements were read directly from configuration files.', 'Les exigences d outillage ont été lues directement dans les fichiers de configuration.'],
    ['This mapping is inferred from usage, not declared anywhere', 'Cette correspondance est déduite de l usage; elle n est déclarée nulle part'],
    ['The source policy differs from production', 'La policy source diffère de la production'],
    ['Do not create users with raw SQL', 'Ne créez pas d utilisateurs avec du SQL brut'],
    ['Do not casually change any of these', 'Ne modifiez aucun de ces éléments à la légère'],
    ['A green pull request does not mean a deployable change', 'Une pull request verte ne signifie pas qu un changement est déployable'],
    ['Mobile has no automated quality gates at all', 'Mobile n a aucun quality gate automatisé'],
    ['No CRITICAL findings', 'Aucun finding CRITICAL'],
    ['Source changed since last verification', 'La source a changé depuis la dernière vérification'],
  ],
  ar: [
    ['The application inventory, stacks and shared-backend relationship above were checked directly against both repositories.', 'تم التحقق من جرد التطبيقات والstacks وعلاقة backend المشتركة أعلاه مباشرة في المستودعين.'],
    ['Tooling requirements were read directly from configuration files.', 'تمت قراءة متطلبات الأدوات مباشرة من ملفات الإعداد.'],
    ['This mapping is inferred from usage, not declared anywhere', 'هذه المطابقة مستنتجة من الاستخدام وليست مصرحا بها في مكان واحد'],
    ['The source policy differs from production', 'تختلف policy المصدر عن الإنتاج'],
    ['Do not create users with raw SQL', 'لا تنشئ مستخدمين باستخدام SQL خام'],
    ['Do not casually change any of these', 'لا تغير أيا من هذه العناصر بلا تدقيق'],
    ['A green pull request does not mean a deployable change', 'نجاح pull request لا يعني أن التغيير قابل للنشر'],
    ['Mobile has no automated quality gates at all', 'لا يملك Mobile أي quality gates آلية'],
    ['No CRITICAL findings', 'لا توجد findings من مستوى CRITICAL'],
    ['Source changed since last verification', 'تغير المصدر منذ آخر تحقق'],
  ],
};

const wordTranslations = {
  fr: {
    architecture: 'architecture',
    authentication: 'authentification',
    authorization: 'autorisation',
    security: 'sécurité',
    deployment: 'déploiement',
    deploy: 'déployer',
    workflow: 'workflow',
    workflows: 'workflows',
    database: 'base de données',
    permissions: 'permissions',
    verified: 'vérifié',
    partially: 'partiellement',
    question: 'question',
    questions: 'questions',
    open: 'ouverte',
    source: 'source',
    sources: 'sources',
    repository: 'dépôt',
    repositories: 'dépôts',
    application: 'application',
    applications: 'applications',
    shared: 'partagé',
    backend: 'backend',
    table: 'table',
    tables: 'tables',
    role: 'rôle',
    roles: 'rôles',
    user: 'utilisateur',
    users: 'utilisateurs',
    client: 'client',
    clients: 'clients',
    manager: 'manager',
    managers: 'managers',
    admin: 'admin',
    admins: 'admins',
    operator: 'opérateur',
    operators: 'opérateurs',
    packer: 'packer',
    packers: 'packers',
    status: 'statut',
    evidence: 'preuve',
    risk: 'risque',
    risks: 'risques',
    warning: 'avertissement',
    finding: 'finding',
    findings: 'findings',
    live: 'live',
    local: 'local',
    production: 'production',
    build: 'build',
    release: 'release',
    troubleshooting: 'dépannage',
    configuration: 'configuration',
    environment: 'environnement',
    variable: 'variable',
    variables: 'variables',
    command: 'commande',
    commands: 'commandes',
    file: 'fichier',
    files: 'fichiers',
    path: 'chemin',
    paths: 'chemins',
    route: 'route',
    routes: 'routes',
    function: 'fonction',
    functions: 'fonctions',
    policy: 'policy',
    policies: 'policies',
    storage: 'Storage',
    bucket: 'bucket',
    buckets: 'buckets',
    report: 'rapport',
    reports: 'rapports',
    task: 'task',
    tasks: 'tasks',
    session: 'session',
    sessions: 'sessions',
    inventory: 'inventory',
    attendance: 'attendance',
    order: 'order',
    orders: 'orders',
    request: 'request',
    requests: 'requests',
    if: 'si',
    when: 'quand',
    before: 'avant',
    after: 'après',
    because: 'parce que',
    means: 'signifie',
    must: 'doit',
    should: 'devrait',
    not: 'ne',
    yes: 'oui',
    no: 'non',
    same: 'même',
    different: 'différent',
    current: 'actuel',
    existing: 'existant',
    missing: 'manquant',
    known: 'connu',
    unknown: 'inconnu',
    direct: 'direct',
    indirect: 'indirect',
    read: 'lu',
    write: 'écrit',
    writes: 'écrit',
    reads: 'lit',
    checked: 'vérifié',
    confirm: 'confirmer',
    verify: 'vérifier',
    contains: 'contient',
    includes: 'inclut',
    uses: 'utilise',
    used: 'utilisé',
    created: 'créé',
    updated: 'mis à jour',
  },
  ar: {
    architecture: 'الهندسة',
    authentication: 'المصادقة',
    authorization: 'التفويض',
    security: 'الأمان',
    deployment: 'النشر',
    deploy: 'نشر',
    workflow: 'workflow',
    workflows: 'workflows',
    database: 'قاعدة البيانات',
    permissions: 'الصلاحيات',
    verified: 'تم التحقق',
    partially: 'جزئيا',
    question: 'سؤال',
    questions: 'أسئلة',
    open: 'مفتوح',
    source: 'المصدر',
    sources: 'المصادر',
    repository: 'المستودع',
    repositories: 'المستودعات',
    application: 'التطبيق',
    applications: 'التطبيقات',
    shared: 'مشترك',
    backend: 'backend',
    table: 'table',
    tables: 'tables',
    role: 'role',
    roles: 'roles',
    user: 'مستخدم',
    users: 'مستخدمون',
    client: 'client',
    clients: 'clients',
    manager: 'manager',
    managers: 'managers',
    admin: 'admin',
    admins: 'admins',
    operator: 'مشغل',
    operators: 'مشغلون',
    packer: 'packer',
    packers: 'packers',
    status: 'الحالة',
    evidence: 'الدليل',
    risk: 'الخطر',
    risks: 'المخاطر',
    warning: 'تحذير',
    finding: 'finding',
    findings: 'findings',
    live: 'live',
    local: 'محلي',
    production: 'الإنتاج',
    build: 'build',
    release: 'release',
    troubleshooting: 'استكشاف الأخطاء',
    configuration: 'الإعداد',
    environment: 'البيئة',
    variable: 'variable',
    variables: 'variables',
    command: 'command',
    commands: 'commands',
    file: 'ملف',
    files: 'ملفات',
    path: 'مسار',
    paths: 'مسارات',
    route: 'route',
    routes: 'routes',
    function: 'function',
    functions: 'functions',
    policy: 'policy',
    policies: 'policies',
    storage: 'Storage',
    bucket: 'bucket',
    buckets: 'buckets',
    report: 'تقرير',
    reports: 'تقارير',
    task: 'task',
    tasks: 'tasks',
    session: 'session',
    sessions: 'sessions',
    inventory: 'inventory',
    attendance: 'attendance',
    order: 'order',
    orders: 'orders',
    request: 'request',
    requests: 'requests',
    if: 'إذا',
    when: 'عندما',
    before: 'قبل',
    after: 'بعد',
    because: 'لأن',
    means: 'يعني',
    must: 'يجب',
    should: 'ينبغي',
    not: 'لا',
    same: 'نفس',
    different: 'مختلف',
    current: 'الحالي',
    existing: 'الموجود',
    missing: 'المفقود',
    known: 'المعروف',
    unknown: 'غير معروف',
    direct: 'مباشر',
    indirect: 'غير مباشر',
    read: 'قراءة',
    write: 'كتابة',
    writes: 'يكتب',
    reads: 'يقرأ',
    checked: 'تم التحقق',
    confirm: 'تأكيد',
    verify: 'تحقق',
    contains: 'يحتوي',
    includes: 'يتضمن',
    uses: 'يستخدم',
    used: 'مستخدم',
    created: 'أنشئ',
    updated: 'حدث',
  },
};

const translatedPages = {
  fr: {
    'guides/getting-started/overview': {
      frontMatter: `---
title: Bien démarrer
sidebar_label: Vue d ensemble
description: Le parcours d orientation pour préparer un environnement IPAC et choisir la prochaine page.
---
`,
      body: `<header>
# Bien démarrer
</header>

<Status type="verified" date="2026-08-19">
  Cette page localisée résume le parcours d onboarding. Les détails techniques restent vérifiés dans la documentation anglaise source.
</Status>

IPAC est documenté comme un système partagé : **Mobile**, **website** et un seul backend **Supabase**. Commencez ici si vous devez préparer un poste, comprendre les dépôts, ou faire une première modification.

## Ordre recommandé

1. Lisez [Repositories](./repositories) pour savoir quel dépôt contient quelle surface.
2. Préparez les prérequis et variables d environnement dans la documentation anglaise canonique si une page localisée n existe pas encore.
3. Configurez [Mobile](./mobile-setup) ou [website](./website-setup), selon votre tâche.
4. Avant de modifier du code, suivez [Your first change](./first-change).

## Règle de source

English reste la source canonique. Les identifiants comme Supabase, RLS, RPC, React Native, TanStack Start, Vercel, PostgreSQL, Edge Function, Storage, Auth et Node.js ne sont pas traduits.
`,
    },
    'guides/getting-started/repositories': {
      frontMatter: `---
title: Dépôts
sidebar_label: Dépôts
description: Les dépôts IPAC et le rôle de chacun.
---
`,
      body: `<header>
# Dépôts
</header>

<Status type="verified" date="2026-08-19">
  Cette traduction garde les noms de dépôts et chemins techniques inchangés.
</Status>

IPAC est réparti sur trois dépôts principaux :

| Dépôt | Rôle |
| --- | --- |
| \`ipac-documentation\` | Documentation Docusaurus et source canonique de cette base de connaissance. |
| \`website\` | Application web TanStack Start pour managers, admins et vues client restreintes. |
| \`Mobile\` | Application React Native / Expo pour les opérateurs terrain, admins et packers. |

## Règle de navigation

Les pages de documentation expliquent les concepts et pointent vers le code avec \`SourceRef\`. Les détails propres au code restent dans les dépôts applicatifs.
`,
    },
    'guides/getting-started/mobile-setup': {
      frontMatter: `---
title: Setup Mobile
sidebar_label: Setup Mobile
description: Préparer l environnement local pour l application Mobile IPAC.
---
`,
      body: `<header>
# Setup Mobile
</header>

<Status type="verified" date="2026-08-19">
  Les noms d outils, commandes et fichiers restent en anglais pour éviter toute ambiguïté.
</Status>

Utilisez cette page pour préparer l application **Mobile** React Native / Expo. Gardez les versions et commandes exactement comme dans la page anglaise source.

## Points à vérifier

- Node.js reste aligné sur le dépôt Mobile.
- Les variables d environnement ne doivent pas être inventées.
- Les chemins \`.env\`, \`app.json\`, \`eas.json\` et les scripts npm restent LTR.
- Testez la surface que vous modifiez, et vérifiez les composants \`.native.tsx\` / \`.web.tsx\` quand ils existent.
`,
    },
    'guides/getting-started/website-setup': {
      frontMatter: `---
title: Setup website
sidebar_label: Setup website
description: Préparer l environnement local pour l application website IPAC.
---
`,
      body: `<header>
# Setup website
</header>

<Status type="verified" date="2026-08-19">
  Cette page localisée résume la préparation website. Les commandes exactes restent dans la source anglaise.
</Status>

**website** est l application web TanStack Start. Elle utilise Supabase pour Auth, PostgreSQL et les accès applicatifs.

## Points à vérifier

- Installez les dépendances avec la version Node.js attendue.
- Ne créez pas de variables d environnement non vérifiées.
- Les routes et composants website restent référencés avec leurs chemins exacts.
- Validez les permissions quand une page touche les rôles ou l accès.
`,
    },
    'guides/getting-started/first-change': {
      frontMatter: `---
title: Votre premier changement
sidebar_label: Votre premier changement
description: Parcours pratique pour faire une petite modification IPAC sans casser l autre application.
---
`,
      body: `<header>
# Votre premier changement
</header>

<Status type="verified" date="2026-08-19">
  Cette traduction conserve les termes techniques et les niveaux de risque de la source anglaise.
</Status>

Avant de coder, répondez à deux questions :

1. La modification touche-t-elle **Mobile**, **website** ou le backend partagé ?
2. La modification lit-elle ou écrit-elle une table, un RPC, Auth, Storage, RLS ou des rôles utilisés par l autre application ?

## Niveaux de risque

| Niveau | Indication |
| --- | --- |
| LOW | Changement UI local sans donnée partagée. |
| MEDIUM | Changement qui lit ou affiche une donnée partagée existante. |
| HIGH | Changement sur Auth, roles, RLS, Storage, RPC, schema ou vocabulaire de statut partagé. |

## Règle

Les deux applications partagent un seul projet Supabase. Une hypothèse changée dans une application peut casser l autre sans erreur évidente. Pour les détails complets et les commandes exactes, utilisez la page anglaise canonique.

## La documentation doit-elle changer ? {#step-11}

Si votre modification change un comportement, un flux, une commande, une variable d environnement, un modèle de sécurité ou une hypothèse cross-app, mettez à jour \`ipac-documentation\` dans le même changement.
`,
    },
    'guides/architecture/system-overview': {
      frontMatter: `---
title: Architecture système
sidebar_label: Vue d ensemble
description: Vue d ensemble de l architecture IPAC.
---
`,
      body: `<header>
# Architecture système
</header>

<Status type="verified" date="2026-08-19">
  Cette page localisée garde les diagrammes et identifiants techniques inchangés.
</Status>

IPAC combine deux clients applicatifs avec un backend Supabase partagé :

\`\`\`mermaid
flowchart TB
  Mobile["Mobile"] --> Supabase["Supabase<br/>Auth / PostgreSQL / RLS / Storage"]
  Website["website"] --> Supabase
  Supabase --> Mobile
  Supabase --> Website
\`\`\`

| Couche | Responsabilité |
| --- | --- |
| Mobile | Opérations terrain, écrans admin et packer. |
| website | Gestion, administration et vues client restreintes. |
| Supabase | Auth, PostgreSQL, RLS, Storage, RPC / Functions. |

## Point central

Le backend partagé est la contrainte architecturale principale. Les changements de schema, RLS, RPC, Storage ou roles doivent être considérés comme cross-app par défaut.
`,
    },
    'guides/architecture/cross-app': {
      frontMatter: `---
title: Architecture inter-applications
sidebar_label: Architecture inter-apps
description: Comment Mobile et website interagissent via le backend partagé.
---
`,
      body: `<header>
# Architecture inter-applications
</header>

<Status type="verified" date="2026-08-19">
  Les noms de tables, RPC et politiques restent non traduits.
</Status>

Mobile et website ne communiquent pas via une API versionnée entre eux. Ils coordonnent leur comportement via l état partagé dans Supabase.

## Zones à traiter comme partagées

- Tables lues ou écrites par les deux applications.
- Auth et profiles.
- Roles et décisions d accès.
- RLS policies.
- Storage buckets et URLs publiques.
- RPC et Edge Function.

Quand une modification touche ces zones, vérifiez l autre application avant merge.
`,
    },
    'troubleshooting/overview': {
      frontMatter: `---
title: Dépannage
sidebar_label: Vue d ensemble
description: Point d entrée pour diagnostiquer les problèmes IPAC.
---
`,
      body: `<header>
# Dépannage
</header>

<Status type="verified" date="2026-08-19">
  Cette page localisée oriente vers les pages de diagnostic existantes.
</Status>

Commencez par identifier la surface touchée :

| Symptôme | Page |
| --- | --- |
| Login, session, roles | [Authentication](./authentication) |
| Build ou runtime Mobile | [Mobile](./mobile) |
| Build ou déploiement website | [website](./website) |
| Variables, réseau, webhooks | [Configuration](./configuration) |

Gardez les logs, commandes, URLs et noms de variables en LTR.
`,
    },
    'security/model': {
      frontMatter: `---
title: Modèle de sécurité
sidebar_label: Modèle
description: Limites d autorisation et modèle de sécurité IPAC.
---
`,
      body: `<header>
# Modèle de sécurité
</header>

<Status type="verified" date="2026-08-19">
  Les termes RLS, Auth, Storage, RPC et Edge Function restent inchangés.
</Status>

Le modèle de sécurité IPAC repose sur plusieurs couches :

- Supabase Auth identifie l utilisateur.
- Les rôles applicatifs contrôlent les surfaces website et Mobile.
- RLS doit protéger les données dans PostgreSQL.
- Storage et Edge Function nécessitent une vérification séparée.

## Risque principal

L autorisation est dupliquée entre plusieurs couches. Une modification de role, RLS, route guard ou fonction privilégiée doit être testée comme changement HIGH risk.
`,
    },
    'reference/documentation-status': {
      frontMatter: `---
title: État de la documentation
sidebar_label: État de la documentation
description: Comment les statuts de vérification sont calculés et lus.
---
`,
      body: `<header>
# État de la documentation
</header>

<Status type="verified" date="2026-08-19">
  Les compteurs restent générés depuis la documentation anglaise source.
</Status>

Les compteurs de statut ne sont pas maintenus séparément par locale. Le script \`scripts/generate-doc-status.mjs\` lit les pages sources dans \`docs/\` et génère une seule vérité dans \`src/generated/documentationStatus.ts\`.

## Signification

| Statut | Sens |
| --- | --- |
| Verified | Les affirmations ont été vérifiées contre les sources indiquées. |
| Partial | Une partie est vérifiée; les limites sont indiquées. |
| Open Question | Une contradiction ou lacune connue reste ouverte. |

Les traductions ne doivent pas modifier les nombres générés.
`,
    },
  },
  ar: {
    'guides/getting-started/overview': {
      frontMatter: `---
title: البدء
sidebar_label: نظرة عامة
description: مسار التهيئة لفهم IPAC واختيار الصفحة التالية.
---
`,
      body: `<header>
# البدء
</header>

<Status type="verified" date="2026-08-19">
  تلخص هذه الصفحة المحلية مسار onboarding. تبقى التفاصيل التقنية موثقة في المصدر الإنجليزي.
</Status>

IPAC موثق كنظام مشترك: **Mobile** و **website** وbackend واحد هو **Supabase**. ابدأ هنا إذا كنت تجهز بيئة عمل أو تريد فهم المستودعات أو تنفيذ أول تغيير.

## الترتيب المقترح

1. اقرأ [Repositories](./repositories) لمعرفة دور كل مستودع.
2. راجع المتطلبات ومتغيرات البيئة في المصدر الإنجليزي عند عدم وجود صفحة مترجمة.
3. جهز [Mobile](./mobile-setup) أو [website](./website-setup) حسب المهمة.
4. قبل تعديل الكود، اتبع [Your first change](./first-change).

## قاعدة المصدر

تبقى English هي اللغة المصدر. لا تترجم المعرفات مثل Supabase وRLS وRPC وReact Native وTanStack Start وVercel وPostgreSQL وEdge Function وStorage وAuth وNode.js.
`,
    },
    'guides/getting-started/repositories': {
      frontMatter: `---
title: المستودعات
sidebar_label: المستودعات
description: مستودعات IPAC ودور كل واحد.
---
`,
      body: `<header>
# المستودعات
</header>

<Status type="verified" date="2026-08-19">
  تحافظ هذه الترجمة على أسماء المستودعات والمسارات التقنية كما هي.
</Status>

يتوزع IPAC على ثلاثة مستودعات رئيسية:

| المستودع | الدور |
| --- | --- |
| \`ipac-documentation\` | توثيق Docusaurus والمصدر المعتمد لقاعدة المعرفة. |
| \`website\` | تطبيق TanStack Start للمديرين وadmins وعروض client المقيدة. |
| \`Mobile\` | تطبيق React Native / Expo للمشغلين وadmins وpackers. |

تشرح صفحات التوثيق المفاهيم وتشير إلى الكود عبر \`SourceRef\`. تبقى التفاصيل الخاصة بالكود في مستودعات التطبيقات.
`,
    },
    'guides/getting-started/mobile-setup': {
      frontMatter: `---
title: إعداد Mobile
sidebar_label: إعداد Mobile
description: تجهيز البيئة المحلية لتطبيق Mobile في IPAC.
---
`,
      body: `<header>
# إعداد Mobile
</header>

<Status type="verified" date="2026-08-19">
  تبقى أسماء الأدوات والأوامر والملفات بالإنجليزية لتجنب الالتباس.
</Status>

استخدم هذه الصفحة لتجهيز تطبيق **Mobile** المبني على React Native / Expo. حافظ على الإصدارات والأوامر كما هي في المصدر الإنجليزي.

## نقاط التحقق

- يجب أن تتطابق Node.js مع مستودع Mobile.
- لا تخترع متغيرات بيئة غير موثقة.
- تبقى المسارات \`.env\` و\`app.json\` و\`eas.json\` وnpm scripts باتجاه LTR.
- اختبر السطح الذي تعدله، وراجع أزواج \`.native.tsx\` / \`.web.tsx\` عند وجودها.
`,
    },
    'guides/getting-started/website-setup': {
      frontMatter: `---
title: إعداد website
sidebar_label: إعداد website
description: تجهيز البيئة المحلية لتطبيق website في IPAC.
---
`,
      body: `<header>
# إعداد website
</header>

<Status type="verified" date="2026-08-19">
  تلخص هذه الصفحة إعداد website. تبقى الأوامر الدقيقة في المصدر الإنجليزي.
</Status>

**website** هو تطبيق TanStack Start. يستخدم Supabase من أجل Auth وPostgreSQL وقرارات الوصول.

## نقاط التحقق

- ثبت dependencies بإصدار Node.js المتوقع.
- لا تنشئ متغيرات بيئة غير موثقة.
- حافظ على أسماء routes وcomponents بالمسارات الأصلية.
- تحقق من الصلاحيات عندما تمس الصفحة roles أو access.
`,
    },
    'guides/getting-started/first-change': {
      frontMatter: `---
title: أول تغيير لك
sidebar_label: أول تغيير
description: مسار عملي لتنفيذ تعديل صغير في IPAC دون كسر التطبيق الآخر.
---
`,
      body: `<header>
# أول تغيير لك
</header>

<Status type="verified" date="2026-08-19">
  تحافظ هذه الترجمة على المصطلحات التقنية ومستويات الخطر من المصدر الإنجليزي.
</Status>

قبل كتابة الكود، أجب عن سؤالين:

1. هل يمس التغيير **Mobile** أو **website** أو backend المشترك؟
2. هل يقرأ أو يكتب table أو RPC أو Auth أو Storage أو RLS أو roles يستخدمها التطبيق الآخر؟

## مستويات الخطر

| المستوى | المعنى |
| --- | --- |
| LOW | تعديل UI محلي بلا بيانات مشتركة. |
| MEDIUM | تعديل يقرأ أو يعرض بيانات مشتركة موجودة. |
| HIGH | تعديل على Auth أو roles أو RLS أو Storage أو RPC أو schema أو status vocabulary مشترك. |

يشترك التطبيقان في مشروع Supabase واحد. تغيير فرضية في تطبيق قد يكسر الآخر دون خطأ واضح.

## هل يجب تحديث التوثيق؟ {#step-11}

إذا غير التعديل سلوكا أو workflow أو command أو environment variable أو security model أو فرضية cross-app، فحدث \`ipac-documentation\` في نفس التغيير.
`,
    },
    'guides/architecture/system-overview': {
      frontMatter: `---
title: هندسة النظام
sidebar_label: نظرة عامة
description: نظرة عامة على هندسة IPAC.
---
`,
      body: `<header>
# هندسة النظام
</header>

<Status type="verified" date="2026-08-19">
  تحافظ هذه الصفحة على الرسوم والمعرفات التقنية كما هي.
</Status>

يجمع IPAC بين عميلين تطبيقيين وbackend مشترك في Supabase:

\`\`\`mermaid
flowchart TB
  Mobile["Mobile"] --> Supabase["Supabase<br/>Auth / PostgreSQL / RLS / Storage"]
  Website["website"] --> Supabase
  Supabase --> Mobile
  Supabase --> Website
\`\`\`

| الطبقة | المسؤولية |
| --- | --- |
| Mobile | عمليات الميدان وشاشات admin وpacker. |
| website | الإدارة والعروض المقيدة للعميل. |
| Supabase | Auth وPostgreSQL وRLS وStorage وRPC / Functions. |

الbackend المشترك هو القيد المعماري الرئيسي. أي تغيير في schema أو RLS أو RPC أو Storage أو roles يعامل كتغيير cross-app افتراضيا.
`,
    },
    'guides/architecture/cross-app': {
      frontMatter: `---
title: هندسة بين التطبيقات
sidebar_label: هندسة Cross-App
description: كيف يتفاعل Mobile وwebsite عبر backend المشترك.
---
`,
      body: `<header>
# هندسة بين التطبيقات
</header>

<Status type="verified" date="2026-08-19">
  تبقى أسماء tables وRPC وpolicies غير مترجمة.
</Status>

لا يتواصل Mobile وwebsite عبر API versioned بينهما. ينسقان السلوك عبر الحالة المشتركة في Supabase.

## مناطق مشتركة

- tables التي يقرأها أو يكتبها التطبيقان.
- Auth وprofiles.
- roles وقرارات access.
- RLS policies.
- Storage buckets وpublic URLs.
- RPC وEdge Function.

عندما يمس تغيير هذه المناطق، تحقق من التطبيق الآخر قبل merge.
`,
    },
    'troubleshooting/overview': {
      frontMatter: `---
title: استكشاف الأخطاء
sidebar_label: نظرة عامة
description: نقطة الدخول لتشخيص مشاكل IPAC.
---
`,
      body: `<header>
# استكشاف الأخطاء
</header>

<Status type="verified" date="2026-08-19">
  توجه هذه الصفحة المحلية إلى صفحات التشخيص الموجودة.
</Status>

ابدأ بتحديد السطح المتأثر:

| العرض | الصفحة |
| --- | --- |
| login أو session أو roles | [Authentication](./authentication) |
| build أو runtime في Mobile | [Mobile](./mobile) |
| build أو deploy في website | [website](./website) |
| variables أو network أو webhooks | [Configuration](./configuration) |

حافظ على logs وcommands وURLs وأسماء variables باتجاه LTR.
`,
    },
    'security/model': {
      frontMatter: `---
title: نموذج الأمان
sidebar_label: النموذج
description: حدود التفويض ونموذج الأمان في IPAC.
---
`,
      body: `<header>
# نموذج الأمان
</header>

<Status type="verified" date="2026-08-19">
  تبقى المصطلحات RLS وAuth وStorage وRPC وEdge Function كما هي.
</Status>

يعتمد نموذج أمان IPAC على عدة طبقات:

- Supabase Auth يحدد المستخدم.
- roles التطبيق تتحكم بواجهات website وMobile.
- RLS يجب أن تحمي البيانات داخل PostgreSQL.
- Storage وEdge Function تحتاجان تحقق منفصل.

الخطر الرئيسي هو تكرار authorization عبر عدة طبقات. أي تغيير في role أو RLS أو route guard أو privileged function يعامل كتغيير HIGH risk.
`,
    },
    'reference/documentation-status': {
      frontMatter: `---
title: حالة التوثيق
sidebar_label: حالة التوثيق
description: كيف تحسب وتقرأ حالات التحقق.
---
`,
      body: `<header>
# حالة التوثيق
</header>

<Status type="verified" date="2026-08-19">
  تبقى الأعداد مولدة من التوثيق الإنجليزي المصدر.
</Status>

لا تتم صيانة أعداد الحالة بشكل منفصل لكل لغة. يقرأ \`scripts/generate-doc-status.mjs\` صفحات المصدر في \`docs/\` ويولد حقيقة واحدة في \`src/generated/documentationStatus.ts\`.

## المعنى

| الحالة | المعنى |
| --- | --- |
| Verified | تم التحقق من الادعاءات مقابل المصادر المذكورة. |
| Partial | جزء موثق؛ الحدود مذكورة. |
| Open Question | تناقض أو فجوة معروفة ما زالت مفتوحة. |

يجب ألا تغير الترجمات الأعداد المولدة.
`,
    },
  },
};

function walk(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(path);
    }
    return /\.(md|mdx)$/.test(entry.name) ? [path] : [];
  });
}

function docId(file) {
  return relative(docsRoot, file).replace(/\.(md|mdx)$/, '');
}

function protectTechnicalTerms(text, locale) {
  const placeholders = new Map();
  let value = text;
  const patterns = [
    /`[^`]+`/g,
    /<[^>]+>/g,
    /\]\([^)]+\)/g,
    /https?:\/\/\S+/g,
    /(?:\.{1,2}\/|\/docs\/)[^\s)]+/g,
    /\b[A-Za-z0-9._/-]+:[A-Za-z0-9._/-]+\b/g,
    /\b[0-9a-f]{7,40}\b/g,
    ...technicalTerms.map(
      (term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'),
    ),
  ];

  for (const pattern of patterns) {
    value = value.replace(pattern, (match) => {
      const key = `__IPAC_${locale}_${placeholders.size}__`;
      placeholders.set(key, match);
      return key;
    });
  }

  return {
    value,
    restore(translated) {
      let restored = translated;
      for (const [key, original] of placeholders) {
        restored = restored.replaceAll(key, original);
      }
      return restored;
    },
  };
}

function applyDictionary(text, locale) {
  const {value, restore} = protectTechnicalTerms(text, locale);
  let translated = value;

  for (const [from, to] of phraseTranslations[locale]) {
    translated = translated.replaceAll(from, to);
  }

  const dictionary = wordTranslations[locale];
  translated = translated.replace(/\b[A-Za-z][A-Za-z'-]*\b/g, (word) => {
    const lower = word.toLowerCase().replace(/'s$/, '');
    const replacement = dictionary[lower];
    if (!replacement) {
      return word;
    }
    return word[0] === word[0].toUpperCase()
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });

  translated = translated
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\bthe\b/gi, locale === 'fr' ? 'le' : 'ال')
    .replace(/\band\b/gi, locale === 'fr' ? 'et' : 'و')
    .replace(/\bor\b/gi, locale === 'fr' ? 'ou' : 'أو')
    .replace(/\bof\b/gi, locale === 'fr' ? 'de' : 'من')
    .replace(/\bto\b/gi, locale === 'fr' ? 'vers' : 'إلى')
    .replace(/\bfor\b/gi, locale === 'fr' ? 'pour' : 'لـ')
    .replace(/\bwith\b/gi, locale === 'fr' ? 'avec' : 'مع')
    .replace(/\bin\b/gi, locale === 'fr' ? 'dans' : 'في')
    .replace(/\bis\b/gi, locale === 'fr' ? 'est' : 'هو')
    .replace(/\bare\b/gi, locale === 'fr' ? 'sont' : 'هي')
    .replace(/\bwas\b/gi, locale === 'fr' ? 'a été' : 'تم')
    .replace(/\bwere\b/gi, locale === 'fr' ? 'ont été' : 'تم')
    .replace(/\bwill\b/gi, locale === 'fr' ? 'va' : 'سوف')
    .replace(/\bcan\b/gi, locale === 'fr' ? 'peut' : 'يمكن')
    .replace(/\bfrom\b/gi, locale === 'fr' ? 'depuis' : 'من')
    .replace(/\bby\b/gi, locale === 'fr' ? 'par' : 'بواسطة');

  return restore(translated);
}

function translateFrontMatter(source, locale, id) {
  if (!source.startsWith('---\n')) {
    return {frontMatter: '', body: source};
  }

  const end = source.indexOf('\n---\n', 4);
  if (end === -1) {
    return {frontMatter: '', body: source};
  }

  const translations = docTitleTranslations[locale][id];
  const yamlValue = (value) => JSON.stringify(value);
  const frontMatter = source
    .slice(4, end)
    .split('\n')
    .map((line) => {
      if (translations) {
        if (line.startsWith('title:')) return `title: ${yamlValue(translations[0])}`;
        if (line.startsWith('sidebar_label:')) return `sidebar_label: ${yamlValue(translations[1])}`;
        if (line.startsWith('description:')) return `description: ${yamlValue(translations[2])}`;
      }
      return line.replace(/^([^:]+):\s*(.*)$/, (_, key, value) =>
        ['title', 'sidebar_label', 'description'].includes(key)
          ? `${key}: ${yamlValue(applyDictionary(value, locale))}`
          : line,
      );
    })
    .join('\n');

  return {
    frontMatter: `---\n${frontMatter}\n---\n`,
    body: source.slice(end + 5),
  };
}

function translateMarkdownLine(line, locale) {
  if (
    line.trim() === '' ||
    line.trim().startsWith('<Status') ||
    line.trim().startsWith('</Status') ||
    line.trim().startsWith('<SourceRef') ||
    /^\s*(type|date|sources|repo|path|symbol)=/.test(line) ||
    line.trim().startsWith('sources={[') ||
    line.trim().startsWith(']}>') ||
    /^(\s*)['"][^'"]+['"],?$/.test(line) ||
    /^(\s*)[|][-: |]+$/.test(line)
  ) {
    return line;
  }

  const admonition = line.match(/^(\s*:{3,4}\w+\s+)(.+)$/);
  if (admonition) {
    return `${admonition[1]}${applyDictionary(admonition[2], locale)}`;
  }

  const heading = line.match(/^(#{1,6}\s+)(.+)$/);
  if (heading) {
    const rawHeading = heading[2];
    const existingAnchor = rawHeading.match(/\s+\{#[A-Za-z0-9_-]+\}$/);
    const visibleHeading = existingAnchor ? rawHeading.replace(existingAnchor[0], '') : rawHeading;
    const slug =
      visibleHeading === 'Configuration precedence — a trap'
        ? 'configuration-precedence--a-trap'
        : visibleHeading
            .toLowerCase()
            .replace(/`([^`]+)`/g, '$1')
            .replace(/<[^>]+>/g, '')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    const anchor =
      existingAnchor?.[0] ??
      ` {#${slug}}`;
    return `${heading[1]}${applyDictionary(visibleHeading, locale)}${anchor}`;
  }

  const listItem = line.match(/^(\s*(?:[-*]|\d+\.)\s+)(.+)$/);
  if (listItem) {
    return `${listItem[1]}${applyDictionary(listItem[2], locale)}`;
  }

  if (line.includes('|')) {
    return line
      .split('|')
      .map((cell, index, cells) => {
        if (index === 0 || index === cells.length - 1) {
          return cell;
        }
        return applyDictionary(cell, locale);
      })
      .join('|');
  }

  return applyDictionary(line, locale);
}

function translateMdx(source, locale, id) {
  const {frontMatter, body} = translateFrontMatter(source, locale, id);
  let inFence = false;
  const translatedBody = body
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) {
        return line;
      }
      return translateMarkdownLine(line, locale);
    })
    .join('\n');

  return `${frontMatter}${translatedBody}`;
}

for (const locale of ['fr', 'ar']) {
  for (const file of walk(docsRoot)) {
    const id = docId(file);
    const source = readFileSync(file, 'utf8');
    const target = join(
      i18nRoot,
      locale,
      'docusaurus-plugin-content-docs',
      'current',
      relative(docsRoot, file),
    );
    const translated = translatedPages[locale]?.[id];
    const content = translated
      ? `${translated.frontMatter}\n${translated.body}\n`
      : `${translateMdx(source, locale, id)}\n`;

    mkdirSync(dirname(target), {recursive: true});
    writeFileSync(target, content, 'utf8');

    if (!translated && P0_IDS.has(id)) {
      throw new Error(`Missing ${locale} P0 translation for ${id}`);
    }
  }
}
