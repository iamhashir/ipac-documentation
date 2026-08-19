import MDXComponents from '@theme-original/MDXComponents';
import Status from '@site/src/components/Status';
import SourceRef from '@site/src/components/SourceRef';

/**
 * Makes <Status> and <SourceRef> available in every MDX page without an
 * import. Keeps documentation pages free of boilerplate.
 */
export default {
  ...MDXComponents,
  Status,
  SourceRef,
};
