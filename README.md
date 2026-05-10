# Dr Umma Hani Website

Separated frontend and backend implementation for a verified editorial website for **Dr Umma Hani**.

## Stack

- `frontend`: Next.js 16, TypeScript, Tailwind CSS, Framer Motion
- `backend`: Next.js 16, Payload CMS 3, PostgreSQL, Payload admin
- shared verified content source in `shared/site-content-v2.ts`

## Workspace layout

- `frontend/`: public website
- `backend/`: Payload CMS, admin, REST API, public JSON endpoints, inquiry endpoint
- `shared/`: verified content source used as the current common seed/fallback layer
- root media/CV files: original source assets supplied for the project

## What is implemented

- Public pages:
  - `/`
  - `/about`
  - `/medical-service`
  - `/public-service`
  - `/leadership`
  - `/media-events`
  - `/gallery`
  - `/updates`
  - `/updates/[slug]`
  - `/contact`
  - `/privacy`
- Utility pages:
  - `frontend`: `robots.txt`, `sitemap.xml`, `404`
  - `backend`: `/admin`, `/api/[...slug]`, `/api/public/site`, `/api/public/contact`
- Payload collections:
  - `users`
  - `media`
  - `positions`
  - `updates`
  - `events`
  - `gallery-items`
  - `contact-inquiries`
- Payload globals:
  - `site-settings`
  - `homepage`
  - `about-page`
  - `medical-service-page`
  - `public-service-page`
  - `leadership-page`
  - `media-events-page`
  - `contact-page`
  - `privacy-page`

## Verified content policy

- Public launch name: `Dr Umma Hani`
- Public launch email: `honeyhaque1078@gmail.com`
- Phone is intentionally not published in v1
- Public content is sourced from the uploaded CV/screenshots and approved media only
- Politically sensitive material is presented in restrained factual language, not campaign rhetoric

## Development

1. Install dependencies:

```bash
npm install
```

1. Configure environment variables from `.env.example`.

1. Run the backend:

```bash
npm run dev:backend
```

1. Run the frontend:

```bash
npm run dev:frontend
```

Default local URLs:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`
- admin: `http://localhost:4000/admin`

## Environment

Required variables:

- `FRONTEND_URL`
- `NEXT_PUBLIC_BACKEND_URL`
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `BACKEND_PUBLIC_URL`

Optional variable:

- `PAYLOAD_SEED_ON_INIT`

## Data flow

- The public website requests structured data from `backend/api/public/site`
- If the backend is unavailable during build/runtime, the frontend falls back to `shared/site-content-v2.ts`
- The contact form posts to `backend/api/public/contact`
- Payload collections/globals are ready for admin-managed content, while the shared verified content layer keeps the frontend stable before CMS population is complete

## Access roles

- `super-admin`: full access
- `content-admin`: site content, dynamic content, publish-capable management
- `editor`: draft creation and editing
- `media-manager`: media management
- `inquiry-manager`: inquiry management
- `reviewer`: read-oriented review access

## Verification commands

```bash
npm run typecheck -w frontend
npm run typecheck -w backend
npm run lint -w frontend
npm run lint -w backend
npm run build -w frontend
npm run build -w backend
```

## Notes

- The current frontend is intentionally seeded from verified source material rather than invented filler content.
- The backend public site endpoint maps Payload content into the shared `SiteContentV2` public contract and falls back to the verified shared source when CMS data is unavailable.
- Social links remain unpublished until explicitly approved.
- Updates and positions should be published only when titles, dates, source notes, and image context are verified.
- Production media uploads can use S3-compatible storage by setting `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, and related optional S3/R2 variables in the backend environment.
