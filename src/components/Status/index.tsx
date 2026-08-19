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
export type StatusType = 'verified' | 'partial' | 'open-question';

const LABELS: Record<StatusType, string> = {
  verified: 'Status: Verified',
  partial: 'Status: Partially Verified',
  'open-question': 'Status: Open Question',
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
  children?: ReactNode;
}

export default function Status({
  type,
  date,
  sources,
  children,
}: StatusProps): ReactNode {
  return (
    <aside className={clsx(styles.status, styles[`status--${type}`])}>
      <div className={styles.header}>
        <span className={styles.label}>{LABELS[type]}</span>
        {date ? <span className={styles.date}>Checked {date}</span> : null}
      </div>

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
