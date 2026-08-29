import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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

const COPY = {
  en: {
    title: 'IPAC Technical Documentation',
    description: 'Architecture, development, operations and security documentation for the IPAC platform.',
    heroKicker: 'Internal engineering portal',
    subtitle: 'Architecture, development, operations and security documentation for the IPAC platform.',
    actions: {
      gettingStarted: 'Get Started',
      architecture: 'System Architecture',
      troubleshooting: 'Troubleshooting',
    },
    architectureLabel: 'IPAC system architecture summary',
    architecture: {
      fieldOperators: 'Field Operators',
      mobile: 'Mobile',
      website: 'Website',
      managers: 'Managers / Admins',
    },
    status: {
      kicker: 'Documentation Status',
      heading: 'Trust starts with evidence.',
      body:
        'Counts are generated from the current docs metadata during build. The live backend verification date comes from the backend verification page.',
      pages: 'Pages',
      verifiedLive: 'Live',
      verifiedSource: 'Source',
      partial: 'Partial',
      open: 'Open',
      lastLive: 'Last live backend verification:',
      link: 'Documentation Status',
    },
    taskKicker: 'Start by task',
    taskHeading: 'Find the right path quickly.',
    intentKicker: 'What do you need to do?',
    intentHeading: 'Move from intent to page.',
    taskCards: [
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
          {label: 'Roles & Permissions', to: '/docs/website/'},
          {label: 'ADRs', to: '/docs/adr/overview'},
        ],
      },
    ],
    intents: [
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
          {label: 'Roles', to: '/docs/website/'},
        ],
      },
      {
        title: 'Deploy safely',
        description: 'Check release and deployment paths before changing production-facing surfaces.',
        to: '/docs/troubleshooting/website',
        links: [
          {label: 'Website deployment', to: '/docs/troubleshooting/website'},
          {label: 'Build & release', to: '/docs/mobile/build-and-release'},
          {label: 'Live verification', to: '/docs/backend/live-verification'},
        ],
      },
      {
        title: 'Investigate an incident',
        description: 'Start from symptoms, then verify source, live state and open questions.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'Troubleshooting', to: '/docs/troubleshooting/overview'},
          {label: 'Security findings', to: '/docs/security/findings'},
          {label: 'Open questions', to: '/docs/reference/open-questions'},
        ],
      },
    ],
  },
  fr: {
    title: 'Documentation technique IPAC',
    description: 'Documentation d architecture, de développement, d opérations et de sécurité pour la plateforme IPAC.',
    heroKicker: 'Portail d ingénierie interne',
    subtitle: 'Documentation d architecture, de développement, d opérations et de sécurité pour la plateforme IPAC.',
    actions: {
      gettingStarted: 'Bien démarrer',
      architecture: 'Architecture système',
      troubleshooting: 'Dépannage',
    },
    architectureLabel: 'Résumé de l architecture système IPAC',
    architecture: {
      fieldOperators: 'Opérateurs terrain',
      mobile: 'Mobile',
      website: 'Website',
      managers: 'Managers / Admins',
    },
    status: {
      kicker: 'État de la documentation',
      heading: 'La confiance commence par les preuves.',
      body:
        'Les compteurs sont générés depuis les métadonnées des docs pendant le build. La date de vérification live du backend vient de la page de vérification backend.',
      pages: 'Pages',
      verifiedLive: 'Live',
      verifiedSource: 'Source',
      partial: 'Partielles',
      open: 'Ouvertes',
      lastLive: 'Dernière vérification live du backend :',
      link: 'État de la documentation',
    },
    taskKicker: 'Commencer par tâche',
    taskHeading: 'Trouver rapidement le bon chemin.',
    intentKicker: 'Que devez-vous faire ?',
    intentHeading: 'Passer de l intention à la page.',
    taskCards: [
      {
        title: 'Nouveau développeur',
        description: 'Commencez par les outils, les dépôts, la configuration locale et le premier changement sûr.',
        to: '/docs/guides/getting-started/overview',
        links: [
          {label: 'Bien démarrer', to: '/docs/guides/getting-started/overview'},
          {label: 'Configuration locale', to: '/docs/guides/getting-started/prerequisites'},
          {label: 'Premier changement', to: '/docs/guides/getting-started/first-change'},
        ],
      },
      {
        title: 'Comprendre le système',
        description: 'Lire la forme du système, le backend partagé, la base de données et les flux inter-applications.',
        to: '/docs/guides/architecture/system-overview',
        links: [
          {label: 'Architecture système', to: '/docs/guides/architecture/system-overview'},
          {label: 'Architecture inter-apps', to: '/docs/guides/architecture/cross-app'},
          {label: 'Modèle de données', to: '/docs/backend/database-model'},
          {label: 'Flux de travail', to: '/docs/workflows/overview'},
        ],
      },
      {
        title: 'Exploiter et déboguer',
        description: 'Utiliser les pages de dépannage et de release quand quelque chose casse.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'Dépannage', to: '/docs/troubleshooting/overview'},
          {label: 'Build & release Mobile', to: '/docs/mobile/build-and-release'},
          {label: 'Déploiement website', to: '/docs/troubleshooting/website'},
        ],
      },
      {
        title: 'Sécurité et décisions',
        description: 'Vérifier les limites d autorisation, les findings actifs, les rôles et les ADR.',
        to: '/docs/security/model',
        links: [
          {label: 'Modèle de sécurité', to: '/docs/security/model'},
          {label: 'Findings sécurité', to: '/docs/security/findings'},
          {label: 'Rôles et permissions', to: '/docs/website/'},
          {label: 'ADR', to: '/docs/adr/overview'},
        ],
      },
    ],
    intents: [
      {
        title: 'Développer',
        description: 'Préparer un workspace et modifier le comportement sans surprendre l autre application.',
        to: '/docs/guides/getting-started/first-change',
        links: [
          {label: 'Setup', to: '/docs/guides/getting-started/overview'},
          {label: 'Mobile', to: '/docs/guides/getting-started/mobile-setup'},
          {label: 'Website', to: '/docs/guides/getting-started/website-setup'},
        ],
      },
      {
        title: 'Comprendre',
        description: 'S orienter dans l architecture, la base de données, la vérification live et les flux.',
        to: '/docs/guides/architecture/system-overview',
        links: [
          {label: 'Architecture', to: '/docs/guides/architecture/system-overview'},
          {label: 'Base de données', to: '/docs/backend/database-model'},
          {label: 'Flux', to: '/docs/workflows/overview'},
        ],
      },
      {
        title: 'Déboguer',
        description: 'Diagnostiquer l authentification, les builds Mobile, les builds website et la connectivité.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'Authentification', to: '/docs/troubleshooting/authentication'},
          {label: 'Build Mobile', to: '/docs/troubleshooting/mobile'},
          {label: 'Configuration', to: '/docs/troubleshooting/configuration'},
        ],
      },
      {
        title: 'Sécuriser',
        description: 'Valider RLS, les rôles, Storage et les findings sécurité non résolus.',
        to: '/docs/security/model',
        links: [
          {label: 'Modèle sécurité', to: '/docs/security/model'},
          {label: 'Findings', to: '/docs/security/findings'},
          {label: 'Rôles', to: '/docs/website/'},
        ],
      },
      {
        title: 'Déployer sûrement',
        description: 'Vérifier les chemins de release et déploiement avant un changement exposé.',
        to: '/docs/troubleshooting/website',
        links: [
          {label: 'Déploiement website', to: '/docs/troubleshooting/website'},
          {label: 'Build & release', to: '/docs/mobile/build-and-release'},
          {label: 'Vérification live', to: '/docs/backend/live-verification'},
        ],
      },
      {
        title: 'Investiguer un incident',
        description: 'Partir des symptômes, puis vérifier source, état live et questions ouvertes.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'Dépannage', to: '/docs/troubleshooting/overview'},
          {label: 'Findings sécurité', to: '/docs/security/findings'},
          {label: 'Questions ouvertes', to: '/docs/reference/open-questions'},
        ],
      },
    ],
  },
  ar: {
    title: 'التوثيق التقني IPAC',
    description: 'توثيق الهندسة والتطوير والتشغيل والأمان لمنصة IPAC.',
    heroKicker: 'بوابة هندسية داخلية',
    subtitle: 'توثيق الهندسة والتطوير والتشغيل والأمان لمنصة IPAC.',
    actions: {
      gettingStarted: 'ابدأ',
      architecture: 'هندسة النظام',
      troubleshooting: 'استكشاف الأخطاء',
    },
    architectureLabel: 'ملخص هندسة نظام IPAC',
    architecture: {
      fieldOperators: 'مشغلو الميدان',
      mobile: 'Mobile',
      website: 'Website',
      managers: 'المديرون / Admins',
    },
    status: {
      kicker: 'حالة التوثيق',
      heading: 'الثقة تبدأ بالدليل.',
      body:
        'يتم توليد الأعداد من metadata المستندات أثناء build. تاريخ التحقق live من backend يأتي من صفحة تحقق backend.',
      pages: 'الصفحات',
      verifiedLive: 'Live',
      verifiedSource: 'Source',
      partial: 'جزئية',
      open: 'مفتوحة',
      lastLive: 'آخر تحقق live من backend:',
      link: 'حالة التوثيق',
    },
    taskKicker: 'ابدأ حسب المهمة',
    taskHeading: 'اعثر على المسار الصحيح بسرعة.',
    intentKicker: 'ما الذي تحتاج إلى فعله؟',
    intentHeading: 'انتقل من النية إلى الصفحة.',
    taskCards: [
      {
        title: 'مطور جديد',
        description: 'ابدأ بالأدوات والمستودعات والإعداد المحلي ومسار أول تغيير آمن.',
        to: '/docs/guides/getting-started/overview',
        links: [
          {label: 'البدء', to: '/docs/guides/getting-started/overview'},
          {label: 'الإعداد المحلي', to: '/docs/guides/getting-started/prerequisites'},
          {label: 'أول تغيير', to: '/docs/guides/getting-started/first-change'},
        ],
      },
      {
        title: 'فهم النظام',
        description: 'اقرأ شكل النظام وbackend المشترك وقاعدة البيانات وسير العمل بين التطبيقات.',
        to: '/docs/guides/architecture/system-overview',
        links: [
          {label: 'هندسة النظام', to: '/docs/guides/architecture/system-overview'},
          {label: 'هندسة Cross-App', to: '/docs/guides/architecture/cross-app'},
          {label: 'نموذج البيانات', to: '/docs/backend/database-model'},
          {label: 'سير العمل', to: '/docs/workflows/overview'},
        ],
      },
      {
        title: 'التشغيل والتصحيح',
        description: 'استخدم صفحات dépannage والإصدارات عندما يتعطل شيء.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'استكشاف الأخطاء', to: '/docs/troubleshooting/overview'},
          {label: 'Build & release Mobile', to: '/docs/mobile/build-and-release'},
          {label: 'نشر website', to: '/docs/troubleshooting/website'},
        ],
      },
      {
        title: 'الأمان والقرارات',
        description: 'راجع حدود التفويض وfindings النشطة واختلاف الأدوار وADR.',
        to: '/docs/security/model',
        links: [
          {label: 'نموذج الأمان', to: '/docs/security/model'},
          {label: 'Security findings', to: '/docs/security/findings'},
          {label: 'الأدوار والصلاحيات', to: '/docs/website/'},
          {label: 'ADR', to: '/docs/adr/overview'},
        ],
      },
    ],
    intents: [
      {
        title: 'التطوير',
        description: 'جهز workspace وعدل السلوك دون مفاجأة التطبيق الآخر.',
        to: '/docs/guides/getting-started/first-change',
        links: [
          {label: 'Setup', to: '/docs/guides/getting-started/overview'},
          {label: 'Mobile', to: '/docs/guides/getting-started/mobile-setup'},
          {label: 'Website', to: '/docs/guides/getting-started/website-setup'},
        ],
      },
      {
        title: 'الفهم',
        description: 'توجه عبر الهندسة وشكل قاعدة البيانات والتحقق live وسير العمل.',
        to: '/docs/guides/architecture/system-overview',
        links: [
          {label: 'الهندسة', to: '/docs/guides/architecture/system-overview'},
          {label: 'قاعدة البيانات', to: '/docs/backend/database-model'},
          {label: 'سير العمل', to: '/docs/workflows/overview'},
        ],
      },
      {
        title: 'التصحيح',
        description: 'شخص المصادقة وbuilds الخاصة بـ Mobile وwebsite والاتصال.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'المصادقة', to: '/docs/troubleshooting/authentication'},
          {label: 'Build Mobile', to: '/docs/troubleshooting/mobile'},
          {label: 'Configuration', to: '/docs/troubleshooting/configuration'},
        ],
      },
      {
        title: 'التأمين',
        description: 'تحقق من RLS والأدوار وافتراضات Storage وfindings الأمان غير المحلولة.',
        to: '/docs/security/model',
        links: [
          {label: 'نموذج الأمان', to: '/docs/security/model'},
          {label: 'Findings', to: '/docs/security/findings'},
          {label: 'الأدوار', to: '/docs/website/'},
        ],
      },
      {
        title: 'النشر بأمان',
        description: 'راجع مسارات release وdeployment قبل تغيير سطح ظاهر للإنتاج.',
        to: '/docs/troubleshooting/website',
        links: [
          {label: 'نشر website', to: '/docs/troubleshooting/website'},
          {label: 'Build & release', to: '/docs/mobile/build-and-release'},
          {label: 'Live verification', to: '/docs/backend/live-verification'},
        ],
      },
      {
        title: 'تحقيق في حادث',
        description: 'ابدأ من الأعراض ثم تحقق من source والحالة live والأسئلة المفتوحة.',
        to: '/docs/troubleshooting/overview',
        links: [
          {label: 'استكشاف الأخطاء', to: '/docs/troubleshooting/overview'},
          {label: 'Security findings', to: '/docs/security/findings'},
          {label: 'أسئلة مفتوحة', to: '/docs/reference/open-questions'},
        ],
      },
    ],
  },
} as const satisfies Record<string, {
  title: string;
  description: string;
  heroKicker: string;
  subtitle: string;
  actions: Record<string, string>;
  architectureLabel: string;
  architecture: Record<string, string>;
  status: Record<string, string>;
  taskKicker: string;
  taskHeading: string;
  intentKicker: string;
  intentHeading: string;
  taskCards: readonly TaskCard[];
  intents: readonly TaskCard[];
}>;

