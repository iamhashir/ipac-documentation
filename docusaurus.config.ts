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

const DOCS_REPO = REPOSITORIES['ipac-documentation'].url;

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
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
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
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      },
    ],
  ],

  customFields: {
    repositories: REPOSITORIES,
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
          label: 'Docs',
          items: [
            { to: '/docs/guides/getting-started/overview', label: 'Getting Started' },
            { to: '/docs/mobile/build-and-release', label: 'Mobile' },
            { to: '/docs/guides/architecture/website-architecture', label: 'Website' },
            { to: '/docs/workflows/overview', label: 'Workflows' },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Architecture',
          items: [
            { to: '/docs/guides/architecture/system-overview', label: 'System Overview' },
            { to: '/docs/guides/architecture/cross-app', label: 'Cross-App' },
            { to: '/docs/guides/architecture/shared-backend-model', label: 'Shared Backend' },
            { to: '/docs/backend/database-model', label: 'Database' },
            { to: '/docs/security/model', label: 'Security' },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Operations',
          items: [
            { to: '/docs/troubleshooting/overview', label: 'Troubleshooting' },
            { to: '/docs/mobile/build-and-release', label: 'Build & Release' },
            { to: '/docs/troubleshooting/website', label: 'Website Deployment' },
            { to: '/docs/backend/live-verification', label: 'Live Verification' },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Reference',
          items: [
            { to: '/docs/reference/documentation-status', label: 'Documentation Status' },
            { to: '/docs/reference/open-questions', label: 'Open Questions' },
            { to: '/docs/adr/overview', label: 'ADRs' },
            { to: '/docs/backend/schema-provenance', label: 'Schema Provenance' },
          ],
        },
        {
          href: DOCS_REPO,
          position: 'right',
          className: 'navbar-github-link',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start here',
          items: [
            { to: '/docs/guides/introduction', label: 'Introduction' },
            { to: '/docs/guides/getting-started/overview', label: 'Getting started' },
            { to: '/docs/guides/architecture/system-overview', label: 'System architecture' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { to: '/docs/reference/open-questions', label: 'Open questions' },
            { to: '/docs/reference/documentation-status', label: 'Documentation status' },
            { to: '/docs/adr/overview', label: 'Architectural decisions' },
          ],
        },
        {
          title: 'Repositories',
          items: [
            { href: REPOSITORIES['website'].url, label: 'website' },
            { href: DOCS_REPO, label: 'ipac-documentation' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} IPAC. Internal documentation — not for public distribution.`,
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
