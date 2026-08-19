# ipac-documentation

The engineering knowledge base for the **IPAC operations system**: the
`website` admin application, the `Mobile` field application, and the Supabase
backend they share.

Built with [Docusaurus 3](https://docusaurus.io/), TypeScript, MDX and Mermaid.
Deployed on Vercel.

> **Internal.** This site is not public. Crawling is disallowed, sitemap
> generation is off, and the Vercel project is intended to sit behind Vercel
> Deployment Protection. Never add a credential, token, key or real secret value
> to this repository.

## This repository is independent

It contains **no application code** and has **no build-time dependency** on
either application repository. Clone it, install, build — that is all. Source
code is referenced by link, never copied in.

## Local development

Requires Node 22 (see `.nvmrc`) and npm.

```bash
nvm use          # optional, if you use nvm
npm ci           # install exactly what the lockfile specifies
npm start        # dev server with hot reload, http://localhost:3000
```

No environment variables are needed. There are none.

### Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Development server with hot reload |
| `npm run build` | Production build into `build/` |
| `npm run serve` | Serve a production build locally |
| `npm run typecheck` | TypeScript, no emit |
| `npm run validate` | `typecheck` then `build` — run this before opening a pull request |
| `npm run clear` | Clear the Docusaurus cache when the dev server behaves oddly |

Broken internal links, broken anchors and broken Markdown links **fail the
build**. That is deliberate: a knowledge base with rotten links is worse than
none.

## Content structure

```text
docs/
├── guides/
│   ├── introduction.mdx
│   ├── getting-started/       # prerequisites → setup → first change
│   └── architecture/          # system overview, shared backend, per-app, triggers
└── reference/
    ├── documentation-status.mdx
    └── open-questions.mdx
```

Sections for the backend, security-model and workflow areas are
**intentionally absent**. They are added when verified content exists, not as
empty placeholders. See `sidebars.ts`.

## Writing rules

Three rules, and they are the point of this repository:

1. **Invent nothing.** Every claim must come from the application repositories,
   the live database, or cited existing documentation.
2. **Declare your confidence.** Every page carries a status banner —
   `verified`, `partial`, or `open-question` — with a date and the sources
   checked. See `docs/reference/documentation-status.mdx`.
3. **Never resolve a contradiction by guessing.** Record it in
   `docs/reference/open-questions.mdx` with a stable ID, and mark the affected
   page.

Two components are available in every MDX page without an import:

```mdx
<Status type="verified" date="2026-08-19" sources={['website:package.json']}>
  What was checked, and what was not.
</Status>

<SourceRef repo="website" path="src/lib/supabase.ts" symbol="createClient" />
```

`SourceRef` resolves repositories from `customFields.repositories` in
`docusaurus.config.ts`. Commit-SHA pinning is not automated yet — when it is
adopted, changing `ref` there upgrades every reference on the site with no page
edits. A repository whose canonical URL is unconfirmed renders as plain text
rather than an invented link.

### The documentation boundary

Canonical **here**: system and cross-application architecture, onboarding,
workflows, security model, backend architecture, database concepts, mobile
architecture, admin architecture, deployment, troubleshooting, architectural
decisions.

Canonical in the **application repositories**: agent and assistant instructions,
code-specific conventions, temporary development notes, internal investigation
logs, implementation-specific instructions.

Whole documents are never duplicated across repositories.

## Deployment

Vercel, via **native Git integration** — not GitHub Actions. The docs site has no
secrets and no runtime backend, so the pipeline that `website` needs would be
pure overhead here.

| Setting | Value |
| --- | --- |
| Framework preset | Docusaurus (auto-detected) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `build` |
| Node version | 22.x |
| Production branch | `main` |
| Environment variables | none |

Pull requests get a preview deployment; merges to `main` go to production;
rollback is a dashboard action.

### Before the first deployment

1. **Enable Vercel Deployment Protection** on the project. This repository can
   make the site *compatible* with protection; it cannot enable it. Standard
   Protection covers previews — protect production as well.
2. **Confirm the audience and the domain**, then update `url` in
   `docusaurus.config.ts`. It currently holds a placeholder.
3. **Leave `static/robots.txt` in place** while access is restricted.

Both are tracked as `OQ-009` in `docs/reference/open-questions.mdx`.

## Contributing

```bash
git checkout -b docs/<short-description>
# write, then:
npm run validate
```

A pull request should say which pages changed, what was verified and against
what, and whether any open question was opened, updated or closed.
