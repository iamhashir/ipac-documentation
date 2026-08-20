import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {documentationStatusSummary} from '@site/src/generated/documentationStatus';
import styles from './index.module.css';

interface LinkItem {
  label: string;
  to: string;
}

interface TaskCard {
  title: string;
  description: string;
  to: string;
  links: readonly LinkItem[];
}

const TASK_CARDS: readonly TaskCard[] = [
  {
    title: 'New Developer',
    description: 'Start with tooling, repositories, local setup and the first safe change path.',
    to: '/docs/guides/getting-started/overview',
    links: [
      {label: 'Getting Started', to: '/docs/guides/getting-started/overview'},
      {label: 'Local Setup', to: '/docs/guides/getting-started/prerequisites'},
      {label: 'First Change', to: '/docs/guides/getting-started/first-change'},
    ],
  },
  {
    title: 'Understand the System',
    description: 'Read the system shape, shared backend model, database and cross-app workflows.',
    to: '/docs/guides/architecture/system-overview',
    links: [
      {label: 'System Architecture', to: '/docs/guides/architecture/system-overview'},
      {label: 'Cross-App Architecture', to: '/docs/guides/architecture/cross-app'},
      {label: 'Database Model', to: '/docs/backend/database-model'},
      {label: 'Workflows', to: '/docs/workflows/overview'},
    ],
  },
  {
    title: 'Operate & Debug',
    description: 'Use incident-shaped troubleshooting and release notes when something breaks.',
    to: '/docs/troubleshooting/overview',
    links: [
      {label: 'Troubleshooting', to: '/docs/troubleshooting/overview'},
      {label: 'Mobile Build & Release', to: '/docs/mobile/build-and-release'},
      {label: 'Website Deployment', to: '/docs/troubleshooting/website'},
    ],
  },
  {
    title: 'Security & Decisions',
    description: 'Check authorization boundaries, active findings, role divergence and ADRs.',
    to: '/docs/security/model',
    links: [
      {label: 'Security Model', to: '/docs/security/model'},
      {label: 'Security Findings', to: '/docs/security/findings'},
      {label: 'Roles & Permissions', to: '/docs/website/roles-and-permissions'},
      {label: 'ADRs', to: '/docs/adr/overview'},
    ],
  },
];

const INTENTS: readonly TaskCard[] = [
  {
    title: 'Develop',
    description: 'Prepare a workspace and change behavior without surprising the other app.',
    to: '/docs/guides/getting-started/first-change',
    links: [
      {label: 'Setup', to: '/docs/guides/getting-started/overview'},
      {label: 'Mobile', to: '/docs/guides/getting-started/mobile-setup'},
      {label: 'Website', to: '/docs/guides/getting-started/website-setup'},
    ],
  },
  {
    title: 'Understand',
    description: 'Orient around architecture, database shape, live verification and workflows.',
    to: '/docs/guides/architecture/system-overview',
    links: [
      {label: 'Architecture', to: '/docs/guides/architecture/system-overview'},
      {label: 'Database', to: '/docs/backend/database-model'},
      {label: 'Workflows', to: '/docs/workflows/overview'},
    ],
  },
  {
    title: 'Debug',
    description: 'Diagnose authentication, mobile builds, website builds and connectivity.',
    to: '/docs/troubleshooting/overview',
    links: [
      {label: 'Authentication', to: '/docs/troubleshooting/authentication'},
      {label: 'Mobile Build', to: '/docs/troubleshooting/mobile'},
      {label: 'Configuration', to: '/docs/troubleshooting/configuration'},
    ],
  },
  {
    title: 'Secure',
    description: 'Validate RLS, roles, storage assumptions and unresolved security findings.',
    to: '/docs/security/model',
    links: [
      {label: 'Security Model', to: '/docs/security/model'},
      {label: 'Findings', to: '/docs/security/findings'},
      {label: 'Roles', to: '/docs/website/roles-and-permissions'},
    ],
  },
];

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Internal engineering portal</p>
        <h1>IPAC Technical Documentation</h1>
        <p className={styles.subtitle}>
          Architecture, development, operations and security documentation for
          the IPAC platform.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/docs/guides/getting-started/overview">
            Get Started
          </Link>
          <Link className={styles.secondaryAction} to="/docs/guides/architecture/system-overview">
            System Architecture
          </Link>
          <Link className={styles.secondaryAction} to="/docs/troubleshooting/overview">
            Troubleshooting
          </Link>
        </div>
      </div>
      <ArchitectureVisual />
    </header>
  );
}

