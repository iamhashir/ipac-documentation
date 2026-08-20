import type {KeyboardEvent, ReactNode} from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface SearchDocument {
  i?: number;
  t: string;
  s?: string;
  u: string;
  h?: string;
  b?: readonly string[];
}

interface SearchSection {
  documents?: readonly SearchDocument[];
}

interface PaletteItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  action?: () => void;
  type: 'action' | 'search' | 'language' | 'theme';
}

const COPY = {
  en: {
    button: 'Command palette',
    placeholder: 'Search docs or run a command...',
    searchGroup: 'Documentation',
    actionGroup: 'Actions',
    noResults: 'No matching commands or documents.',
    shortcut: 'Cmd/Ctrl K',
    actions: {
      gettingStarted: 'Go to Getting Started',
      architecture: 'Go to System Architecture',
      troubleshooting: 'Go to Troubleshooting',
      security: 'Go to Security Findings',
      database: 'Go to Database Model',
      openQuestions: 'Go to Open Questions',
      switchEnglish: 'Switch language to English',
      switchFrench: 'Switch language to French',
      switchArabic: 'Switch language to Arabic',
      toggleTheme: 'Toggle dark/light mode',
    },
  },
  fr: {
    button: 'Palette de commandes',
    placeholder: 'Rechercher ou exécuter une commande...',
    searchGroup: 'Documentation',
    actionGroup: 'Actions',
    noResults: 'Aucune commande ou page trouvée.',
    shortcut: 'Cmd/Ctrl K',
    actions: {
      gettingStarted: 'Aller à Bien démarrer',
      architecture: 'Aller à Architecture système',
      troubleshooting: 'Aller à Dépannage',
      security: 'Aller aux findings sécurité',
      database: 'Aller au modèle de données',
      openQuestions: 'Aller aux questions ouvertes',
      switchEnglish: 'Passer en anglais',
      switchFrench: 'Passer en français',
      switchArabic: 'Passer en arabe',
      toggleTheme: 'Basculer dark/light',
    },
  },
  ar: {
    button: 'لوحة الأوامر',
    placeholder: 'ابحث في المستندات أو نفذ أمرا...',
    searchGroup: 'التوثيق',
    actionGroup: 'الأوامر',
    noResults: 'لا توجد أوامر أو صفحات مطابقة.',
    shortcut: 'Cmd/Ctrl K',
    actions: {
      gettingStarted: 'اذهب إلى البدء',
      architecture: 'اذهب إلى هندسة النظام',
      troubleshooting: 'اذهب إلى استكشاف الأخطاء',
      security: 'اذهب إلى Security Findings',
      database: 'اذهب إلى Database Model',
      openQuestions: 'اذهب إلى الأسئلة المفتوحة',
      switchEnglish: 'حوّل اللغة إلى English',
      switchFrench: 'حوّل اللغة إلى Français',
      switchArabic: 'حوّل اللغة إلى العربية',
      toggleTheme: 'بدل dark/light',
    },
  },
} as const;

function normalize(value: string): string {
  return value.toLocaleLowerCase().normalize('NFKD').replace(/\p{Diacritic}/gu, '');
}

function currentPathForLocale(locale: string): string {
  const {pathname, search, hash} = window.location;
  const withoutLocale = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, '');
  const path = withoutLocale === '' ? '/' : withoutLocale;
  return `/${locale}${path}${search}${hash}`.replace(/\/{2,}/g, '/');
}

function urlForLocale(url: string, locale: string): string {
  if (!url.startsWith('/')) {
    return url;
  }

  const withoutLocale = url.replace(/^\/(en|fr|ar)(?=\/|$)/, '');
  return `/${locale}${withoutLocale === '' ? '/' : withoutLocale}`.replace(/\/{2,}/g, '/');
}

