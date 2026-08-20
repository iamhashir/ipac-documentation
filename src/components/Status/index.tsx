import type { ReactNode } from 'react';
import clsx from 'clsx';
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

const LABELS: Record<StatusType, string> = {
  verified: 'Verified Source',
  'verified-live': 'Verified Live',
  'verified-source': 'Verified Source',
  partial: 'Partially Verified',
  'open-question': 'Open Question',
};

const DESCRIPTIONS: Record<StatusType, string> = {
  verified: 'Checked against source artifacts.',
  'verified-live': 'Checked against live production infrastructure.',
  'verified-source': 'Checked against repository source artifacts.',
  partial: 'Some claims are verified; unresolved claims are called out in the page.',
  'open-question': 'A known gap or contradiction remains unresolved.',
};

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

export default function Status({
  type,
  date,
  sources,
  question,
  children,
}: StatusProps): ReactNode {
  const normalizedType = normalizeType(type, sources);

  return (
    <aside className={clsx(styles.status, styles[`status--${normalizedType}`])}>
      <div className={styles.header}>
        <span className={styles.label}>{LABELS[normalizedType]}</span>
        {date ? <span className={styles.date}>Last verified: {date}</span> : null}
        {question ? <span className={styles.question}>{question}</span> : null}
      </div>
      <p className={styles.description}>{DESCRIPTIONS[normalizedType]}</p>

      {children ? <div className={styles.body}>{children}</div> : null}

      {sources && sources.length > 0 ? (
        <div className={styles.sources}>
          <span className={styles.sourcesLabel}>Verified against</span>
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
