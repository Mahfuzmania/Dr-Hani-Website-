# Editorial portfolio release

## Local review

1. `npm ci`
2. `npm run editorial:media` (only needed when original photos change).
3. `npm run editorial:register`
4. `npm run editorial:import` creates missing reviewed records in the default local SQLite database. Run from the repository root. Existing publication/gallery IDs and update slugs are skipped, preserving staff edits. The superseded Jagonews media article is retained as a draft once its grouped publication exists.
5. `npm run dev:backend` and `npm run dev:frontend`. Set the frontend's `NEXT_PUBLIC_BACKEND_URL=http://localhost:4000` to review CMS-driven data. Without a backend URL the reviewed bundled snapshot is used.

Custom CMS publication management is `/admin/publications`; the existing `/payload` administration also exposes the collection. Editors prepare drafts. Content administrators publish. Public pages use the existing five-minute refresh interval.

## Database deployment

PostgreSQL schema push is disabled. The generated `backend/src/migrations/20261020_000000_editorial_publications.ts` adds the publications/version/source/topic tables and gallery grouping fields. It was derived from the installed Payload adapter's before/after schemas, without connecting to production.

Before applying to an existing deployment, back up the database and media. On a staging clone run `PAYLOAD_DB_DRIVER=postgres` with `payload migrate` from `backend`, then run the content importer. Compare publication/gallery/update counts and verify existing records and revisions. Do not run a fresh/reset migration. The down migration removes the new archive tables: export their data before an intentional rollback.

The production importer requires `EDITORIAL_IMPORT_APPROVED=true` in addition to the production database/storage configuration. It creates missing entries only; it never overwrites staff-edited imported records. No production database migration or content import is performed by this task.

## Preview deployment

Current review: https://dr-hani-editorial-review-bc55hywld-azm-labs.vercel.app (separate review project; Vercel sign-in may be required). See `ACCEPTANCE_REVIEW.md` for completed checks and remaining gates. `node scripts/prepare-review-deployment.mjs` prepares an isolated frontend bundle in the ignored `.review-deployment/` folder; no backend data, environment files or research documents are uploaded.

Deploy the frontend workspace to Vercel's preview environment. Use `SITE_NOINDEX=true` in the preview environment as an additional guard; the Vercel preview environment automatically supplies noindex metadata, disallowed robots, and an `X-Robots-Tag` response header. Canonicals remain the production `FRONTEND_URL` (fallback: https://dr-hani-website.vercel.app), never a generated preview hostname.

The frontend works from the reviewed bundled snapshot when no backend is configured. For CMS acceptance connect a staging backend with migrated schema and imported content. Do not point preview editing/imports at production.

Contact requests go through the frontend's same-origin `/api/contact` route, which forwards to the configured `BACKEND_PUBLIC_URL` or `NEXT_PUBLIC_BACKEND_URL`. Configure that address on staging/production. The standalone visual preview has no submission backend and displays an unavailable message with email as the contact option.

Production release requires approval of the concrete preview and the content review document. Preserve the previous Vercel deployment for rollback. Recheck routes, images, source links, noindex behaviour, contact submission, and published-only content on the hosted preview.
