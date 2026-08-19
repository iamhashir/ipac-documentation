import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

interface EntryPoint {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  cta: string;
}

/**
 * The homepage answers "what do I need to do?" rather than advertising
 * features. Each card is a real task a developer arrives with.
 */
const ENTRY_POINTS: readonly EntryPoint[] = [
  {
    eyebrow: 'New here',
    title: 'Set up and make a first change',
    description:
      'Prerequisites, repository access, running both applications locally, and the sequence to follow for your first change.',
    to: '/docs/guides/getting-started/overview',
    cta: 'Getting started',
  },
  {
    eyebrow: 'Orientation',
    title: 'Understand the system',
    description:
      'Two applications, one shared Supabase backend. How the pieces fit together and where the business logic actually lives.',
    to: '/docs/guides/architecture/system-overview',
    cta: 'System architecture',
  },
  {
    eyebrow: 'Before you change shared behaviour',
    title: 'Check cross-application impact',
    description:
      'The backend is shared. A change made for one screen can alter the other application. Work through this before touching shared objects.',
    to: '/docs/guides/architecture/cross-app-impact-checklist',
    cta: 'Impact checklist',
  },
  {
    eyebrow: 'How the system behaves',
    title: 'Follow a workflow end to end',
    description:
      'Six processes that cross both applications, from user provisioning to the packed date on a client report.',
    to: '/docs/workflows/overview',
    cta: 'Workflows',
  },
  {
    eyebrow: 'Authorization and risk',
    title: 'Understand the security model',
    description:
      'Four enforcement layers, which one actually protects data, and the open findings from the source audit.',
    to: '/docs/security/model',
    cta: 'Security',
  },
  {
    eyebrow: 'Something is broken',
    title: 'Fix a known problem',
    description:
      'Sign-in failures, Android build breaks, config traps and CI surprises — each with the root cause that was actually diagnosed.',
    to: '/docs/troubleshooting/overview',
    cta: 'Troubleshooting',
  },
  {
    eyebrow: 'Sources disagree',
    title: 'Read the open questions',
    description:
      'Known contradictions and gaps in the existing material, recorded rather than guessed. Check here before trusting a claim you cannot verify.',
    to: '/docs/reference/open-questions',
    cta: 'Open questions',
  },
];

function Hero(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.internalBadge}>Internal documentation</p>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>
          The engineering knowledge base for the IPAC operations system — two
          applications, website for managers and administrators and Mobile for
          field operators, over the Supabase backend they share.
        </p>
        <div className={styles.heroActions}>
          <Link
            className={styles.primaryAction}
            to="/docs/guides/getting-started/overview"
          >
            Start reading
          </Link>
          <Link className={styles.secondaryAction} to="/docs/guides/introduction">
            What this site covers
          </Link>
        </div>
      </div>
    </header>
  );
}

function EntryPoints(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>Where do you want to go?</h2>
        <div className={styles.grid}>
          {ENTRY_POINTS.map((entry) => (
            <Link key={entry.to} to={entry.to} className={styles.card}>
              <p className={styles.cardEyebrow}>{entry.eyebrow}</p>
              <h3 className={styles.cardTitle}>{entry.title}</h3>
              <p className={styles.cardDescription}>{entry.description}</p>
              <span className={styles.cardCta}>{entry.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustModel(): ReactNode {
  return (
    <section className={styles.sectionMuted}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>How to read these pages</h2>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <h3 className={styles.trustTitle}>Every page states its status</h3>
            <p>
              Pages are marked <strong>Verified</strong>,{' '}
              <strong>Partially Verified</strong> or{' '}
              <strong>Open Question</strong>, with the date and the sources they
              were checked against. Nothing here is asserted from memory.
            </p>
            <Link to="/docs/reference/documentation-status">
              The status convention →
            </Link>
          </div>
          <div className={styles.trustItem}>
            <h3 className={styles.trustTitle}>Source code is the authority</h3>
            <p>
              Schema, policies and function bodies are referenced, not copied.
              Where this site and the code disagree, the code wins — and the
              page is a bug worth fixing.
            </p>
          </div>
          <div className={styles.trustItem}>
            <h3 className={styles.trustTitle}>Sections appear when verified</h3>
            <p>
              Row level security, storage and per-feature pages are not published
              yet — writing them honestly needs live database access. Missing
              sections are a deliberate signal, not an oversight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="IPAC Documentation"
      description="Engineering knowledge base for the IPAC operations system: the website admin application, the Mobile field application, and the Supabase backend they share."
    >
      <Hero />
      <main>
        <EntryPoints />
        <TrustModel />
      </main>
    </Layout>
  );
}