type HomeCopy = (typeof COPY)[keyof typeof COPY];

function formatDate(date: string | null, locale: string): string {
  if (!date) {
    return 'n/a';
  }
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

function Hero({copy}: {copy: HomeCopy}): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{copy.heroKicker}</p>
        <h1>{copy.title}</h1>
        <p className={styles.subtitle}>{copy.subtitle}</p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/docs/guides/getting-started/overview">
            {copy.actions.gettingStarted}
          </Link>
          <Link className={styles.secondaryAction} to="/docs/guides/architecture/system-overview">
            {copy.actions.architecture}
          </Link>
          <Link className={styles.secondaryAction} to="/docs/troubleshooting/overview">
            {copy.actions.troubleshooting}
          </Link>
        </div>
      </div>
      <ArchitectureVisual copy={copy} />
    </header>
  );
}

function ArchitectureVisual({copy}: {copy: HomeCopy}): ReactNode {
  return (
    <section className={styles.architecture} aria-label={copy.architectureLabel}>
      <div className={styles.actor}>{copy.architecture.fieldOperators}</div>
      <div className={styles.downArrow} aria-hidden="true" />
      <Link className={styles.clientNode} to="/docs/guides/architecture/mobile-architecture">
        Mobile
      </Link>
      <div className={styles.downArrow} aria-hidden="true" />
      <div className={styles.supabaseNode}>
        <Link to="/docs/backend/database-model">
          <strong>Supabase</strong>
        </Link>
        <Link to="/docs/troubleshooting/authentication">Auth</Link>
        <Link to="/docs/backend/database-model">PostgreSQL</Link>
        <Link to="/docs/security/model">RLS</Link>
        <Link to="/docs/security/findings#h2">Storage</Link>
        <Link to="/docs/backend/database-model#functions">RPC / Functions</Link>
      </div>
      <div className={styles.upArrow} aria-hidden="true" />
      <Link className={styles.clientNode} to="/docs/website/">
        {copy.architecture.website}
      </Link>
      <div className={styles.upArrow} aria-hidden="true" />
      <div className={styles.actor}>{copy.architecture.managers}</div>
    </section>
  );
}

