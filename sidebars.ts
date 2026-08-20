import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Navigation.
 *
 * Six sidebars, each reachable from the navbar:
 *
 *   guides       — read in order. Onboarding and architecture narrative.
 *   applications — per-application operational detail.
 *   backend      — the shared Supabase project.
 *   security     — how authorization is meant to work, and where it does not.
 *   workflows    — end-to-end business processes, one page each.
 *   reference    — status conventions and unresolved questions.
 *
 * Rules for this file:
 *  1. Every category has a landing page (`link`) — never a dead click.
 *  2. Sections are added only when they contain verified content. Pages that
 *     would require live database access to write honestly are not created.
 */
const sidebars: SidebarsConfig = {
  guides: [
    'guides/introduction',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      link: { type: 'doc', id: 'guides/getting-started/overview' },
      items: [
        'guides/getting-started/prerequisites',
        'guides/getting-started/repositories',
        'guides/getting-started/website-setup',
        'guides/getting-started/mobile-setup',
        'guides/getting-started/environment-variables',
        'guides/getting-started/first-change',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      link: { type: 'doc', id: 'guides/architecture/system-overview' },
      items: [
        'guides/architecture/shared-backend-model',
        'guides/architecture/cross-app',
        'guides/architecture/website-architecture',
        'guides/architecture/mobile-architecture',
        'guides/architecture/trigger-driven-behaviour',
        'guides/architecture/cross-app-impact-checklist',
      ],
    },
  ],

  applications: [
    {
      type: 'category',
      label: 'Mobile',
      collapsed: false,
      link: { type: 'doc', id: 'guides/architecture/mobile-architecture' },
      items: ['mobile/build-and-release'],
    },
    {
      type: 'category',
      label: 'website',
      collapsed: false,
      link: { type: 'doc', id: 'guides/architecture/website-architecture' },
      items: ['website/roles-and-permissions'],
    },
  ],

  backend: ['backend/database-model', 'backend/live-verification', 'backend/schema-provenance'],

  security: ['security/model', 'security/findings'],

  workflows: [
    {
      type: 'category',
      label: 'Cross-application workflows',
      collapsed: false,
      link: { type: 'doc', id: 'workflows/overview' },
      items: [
        'workflows/w1-user-provisioning',
        'workflows/w2-packer-team-assignment',
        'workflows/w3-attendance',
        'workflows/w4-task-lifecycle',
        'workflows/w5-packer-session',
        'workflows/w6-packing-evidence',
      ],
    },
  ],

  troubleshooting: [
    'troubleshooting/overview',
    'troubleshooting/authentication',
    'troubleshooting/mobile',
    'troubleshooting/website',
    'troubleshooting/configuration',
  ],

  adr: [
    'adr/overview',
    'adr/adr-0001-website-framework',
    'adr/adr-0002-repository-migration',
    'adr/adr-0003-report-packed-date',
  ],

  reference: ['reference/documentation-status', 'reference/open-questions'],
};

export default sidebars;
