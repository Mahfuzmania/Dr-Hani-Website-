# Photograph-led portfolio review

The later Immersive Navy implementation and current review preview are recorded in [`../immersive-implementation/REVIEW.md`](../immersive-implementation/REVIEW.md). The deployment link below is a historical snapshot.

The approved refinement keeps Dr Umma Hani's existing hero, font pairing, routes, verified profile, published writing and original media. The homepage now uses open photographic stories, with her journey as the second section, fluid page widths, warm-white surfaces and navy dialogue/contact sections.

Review preview: https://dr-hani-editorial-review-3zso0ez7b-azm-labs.vercel.app (Vercel authentication; indexing disabled). Deployment: `dpl_997HPuAnR5HEXXwR8cHWFjgTCcCF`. Production URL remains https://dr-hani-website.vercel.app.

## Content preservation

- All 9 original gallery records remain accessible in `/gallery`.
- All 16 new supplied photographs appear in the review archive; 12 distinct new photographs appear across medical, dialogue and public-work sections.
- All 5 original videos remain in the homepage playlist and media archive.
- All 6 authored essays / 7 publisher placements remain grouped in `/writing`; reporting remains separate.
- Career history remains on `/about`; activity records and original update slugs remain accessible.
- The alternate crop named `clinic-corridor-portrait` is retained as an asset but is no longer used as a separate homepage scene. Hospital-specific labels no longer accompany unrelated service images.
- `asset-sheet.json`, `preservation.json` and `baseline-gallery.json` record placement, captions, originals and the preceding publication states. Supplied originals were not changed.

## Validation

- Frontend and backend production builds, type checks and lint passed.
- 15 focused tests passed, including media preservation, placement, grouping, draft/private-note exclusion, CMS empty/outage handling and staff-edit-safe repeat imports.
- The isolated Payload acceptance suite passed with a temporary SQLite database: anonymous visibility, editor/admin publication controls, staff edits and empty collections.
- The new PostgreSQL migration was generated against the previous adapter schema snapshot without connecting to a database. Its UP contains six additive schema statements. It has not been applied to production.
- Homepage widths 360, 390, 430, 768, 1366 and 1920 were checked: correct 16/24/40px gutters, no horizontal document overflow, and twelve distinct new photos.
- Mobile supporting-photo scrolling, keyboard opening, next/previous viewing, explicit forward/backward focus wrapping, Escape and opener focus restoration were verified in the production build. Mobile menu wrapping and closing were also verified.
- Writing search and empty-state reset, publisher filtering for the grouped essay, gallery event filtering and full-image viewing were verified.
- Selecting the medical-service video loaded the original MP4 with native controls, readyState 4, a valid duration and no playback error. No video file is mounted before a user interaction.
- The contact form rejected an empty submission with four invalid fields; no inquiry was sent. Contact route forwarding/error handling passed mocked integration checks.
- Biography, writing, gallery, press, updates, privacy and activity-detail pages were inspected on mobile and desktop; long detail headings and mobile update image placement were repaired during review.

## CMS and release notes

The separate Vercel preview uses the reviewed content snapshot. It does not apply CMS migrations, publish production records or connect a production inquiry backend. Its contact fallback continues to direct visitors to email when the backend is unavailable.

Gallery curation adds optional `homepageSection`, `focalX` and `focalY`; homepage controls add dialogues/writing visibility. Existing records and API responses remain compatible. Public responses still exclude drafts and private notes; an empty or unavailable CMS archive does not restore bundled archive records.

Use `node --import tsx scripts/curate-photographs.mts` for an offline proposal. Supply `--export=<gallery-export.json>` to compare a current CMS export. The script's apply mode requires an explicit approved target, backup and `PHOTO_CURATION_APPROVED=true`; it preserves publication states, changes only baseline-matching fields, and creates missing records as drafts. Do not use the broader editorial import for this curation pass.

Production remains unchanged. Production deployment and content updates require explicit approval of the concrete preview. Back up CMS data first; the previous source release is `2c14e4b`, and the previous Vercel deployment remains available for rollback. Reverting code does not require dropping the new optional database columns.
