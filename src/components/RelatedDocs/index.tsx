import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface RelatedDoc {
  title: string;
  to: string;
  reason?: string;
}

const RELATED_BY_ID: Record<string, readonly RelatedDoc[]> = {
  'security/model': [
    {title: 'Roles & Permissions', to: '/docs/website/roles-and-permissions', reason: 'role enforcement'},
    {title: 'Security Findings', to: '/docs/security/findings', reason: 'active risks'},
    {title: 'Database Model', to: '/docs/backend/database-model', reason: 'RLS and functions'},
  ],
  'security/findings': [
    {title: 'Security Model', to: '/docs/security/model', reason: 'access model'},
    {title: 'Live Backend Verification', to: '/docs/backend/live-verification', reason: 'live evidence'},
    {title: 'Open Questions', to: '/docs/reference/open-questions', reason: 'unresolved gaps'},
  ],
  'backend/database-model': [
    {title: 'Live Backend Verification', to: '/docs/backend/live-verification', reason: 'production state'},
    {title: 'Schema Provenance', to: '/docs/backend/schema-provenance', reason: 'source quality'},
    {title: 'Security Model', to: '/docs/security/model', reason: 'RLS context'},
  ],
  'backend/live-verification': [
    {title: 'Database Model', to: '/docs/backend/database-model', reason: 'schema overview'},
    {title: 'Security Findings', to: '/docs/security/findings', reason: 'risk updates'},
    {title: 'Documentation Status', to: '/docs/reference/documentation-status', reason: 'trust counts'},
  ],
  'workflows/w3-attendance': [
    {title: 'Team Assignment', to: '/docs/workflows/w2-packer-team-assignment', reason: 'team context'},
    {title: 'Packer Session', to: '/docs/workflows/w5-packer-session', reason: 'session flow'},
    {title: 'Authentication Troubleshooting', to: '/docs/troubleshooting/authentication', reason: 'auth failures'},
  ],
  'workflows/w5-packer-session': [
    {title: 'Attendance', to: '/docs/workflows/w3-attendance', reason: 'session prerequisite'},
    {title: 'Task Lifecycle', to: '/docs/workflows/w4-task-lifecycle', reason: 'work state'},
    {title: 'Packing Evidence', to: '/docs/workflows/w6-packing-evidence', reason: 'output evidence'},
  ],
  'guides/getting-started/first-change': [
    {title: 'Cross-App Impact Checklist', to: '/docs/guides/architecture/cross-app-impact-checklist', reason: 'change safety'},
    {title: 'System Architecture', to: '/docs/guides/architecture/system-overview', reason: 'orientation'},
    {title: 'Security Model', to: '/docs/security/model', reason: 'authorization checks'},
  ],
  'guides/architecture/cross-app': [
    {title: 'Shared Backend Model', to: '/docs/guides/architecture/shared-backend-model', reason: 'coupling'},
    {title: 'Database Model', to: '/docs/backend/database-model', reason: 'shared tables'},
    {title: 'First Change', to: '/docs/guides/getting-started/first-change', reason: 'change workflow'},
  ],
};

const DEFAULTS: readonly RelatedDoc[] = [
  {title: 'Getting Started', to: '/docs/guides/getting-started/overview', reason: 'onboarding'},
  {title: 'System Architecture', to: '/docs/guides/architecture/system-overview', reason: 'orientation'},
  {title: 'Documentation Status', to: '/docs/reference/documentation-status', reason: 'trust'},
];

const COPY = {
  en: {heading: 'Related documentation'},
  fr: {heading: 'Documentation liée'},
  ar: {heading: 'توثيق ذو صلة'},
} as const;

interface RelatedDocsProps {
  id: string;
  locale: string;
  related?: readonly RelatedDoc[];
}

function inferRelated(id: string): readonly RelatedDoc[] {
  if (RELATED_BY_ID[id]) {
    return RELATED_BY_ID[id];
  }
  if (id.startsWith('troubleshooting/')) {
    return [
      {title: 'Troubleshooting', to: '/docs/troubleshooting/overview', reason: 'diagnosis'},
      {title: 'Configuration', to: '/docs/troubleshooting/configuration', reason: 'environment'},
      {title: 'Open Questions', to: '/docs/reference/open-questions', reason: 'known gaps'},
    ];
  }
  if (id.startsWith('workflows/')) {
    return [
      {title: 'Workflows', to: '/docs/workflows/overview', reason: 'process map'},
      {title: 'Cross-App Architecture', to: '/docs/guides/architecture/cross-app', reason: 'shared data'},
      {title: 'Database Model', to: '/docs/backend/database-model', reason: 'tables and RPCs'},
    ];
  }
  if (id.startsWith('guides/architecture/')) {
    return [
      {title: 'System Architecture', to: '/docs/guides/architecture/system-overview', reason: 'overview'},
      {title: 'Cross-App Architecture', to: '/docs/guides/architecture/cross-app', reason: 'shared backend'},
      {title: 'Database Model', to: '/docs/backend/database-model', reason: 'data model'},
    ];
  }
  return DEFAULTS;
}

export default function RelatedDocs({id, locale, related}: RelatedDocsProps): ReactNode {
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const items = (related && related.length > 0 ? related : inferRelated(id)).filter(
    (item) => !item.to.endsWith(id),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={styles.related} aria-labelledby="related-docs-heading">
      <h2 id="related-docs-heading">{copy.heading}</h2>
      <div className={styles.grid}>
        {items.slice(0, 4).map((item) => (
          <Link className={styles.item} to={item.to} key={item.to}>
            <span>{item.title}</span>
            {item.reason ? <small>{item.reason}</small> : null}
          </Link>
        ))}
      </div>
    </aside>
  );
}