function DocumentationStatus({
  copy,
  locale,
}: {
  copy: HomeCopy;
  locale: string;
}): ReactNode {
  return (
    <section className={styles.statusPanel} aria-labelledby="documentation-status-heading">
      <div>
        <p className={styles.kicker}>{copy.status.kicker}</p>
        <h2 id="documentation-status-heading">{copy.status.heading}</h2>
        <p>{copy.status.body}</p>
      </div>
      <dl className={styles.statusStats}>
        <div>
          <dt>{copy.status.pages}</dt>
          <dd>{documentationStatusSummary.total}</dd>
        </div>
        <div>
          <dt>{copy.status.verifiedLive}</dt>
          <dd>{documentationStatusSummary.verifiedLive}</dd>
        </div>
        <div>
          <dt>{copy.status.verifiedSource}</dt>
          <dd>{documentationStatusSummary.verifiedSource}</dd>
        </div>
        <div>
          <dt>{copy.status.partial}</dt>
          <dd>{documentationStatusSummary.partial}</dd>
        </div>
        <div>
          <dt>{copy.status.open}</dt>
          <dd>{documentationStatusSummary.openQuestion}</dd>
        </div>
      </dl>
      <p className={styles.statusFooter}>
        {copy.status.lastLive}{' '}
        <strong>{formatDate(documentationStatusSummary.latestLiveBackendVerification, locale)}</strong>
        <Link to="/docs/reference/documentation-status">{copy.status.link}</Link>
      </p>
    </section>
  );
}

function TaskCards({copy}: {copy: HomeCopy}): ReactNode {
  return (
    <section className={styles.section} aria-labelledby="task-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>{copy.taskKicker}</p>
        <h2 id="task-heading">{copy.taskHeading}</h2>
      </div>
      <div className={styles.cardGrid}>
        {copy.taskCards.map((card) => (
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

function IntentCards({copy}: {copy: HomeCopy}): ReactNode {
  return (
    <section className={styles.sectionCompact} aria-labelledby="intent-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>{copy.intentKicker}</p>
        <h2 id="intent-heading">{copy.intentHeading}</h2>
      </div>
      <div className={styles.intentGrid}>
        {copy.intents.map((intent) => (
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
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const copy = COPY[currentLocale as keyof typeof COPY] ?? COPY.en;

  return (
    <Layout
      title={copy.title}
      description={copy.description}
    >
      <main className={styles.main}>
        <Hero copy={copy} />
        <DocumentationStatus copy={copy} locale={currentLocale} />
        <TaskCards copy={copy} />
        <IntentCards copy={copy} />
      </main>
    </Layout>
  );
}
