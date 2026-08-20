import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Repository registry.
 *
 * `SourceRef` (src/components/SourceRef) resolves references against this map,
 * so that verified source links can be introduced later by editing this file
 * only — no change to any MDX page.
 *
 * `ref` is intentionally a branch today. When commit-SHA pinning is adopted,
 * replace it with a SHA here (and, if needed, per reference via the `ref` prop).
 *
 * `url: null` means the canonical repository is NOT yet established. In that
 * case SourceRef renders a non-linked path instead of inventing a URL.
 */
const REPOSITORIES = {
  website: {
    label: 'website',
    // Canonical organisation confirmed 2026-08-19 (OQ-010 closed): matches the
    // checkout's own origin remote. Formerly it-ipac/admin-panel — a merge
    // commit in this repository's history records the old location.
    url: 'https://github.com/ipacapps/website',
    ref: 'main',
  },
  Mobile: {
    label: 'Mobile',
    // Resolved 2026-08-19 (OQ-001 closed): the checkout's only configured
    // remote is ipacapps/Mobile, and ipacapps is the confirmed organisation.
    url: 'https://github.com/ipacapps/Mobile',
    ref: 'main',
  },
  'ipac-documentation': {
    label: 'ipac-documentation',
    url: 'https://github.com/ipacapps/ipac-documentation',
    ref: 'main',
  },
} as const;

const SOURCE_VERIFICATION = {
  website: {
    reviewedRef: '04fcc9354b30acfb1538acb3708aa90d62be0ce4',
    latestRef: 'd4857d00e5dea34fd1dea646f297261738651c40',
    checkedAt: '2026-08-20',
  },
  Mobile: {
    reviewedRef: '2de95be836a0f2b5066c52ac6470e41296352517',
    latestRef: '2de95be836a0f2b5066c52ac6470e41296352517',
    checkedAt: '2026-08-20',
  },
} as const;

const DOCS_REPO = REPOSITORIES['ipac-documentation'].url;
const IS_DEV_SERVER = process.env.IPAC_DOCS_DEV_SERVER === '1';
const CURRENT_LOCALE = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en';

const UI = {
  en: {
    nav: {
      docs: 'Docs',
      architecture: 'Architecture',
      operations: 'Operations',
      reference: 'Reference',
      gettingStarted: 'Getting Started',
      mobile: 'Mobile',
      website: 'Website',
      workflows: 'Workflows',
      systemOverview: 'System Overview',
      crossApp: 'Cross-App',
      sharedBackend: 'Shared Backend',
      database: 'Database',
      security: 'Security',
      troubleshooting: 'Troubleshooting',
      buildRelease: 'Build & Release',
      websiteDeployment: 'Website Deployment',
      liveVerification: 'Live Verification',
      documentationStatus: 'Documentation Status',
      openQuestions: 'Open Questions',
      adrs: 'ADRs',
      schemaProvenance: 'Schema Provenance',
      github: 'GitHub',
    },
    footer: {
      startHere: 'Start here',
      introduction: 'Introduction',
      gettingStarted: 'Getting started',
      systemArchitecture: 'System architecture',
      reference: 'Reference',
      openQuestions: 'Open questions',
      documentationStatus: 'Documentation status',
      architecturalDecisions: 'Architectural decisions',
      repositories: 'Repositories',
      copyright: 'Internal documentation - not for public distribution.',
    },
    devSearch: 'Search is available in production builds.',
  },
  fr: {
    nav: {
      docs: 'Docs',
      architecture: 'Architecture',
      operations: 'Operations',
      reference: 'Référence',
      gettingStarted: 'Bien démarrer',
      mobile: 'Mobile',
      website: 'Website',
      workflows: 'Flux de travail',
      systemOverview: 'Vue système',
      crossApp: 'Inter-applications',
      sharedBackend: 'Backend partagé',
      database: 'Base de données',
      security: 'Sécurité',
      troubleshooting: 'Dépannage',
      buildRelease: 'Build & release',
      websiteDeployment: 'Déploiement website',
      liveVerification: 'Vérification live',
      documentationStatus: 'État de la documentation',
      openQuestions: 'Questions ouvertes',
      adrs: 'ADR',
      schemaProvenance: 'Provenance du schéma',
      github: 'GitHub',
    },
    footer: {
      startHere: 'Commencer',
      introduction: 'Introduction',
      gettingStarted: 'Bien démarrer',
      systemArchitecture: 'Architecture système',
      reference: 'Référence',
      openQuestions: 'Questions ouvertes',
      documentationStatus: 'État de la documentation',
      architecturalDecisions: 'Décisions architecturales',
      repositories: 'Dépôts',
      copyright: 'Documentation interne - diffusion publique interdite.',
    },
    devSearch: 'La recherche est disponible dans les builds de production.',
  },
  ar: {
    nav: {
      docs: 'المستندات',
      architecture: 'الهندسة',
      operations: 'التشغيل',
      reference: 'المرجع',
      gettingStarted: 'البدء',
      mobile: 'Mobile',
      website: 'Website',
      workflows: 'سير العمل',
      systemOverview: 'نظرة على النظام',
      crossApp: 'بين التطبيقات',
      sharedBackend: 'Backend مشترك',
      database: 'قاعدة البيانات',
      security: 'الأمان',
      troubleshooting: 'استكشاف الأخطاء',
      buildRelease: 'Build & release',
      websiteDeployment: 'نشر website',
      liveVerification: 'تحقق live',
      documentationStatus: 'حالة التوثيق',
      openQuestions: 'أسئلة مفتوحة',
      adrs: 'ADR',
      schemaProvenance: 'مصدر المخطط',
      github: 'GitHub',
    },
    footer: {
      startHere: 'ابدأ هنا',
      introduction: 'مقدمة',
      gettingStarted: 'البدء',
      systemArchitecture: 'هندسة النظام',
      reference: 'المرجع',
      openQuestions: 'أسئلة مفتوحة',
      documentationStatus: 'حالة التوثيق',
      architecturalDecisions: 'قرارات الهندسة',
      repositories: 'المستودعات',
      copyright: 'توثيق داخلي - غير مخصص للنشر العام.',
    },
    devSearch: 'البحث متاح في builds الإنتاج.',
  },
} as const;

