# Photo-led portfolio review — 20 October 2026

Review deployment: https://dr-hani-editorial-review-kymqc7z2x-azm-labs.vercel.app

Vercel deployment `dpl_Fgf3btf25aD7Pkgq9J2ZZfJ2dpGr` is READY in the separate `dr-hani-editorial-review` project. It is protected by Vercel sign-in. Authenticated verification returned HTTP 200, `X-Robots-Tag: noindex, nofollow, noarchive`, and `robots.txt` with `Disallow: /`. Browser metadata also carries noindex/nofollow and the stable original production canonical.

The signed-in browser rendered the deployed homepage with nine gallery tiles and 27 images in the main content (including video thumbnails and education logos). The gallery archive contains fourteen published photographs. All nine original gallery records and five original video records/files remain, as verified by `portfolio-preservation.test.ts` and the baseline inventory. Three existing hospital features, four community photos, education, internship and career history are represented again. Six authored essays retain seven publication placements. Draft photographs and the unresolved current job/central political appointment claims have not been republished. No staff database edits were overwritten.

## Validation completed

- Frontend and backend lint and type checks passed.
- Twelve tests passed, including content preservation, public visibility, CMS fallback, grouping and repeatable imports.
- Isolated Payload CMS acceptance passed: publish/unpublish, editor restrictions, anonymous draft/private-note exclusion, empty archive handling, staff-edit preservation and additive migration. Test users were created only in a disposable temporary SQLite database. No application accounts were created.
- Frontend webpack production build and Vercel Turbopack production build passed. Backend webpack production build passed with bundler warnings.
- Home and gallery layouts checked at 360, 390, 430, 768 and 1440px. About, writing, media, updates, contact redirect and privacy checked at mobile and desktop widths. No horizontal overflow, clipped headings or header overflow were found in the inspected layouts; see `responsive-review.json`.
- Category and event filters, incompatible-filter empty state and clearing, full-image opening, next photo, Escape dismissal, focus return and scroll restoration worked.
- Mobile menu opened and navigated to Writing, restoring page scrolling. Secondary publisher filtering retained the grouped Ekushey TV and Agamir Somoy links.
- Interview control loads the original native video with controls. Original homepage anchor IDs remain. Source and public email links remain intact.

## Review and release boundaries

This is a frontend/content snapshot review deployment, not a new staging CMS service. Email correspondence is available; form delivery requires the configured backend service. The contact proxy correctly refuses to claim success without a backend, covered by tests. The actual CMS authentication screens and real message delivery are not claimed as hosted staging acceptance.

The live production website is unchanged. Visual/client approval and confirmation of unresolved biographical/caption details remain human decisions. No deployment protection was disabled, and no production credentials or databases were changed. The earlier prototype directions are rejected historical artifacts and are not the implementation target.
