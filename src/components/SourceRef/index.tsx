import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * A reference to a location in an application repository.
 *
 * Documentation links to source instead of duplicating it. This component is
 * the single place that knows how a reference becomes a URL, so that stronger
 * guarantees can be added later without touching any MDX page:
 *
 *   today  — resolves against the branch configured in docusaurus.config.ts
 *   later  — pin `ref` to a commit SHA (globally in the config, or per
 *            reference via the `ref` prop) so a "verified" claim points at
 *            code that cannot move underneath it.
 *
 * If a repository's canonical URL is not yet established (`url: null`), the
 * reference renders as plain text. Inventing a URL is never acceptable.
 */
interface RepositoryEntry {
  label: string;
  url: string | null;
  ref: string;
}

export interface SourceRefProps {
  /** Key from `customFields.repositories` in docusaurus.config.ts. */
  repo: string;
  /** Repository-relative path, e.g. 'src/lib/supabase.ts'. */
  path: string;
  /**
   * Preferred over `lines`: a symbol name survives refactors that shift line
   * numbers. Shown alongside the path.
   */
  symbol?: string;
  /** Line or range, e.g. '42' or '42-88'. Use sparingly — line numbers rot. */
  lines?: string;
  /** Overrides the repository's configured ref. Use a SHA for pinned claims. */
  ref?: string;
  /** Custom link text. Defaults to the path. */
  children?: ReactNode;
}

function buildLineFragment(lines: string | undefined): string {
  if (!lines) {
    return '';
  }
  const [start, end] = lines.split('-');
  return end ? `#L${start}-L${end}` : `#L${start}`;
}

export default function SourceRef({
  repo,
  path,
  symbol,
  lines,
  ref,
  children,
}: SourceRefProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const repositories = siteConfig.customFields?.repositories as
    | Record<string, RepositoryEntry>
    | undefined;
  const entry = repositories?.[repo];

  if (!entry) {
    // Fails the build rather than shipping a silently broken reference.
    throw new Error(
      `SourceRef: unknown repository "${repo}". Add it to customFields.repositories in docusaurus.config.ts.`,
    );
  }

  const label = children ?? path;
  const suffix = symbol ? <span className={styles.symbol}>{symbol}</span> : null;

  if (!entry.url) {
    return (
      <span className={styles.unresolved}>
        <code>
          {entry.label}/{path}
        </code>
        {suffix}
        <span className={styles.note} title="Canonical repository not confirmed">
          repository not confirmed
        </span>
      </span>
    );
  }

  const href = `${entry.url}/blob/${ref ?? entry.ref}/${path}${buildLineFragment(lines)}`;

  return (
    <span className={styles.resolved}>
      <a href={href} target="_blank" rel="noreferrer noopener">
        <code>
          {entry.label}/{label}
        </code>
      </a>
      {suffix}
    </span>
  );
}