const t = UI[CURRENT_LOCALE as keyof typeof UI] ?? UI.en;

const LOCAL_SEARCH_PLUGIN: NonNullable<Config['plugins']>[number] = [
  '@easyops-cn/docusaurus-search-local',
  {
    hashed: true,
    indexDocs: true,
    indexPages: true,
    indexBlog: false,
    docsRouteBasePath: '/docs',
    searchResultLimits: 20,
    searchResultContextMaxLength: 80,
    explicitSearchResultPath: true,
    searchBarShortcut: false,
    searchBarShortcutHint: false,
    searchBarPosition: 'right',
    language: ['en', 'fr', 'ar'],
  },
];

const config: Config = {
  title: 'IPAC Documentation',
  tagline: 'Engineering knowledge base for the IPAC operations system',
  favicon: 'img/favicon.svg',

  // Placeholder until a final domain is confirmed. Vercel serves the site
  // correctly regardless; this value only affects absolute URL generation.
  url: 'https://ipac-documentation.vercel.app',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'ipacapps',
  projectName: 'ipac-documentation',

  // A knowledge base with rotten links is worse than no knowledge base.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en',
        path: 'en',
        baseUrl: '/en/',
      },
      fr: {
        label: 'Français',
        htmlLang: 'fr',
      },
      ar: {
        label: 'العربية',
        htmlLang: 'ar',
        direction: 'rtl',
      },
    },
  },

  markdown: {
    mermaid: true,
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: IS_DEV_SERVER ? [] : [LOCAL_SEARCH_PLUGIN],

  customFields: {
    repositories: REPOSITORIES,
    sourceVerification: SOURCE_VERIFICATION,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `${DOCS_REPO}/edit/main/`,
          // Git-derived "last updated" metadata is deliberately off: it makes the
          // build depend on git history (and on Vercel's clone depth), and it is a
          // weaker signal than the explicit, dated <Status> banner every page
          // carries. Page freshness is asserted, not inferred.
          showLastUpdateTime: false,
          breadcrumbs: true,
          sidebarCollapsible: true,
        },
        blog: false,
        // Sitemap generation is deliberately disabled: the site is internal
        // and static/robots.txt disallows all crawling.
        sitemap: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'IPAC Docs',
      logo: {
        alt: 'IPAC',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          position: 'left',
          label: t.nav.docs,
          items: [
            { to: '/docs/guides/getting-started/overview', label: t.nav.gettingStarted },
            { to: '/docs/mobile/build-and-release', label: t.nav.mobile },
            { to: '/docs/guides/architecture/website-architecture', label: t.nav.website },
            { to: '/docs/workflows/overview', label: t.nav.workflows },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: t.nav.architecture,
          items: [
            { to: '/docs/guides/architecture/system-overview', label: t.nav.systemOverview },
            { to: '/docs/guides/architecture/cross-app', label: t.nav.crossApp },
            { to: '/docs/guides/architecture/shared-backend-model', label: t.nav.sharedBackend },
            { to: '/docs/backend/database-model', label: t.nav.database },
            { to: '/docs/security/model', label: t.nav.security },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: t.nav.operations,
          items: [
            { to: '/docs/troubleshooting/overview', label: t.nav.troubleshooting },
            { to: '/docs/mobile/build-and-release', label: t.nav.buildRelease },
            { to: '/docs/troubleshooting/website', label: t.nav.websiteDeployment },
            { to: '/docs/backend/live-verification', label: t.nav.liveVerification },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: t.nav.reference,
          items: [
            { to: '/docs/reference/documentation-status', label: t.nav.documentationStatus },
            { to: '/docs/reference/open-questions', label: t.nav.openQuestions },
            { to: '/docs/adr/overview', label: t.nav.adrs },
            { to: '/docs/backend/schema-provenance', label: t.nav.schemaProvenance },
          ],
        },
        ...(IS_DEV_SERVER
          ? [
              {
                type: 'html' as const,
                position: 'right' as const,
                value: `<span class="navbar__item ipac-dev-search-note" aria-label="${t.devSearch}" title="${t.devSearch}">${t.devSearch}</span>`,
              },
            ]
          : []),
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: DOCS_REPO,
          position: 'right',
          className: 'navbar-github-link',
          'aria-label': 'GitHub repository',
          label: t.nav.github,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: t.footer.startHere,
          items: [
            { to: '/docs/guides/introduction', label: t.footer.introduction },
            { to: '/docs/guides/getting-started/overview', label: t.footer.gettingStarted },
            { to: '/docs/guides/architecture/system-overview', label: t.footer.systemArchitecture },
          ],
        },
        {
          title: t.footer.reference,
          items: [
            { to: '/docs/reference/open-questions', label: t.footer.openQuestions },
            { to: '/docs/reference/documentation-status', label: t.footer.documentationStatus },
            { to: '/docs/adr/overview', label: t.footer.architecturalDecisions },
          ],
        },
        {
          title: t.footer.repositories,
          items: [
            { href: REPOSITORIES['website'].url, label: 'website' },
            { href: DOCS_REPO, label: 'ipac-documentation' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} IPAC. ${t.footer.copyright}`,
    },
    prism: {
      additionalLanguages: ['bash', 'sql', 'json', 'diff'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
