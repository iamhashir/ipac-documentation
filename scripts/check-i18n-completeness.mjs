import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {join, relative} from 'node:path';

const docsRoot = join(process.cwd(), 'docs');
const locales = ['fr', 'ar'];
const fallbackPatterns = [
  /Cette page n est pas encore disponible/i,
  /La version anglaise canonique/i,
  /هذه الصفحة غير متاحة/i,
  /النسخة الإنجليزية/i,
];

function walk(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(path);
    }
    return /\.(md|mdx)$/.test(entry.name) ? [path] : [];
  });
}

function withoutFrontMatter(source) {
  if (!source.startsWith('---\n')) {
    return source;
  }
  const end = source.indexOf('\n---\n', 4);
  return end === -1 ? source : source.slice(end + 5);
}

function proseLines(source) {
  let inFence = false;
  return withoutFrontMatter(source)
    .split('\n')
    .filter((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return false;
      }
      if (inFence) return false;
      const trimmed = line.trim();
      const identifierHeavy =
        trimmed.includes('`') ||
        trimmed.includes('<SourceRef') ||
        /\/docs\//.test(trimmed) ||
        /[A-Za-z0-9_./-]+\(?,?\s*[A-Za-z0-9_./-]*`?/.test(trimmed) &&
          (trimmed.match(/[_./`]/g)?.length ?? 0) >= 3;
      return (
        trimmed.length >= 42 &&
        !identifierHeavy &&
        !trimmed.startsWith('<') &&
        !trimmed.startsWith('|') &&
        !trimmed.startsWith('sources={[') &&
        !/^['"][^'"]+['"],?$/.test(trimmed)
      );
    })
    .map((line) => line.trim());
}

const canonicalFiles = walk(docsRoot).sort();
const errors = [];

for (const locale of locales) {
  const localeRoot = join(process.cwd(), 'i18n', locale, 'docusaurus-plugin-content-docs', 'current');
  for (const canonicalFile of canonicalFiles) {
    const relativePath = relative(docsRoot, canonicalFile);
    const localizedFile = join(localeRoot, relativePath);

    if (!existsSync(localizedFile)) {
      errors.push(`${locale}: missing localized page for ${relativePath}`);
      continue;
    }

    const canonical = readFileSync(canonicalFile, 'utf8');
    const localized = readFileSync(localizedFile, 'utf8');

    if (fallbackPatterns.some((pattern) => pattern.test(localized))) {
      errors.push(`${locale}: fallback notice remains in ${relativePath}`);
    }

    const canonicalProse = new Set(proseLines(canonical));
    const localizedProse = proseLines(localized);
    const copiedLines = localizedProse.filter((line) => canonicalProse.has(line));
    const copiedRatio = localizedProse.length === 0 ? 0 : copiedLines.length / localizedProse.length;

    if (copiedLines.length >= 8 || copiedRatio > 0.35) {
      errors.push(
        `${locale}: ${relativePath} still looks like an English fallback (${copiedLines.length} copied prose lines)`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`i18n completeness ok: ${canonicalFiles.length} pages for ${locales.join(', ')}`);