function useSearchDocuments(currentLocale: string): readonly SearchDocument[] {
  const [documents, setDocuments] = useState<readonly SearchDocument[]>([]);

  useEffect(() => {
    let cancelled = false;
    const url = `/${currentLocale}/search-index.json`;

    fetch(url)
      .then((response) => (response.ok ? response.json() : []))
      .then((sections: readonly SearchSection[]) => {
        if (cancelled) {
          return;
        }

        const seen = new Set<string>();
        const flattened = sections
          .flatMap((section) => section.documents ?? [])
          .filter((document) => {
            const key = `${document.u}${document.h ?? ''}${document.t}`;
            if (seen.has(key)) {
              return false;
            }
            seen.add(key);
            return true;
          });

        setDocuments(flattened);
      })
      .catch(() => {
        if (!cancelled) {
          setDocuments([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentLocale]);

  return documents;
}

function scoreDocument(document: SearchDocument, query: string): number {
  const q = normalize(query);
  const title = normalize(document.t);
  const source = normalize(document.s ?? '');
  const breadcrumbs = normalize((document.b ?? []).join(' '));

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (source.includes(q)) return 42;
  if (breadcrumbs.includes(q)) return 35;
  return 0;
}

export default function CommandPalette(): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const copy = COPY[currentLocale as keyof typeof COPY] ?? COPY.en;
  const documents = useSearchDocuments(currentLocale);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [colorMode, setColorMode] = useState('light');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const readColorMode = () => setColorMode(root.getAttribute('data-theme') ?? 'light');
    const observer = new MutationObserver(readColorMode);

    readColorMode();
    observer.observe(root, {attributes: true, attributeFilter: ['data-theme']});

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  const actions = useMemo<readonly PaletteItem[]>(
    () => [
      {
        id: 'getting-started',
        title: copy.actions.gettingStarted,
        description: '/docs/guides/getting-started/overview',
        url: '/docs/guides/getting-started/overview',
        type: 'action',
      },
      {
        id: 'architecture',
        title: copy.actions.architecture,
        description: '/docs/guides/architecture/system-overview',
        url: '/docs/guides/architecture/system-overview',
        type: 'action',
      },
      {
        id: 'troubleshooting',
        title: copy.actions.troubleshooting,
        description: '/docs/troubleshooting/overview',
        url: '/docs/troubleshooting/overview',
        type: 'action',
      },
      {
        id: 'security',
        title: copy.actions.security,
        description: '/docs/security/findings',
        url: '/docs/security/findings',
        type: 'action',
      },
      {
        id: 'database',
        title: copy.actions.database,
        description: '/docs/backend/database-model',
        url: '/docs/backend/database-model',
        type: 'action',
      },
      {
        id: 'open-questions',
        title: copy.actions.openQuestions,
        description: '/docs/reference/open-questions',
        url: '/docs/reference/open-questions',
        type: 'action',
      },
      {
        id: 'lang-en',
        title: copy.actions.switchEnglish,
        description: 'English',
        action: () => {
          window.location.href = currentPathForLocale('en');
        },
        type: 'language',
      },
      {
        id: 'lang-fr',
        title: copy.actions.switchFrench,
        description: 'Français',
        action: () => {
          window.location.href = currentPathForLocale('fr');
        },
        type: 'language',
      },
      {
        id: 'lang-ar',
        title: copy.actions.switchArabic,
        description: 'العربية',
        action: () => {
          window.location.href = currentPathForLocale('ar');
        },
        type: 'language',
      },
      {
        id: 'theme',
        title: copy.actions.toggleTheme,
        description: colorMode,
        action: () => {
          const nextMode = colorMode === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', nextMode);
          window.localStorage.setItem('theme', nextMode);
          setColorMode(nextMode);
        },
        type: 'theme',
      },
    ],
    [colorMode, copy],
  );

  const items = useMemo<readonly PaletteItem[]>(() => {
    const q = query.trim();
    const actionItems = actions.filter((item) => {
      if (!q) {
        return true;
      }
      return normalize(`${item.title} ${item.description}`).includes(normalize(q));
    });

    const searchItems = q
      ? documents
          .map((document) => ({document, score: scoreDocument(document, q)}))
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score || a.document.t.localeCompare(b.document.t))
          .slice(0, 9)
          .map(({document}) => ({
            id: `search-${document.i ?? document.u}-${document.h ?? ''}`,
            title: document.t,
            description: document.s ?? document.u,
            url: `${document.u}${document.h ?? ''}`,
            type: 'search' as const,
          }))
      : [];

    return [...actionItems.slice(0, q ? 5 : actions.length), ...searchItems];
  }, [actions, documents, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runItem(item: PaletteItem) {
    setOpen(false);
    if (item.action) {
      item.action();
      return;
    }
    if (item.url) {
      window.location.href = urlForLocale(item.url, currentLocale);
    }
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, items.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && items[activeIndex]) {
      event.preventDefault();
      runItem(items[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label={copy.button}
        title={copy.button}
        onClick={() => setOpen(true)}>
        <span>⌘K</span>
      </button>

      {open ? (
        <div className={styles.overlay} role="presentation" onMouseDown={() => setOpen(false)}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={copy.button}
            onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.searchLine}>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
              />
              <kbd>Esc</kbd>
            </div>
            <div className={styles.results} role="listbox" aria-label={copy.button}>
              {items.length === 0 ? (
                <p className={styles.empty}>{copy.noResults}</p>
              ) : (
                items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={index === activeIndex ? styles.activeItem : styles.item}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runItem(item)}>
                    <span className={styles.itemMeta}>
                      {item.type === 'search' ? copy.searchGroup : copy.actionGroup}
                    </span>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemDescription}>{item.description}</span>
                  </button>
                ))
              )}
            </div>
            <div className={styles.footer}>
              <span>{copy.shortcut}</span>
              <span>↑ ↓ Enter Esc</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
