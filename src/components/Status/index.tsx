import type { ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * Documentation status banner.
 *
 * Every page states how much it can be trusted. This is the mechanism that
 * keeps "do not invent technical information" enforceable over time: a claim
 * is either verified against code or the live database on a date, or it is
 * explicitly marked as unverified.
 *
 *   verified      — checked against the listed sources on the given date.
 *   partial       — some claims verified, others not. Say which in the body.
 *   open-question — a real contradiction or gap. Never resolve it by guessing.
 */
export type StatusType =
  | 'verified'
  | 'verified-live'
  | 'verified-source'
  | 'partial'
  | 'open-question';

const COPY = {
  en: {
    labels: {
      verified: 'VERIFIED SOURCE',
      'verified-live': 'VERIFIED LIVE',
      'verified-source': 'VERIFIED SOURCE',
      partial: 'PARTIALLY VERIFIED',
      'open-question': 'OPEN QUESTION',
    },
    descriptions: {
      verified: 'Checked against source artifacts.',
      'verified-live': 'Checked against live production infrastructure.',
      'verified-source': 'Checked against repository source artifacts.',
      partial: 'Some claims are verified; unresolved claims are called out in the page.',
      'open-question': 'A known gap or contradiction remains unresolved.',
    },
    lastVerified: 'Last verified:',
    verifiedAgainst: 'Verified against',
    repository: 'Repository:',
    commit: 'Commit:',
    environment: 'Environment:',
    assumptions: 'Assumptions remaining:',
    reviewed: 'Reviewed:',
  },
  fr: {
    labels: {
      verified: 'SOURCE VÉRIFIÉE',
      'verified-live': 'VÉRIFIÉ LIVE',
      'verified-source': 'SOURCE VÉRIFIÉE',
      partial: 'PARTIELLEMENT VÉRIFIÉ',
      'open-question': 'QUESTION OUVERTE',
    },
    descriptions: {
      verified: 'Contrôlé avec les artefacts source.',
      'verified-live': 'Contrôlé avec l infrastructure de production live.',
      'verified-source': 'Contrôlé avec les artefacts source du dépôt.',
      partial: 'Certaines affirmations sont vérifiées; les points non résolus sont indiqués dans la page.',
      'open-question': 'Une lacune ou contradiction connue reste non résolue.',
    },
    lastVerified: 'Dernière vérification :',
    verifiedAgainst: 'Vérifié avec',
    repository: 'Dépôt :',
    commit: 'Commit :',
    environment: 'Environnement :',
    assumptions: 'Hypothèses restantes :',
    reviewed: 'Revu :',
  },
  ar: {
    labels: {
      verified: 'مصدر موثق',
      'verified-live': 'موثق LIVE',
      'verified-source': 'مصدر موثق',
      partial: 'موثق جزئيا',
      'open-question': 'سؤال مفتوح',
    },
    descriptions: {
      verified: 'تم التحقق مقابل source artifacts.',
      'verified-live': 'تم التحقق مقابل بنية الإنتاج live.',
      'verified-source': 'تم التحقق مقابل source artifacts في المستودع.',
      partial: 'بعض الادعاءات موثقة؛ النقاط غير المحلولة مذكورة داخل الصفحة.',
      'open-question': 'توجد فجوة أو تناقض معروف لم يحل بعد.',
    },
    lastVerified: 'آخر تحقق:',
    verifiedAgainst: 'تم التحقق مقابل',
    repository: 'المستودع:',
    commit: 'Commit:',
    environment: 'البيئة:',
    assumptions: 'الافتراضات المتبقية:',
    reviewed: 'تمت المراجعة:',
  },
} as const;

export interface StatusProps {
  type: StatusType;
  /** ISO date (YYYY-MM-DD) on which the sources below were checked. */
  date?: string;
  /**
   * What the claims were checked against. Free-form but conventional:
   *   'website:docs/ARCHITECTURE.md', 'supabase:public.orders',
   *   'Mobile:app.json'
   */
  sources?: readonly string[];
  /** Open-question ID such as OQ-006. */
  question?: string;
  /** Repository name when the evidence is source-based. */
  repository?: string;
  /** Commit SHA when the evidence is pinned. */
  commit?: string;
  /** Live environment when the evidence is runtime-based. */
  environment?: string;
  /** Count or phrase describing unresolved assumptions for partial verification. */
  assumptions?: string;
  children?: ReactNode;
}

function normalizeType(type: StatusType, sources: readonly string[] | undefined): StatusType {
  if (type !== 'verified') {
    return type;
  }

  return sources?.some((source) => /supabase|vercel|live/i.test(source))
    ? 'verified-live'
    : 'verified-source';
}

function formatDate(date: string, locale: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

export default function Status({
  type,
  date,
  sources,
  question,
  repository,
  commit,
  environment,
  assumptions,
  children,
}: StatusProps): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const copy = COPY[currentLocale as keyof typeof COPY] ?? COPY.en;
  const normalizedType = normalizeType(type, sources);
  const metadata = [
    repository ? [copy.repository, repository] : null,
    commit ? [copy.commit, commit] : null,
    environment ? [copy.environment, environment] : null,
    assumptions ? [copy.assumptions, assumptions] : null,
  ].filter(Boolean) as [string, string][];

  return (
    <aside className={clsx(styles.status, styles[`status--${normalizedType}`])}>
      <div className={styles.header}>
        <span className={styles.label}>{copy.labels[normalizedType]}</span>
        {date ? <span className={styles.date}>{copy.lastVerified} {formatDate(date, currentLocale)}</span> : null}
        {question ? <span className={styles.question}>{question}</span> : null}
      </div>
      <p className={styles.description}>{copy.descriptions[normalizedType]}</p>

      {metadata.length > 0 ? (
        <dl className={styles.metadata}>
          {metadata.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {children ? <div className={styles.body}>{children}</div> : null}

      {sources && sources.length > 0 ? (
        <div className={styles.sources}>
          <span className={styles.sourcesLabel}>{copy.verifiedAgainst}</span>
          <ul className={styles.sourcesList}>
            {sources.map((source) => (
              <li key={source}>
                <code>{source}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