function ArchitectureVisual(): ReactNode {
  return (
    <section className={styles.architecture} aria-label="IPAC system architecture summary">
      <div className={styles.actor}>Field Operators</div>
      <div className={styles.downArrow} aria-hidden="true" />
      <div className={styles.clientNode}>Mobile</div>
      <div className={styles.downArrow} aria-hidden="true" />
      <div className={styles.supabaseNode}>
        <strong>Supabase</strong>
        <span>Auth</span>
        <span>PostgreSQL</span>
        <span>RLS</span>
        <span>Storage</span>
        <span>RPC / Functions</span>
      </div>
      <div className={styles.upArrow} aria-hidden="true" />
      <div className={styles.clientNode}>Website</div>
      <div className={styles.upArrow} aria-hidden="true" />
      <div className={styles.actor}>Managers / Admins</div>
    </section>
  );
}

function DocumentationStatus(): ReactNode {
  return (
    <section className={styles.statusPanel} aria-labelledby="documentation-status-heading">
      <div>
        <p className={styles.kicker}>Documentation Status</p>
        <h2 id="documentation-status-heading">Trust starts with evidence.</h2>
        <p>
          Counts are generated from the current docs metadata during build. The
          live backend verification date comes from the backend verification page.
        </p>
      </div>
      <dl className={styles.statusStats}>
        <div>
          <dt>Pages</dt>
          <dd>{documentationStatusSummary.total}</dd>
        </div>
        <div>
          <dt>Verified</dt>
          <dd>{documentationStatusSummary.verified}</dd>
        </div>
        <div>
          <dt>Partial</dt>
          <dd>{documentationStatusSummary.partial}</dd>
        </div>
        <div>
          <dt>Open</dt>
          <dd>{documentationStatusSummary.openQuestion}</dd>
        </div>
      </dl>
      <p className={styles.statusFooter}>
        Last live backend verification:{' '}
        <strong>{documentationStatusSummary.latestLiveBackendVerification}</strong>
        <Link to="/docs/reference/documentation-status">Documentation Status</Link>
      </p>
    </section>
  );
}

function TaskCards(): ReactNode {
  return (
    <section className={styles.section} aria-labelledby="task-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Start by task</p>
        <h2 id="task-heading">Find the right path quickly.</h2>
      </div>
      <div className={styles.cardGrid}>
        {TASK_CARDS.map((card) => (
          <Link className={styles.taskCard} to={card.to} key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <ul>
              {card.links.map((item) => (
                <li key={item.to}>{item.label}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}

function IntentCards(): ReactNode {
  return (
    <section className={styles.sectionCompact} aria-labelledby="intent-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>I want to</p>
        <h2 id="intent-heading">Move from intent to page.</h2>
      </div>
      <div className={styles.intentGrid}>
        {INTENTS.map((intent) => (
          <div className={styles.intentCard} key={intent.title}>
            <h3>{intent.title}</h3>
            <p>{intent.description}</p>
            <div className={styles.intentLinks}>
              {intent.links.map((item) => (
                <Link key={item.to} to={item.to}>{item.label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="IPAC Technical Documentation"
      description="Architecture, development, operations and security documentation for the IPAC platform."
    >
      <main className={styles.main}>
        <Hero />
        <DocumentationStatus />
        <TaskCards />
        <IntentCards />
      </main>
    </Layout>
  );
}
