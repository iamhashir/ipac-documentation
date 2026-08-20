import type {ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Footer from '@theme-original/DocItem/Footer';
import RelatedDocs from '@site/src/components/RelatedDocs';

interface RelatedFrontMatterItem {
  title: string;
  to: string;
  reason?: string;
}

export default function DocItemFooter(): ReactNode {
  const {metadata, frontMatter} = useDoc();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const related = (frontMatter as {related?: readonly RelatedFrontMatterItem[]}).related;

  return (
    <>
      <RelatedDocs id={metadata.id} locale={currentLocale} related={related} />
      <Footer />
    </>
  );
}
