import {useEffect, useState} from 'react';
import styles from './styles.module.css';

export default function MermaidEnhancer(): null {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const cleanups = new Map<HTMLElement, () => void>();

    function enhance(container: HTMLElement) {
      if (container.dataset.ipacEnhanced === 'true') {
        return;
      }
      container.dataset.ipacEnhanced = 'true';

      const toolbar = document.createElement('div');
      toolbar.className = styles.toolbar;

      const expand = document.createElement('button');
      expand.type = 'button';
      expand.textContent = 'Expand';
      expand.setAttribute('aria-label', 'Expand diagram');

      const download = document.createElement('button');
      download.type = 'button';
      download.textContent = 'SVG';
      download.setAttribute('aria-label', 'Download diagram SVG');

      const onExpand = () => {
        const clone = container.cloneNode(true) as HTMLElement;
        clone.querySelector(`.${styles.toolbar}`)?.remove();
        setExpanded(clone.innerHTML);
      };
      const onDownload = () => {
        const svg = container.querySelector('svg');
        if (!svg) return;
        const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ipac-diagram-${cleanups.size + 1}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      };

      expand.addEventListener('click', onExpand);
      download.addEventListener('click', onDownload);
      toolbar.append(expand, download);
      container.prepend(toolbar);

      cleanups.set(container, () => {
        expand.removeEventListener('click', onExpand);
        download.removeEventListener('click', onDownload);
        toolbar.remove();
        delete container.dataset.ipacEnhanced;
      });
    }

    function enhanceAll() {
      document
        .querySelectorAll<HTMLElement>('.docusaurus-mermaid-container')
        .forEach((container) => enhance(container));
    }

    enhanceAll();
    const observer = new MutationObserver(() => enhanceAll());
    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setExpanded(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded]);

  useEffect(() => {
    let overlay = document.getElementById('ipac-mermaid-overlay');
    if (!expanded) {
      overlay?.remove();
      return undefined;
    }

    overlay = document.createElement('div');
    overlay.id = 'ipac-mermaid-overlay';
    overlay.className = styles.overlay;
    overlay.innerHTML = `<div class="${styles.dialog}" role="dialog" aria-modal="true" aria-label="Expanded diagram"><button type="button" class="${styles.close}" aria-label="Close expanded diagram">Close</button><div class="${styles.canvas}">${expanded}</div></div>`;
    document.body.append(overlay);

    const close = overlay.querySelector('button');
    const onClose = () => setExpanded(null);
    close?.addEventListener('click', onClose);
    const onOverlayMouseDown = (event: MouseEvent) => {
      if (event.target === overlay) {
        setExpanded(null);
      }
    };
    overlay.addEventListener('mousedown', onOverlayMouseDown);

    return () => {
      close?.removeEventListener('click', onClose);
      overlay?.removeEventListener('mousedown', onOverlayMouseDown);
      overlay?.remove();
    };
  }, [expanded]);

  return null;
}
