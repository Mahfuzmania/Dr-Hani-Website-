# Immersive Navy review — 22 October 2026

Review preview: https://dr-hani-editorial-review-5rnzf87my-azm-labs.vercel.app  
Vercel deployment: `dpl_CneAthMmqPXZtNpgnEHiqRD4d1zv` (`READY`, preview target, Vercel authentication). The production site at https://dr-hani-website.vercel.app has not been changed.

## Visual result

- The original seated photograph leads a navy hero that fills the first desktop viewport beneath the floating header. At the user-supplied 1854 × 744 reference size, the hero ends at 756px and the Journey section begins below the fold. The mobile portrait is taller without stretching the source.
- The cream floating header is more opaque over busy photography. The footer is a contained cream panel with safe gutters. Buttons retain restrained soft depth and 10px corners.
- Medical, doctors' gathering, Dhaka Dialogue, Bay of Bengal and community rows use equal visual heights within each desktop group. Portraits and landscape photographs keep their natural ratios; `object-fit: contain` protects people from destructive crops.
- On mobile, the courtesy-visit strip keeps the 9:16 bouquet portrait at its intrinsic shape. The four frames share a 420px visual height at 390px width through proportional item widths, without stretched images or side mattes.
- Removed a redundant Journey photograph caption. Names and roles of accompanying people remain unasserted unless independently verified.
- The doctors’ gathering and Bay of Bengal photo pairs now fill their available rows while keeping each image’s natural proportion. Removed a second nested margin from the doctors’ row, including on mobile.
- The homepage featured essay now occupies a compact full-width feature above two articles. The writing archive aligns article titles, summaries, source links, and metadata without a tall blank grid row.
- Generic photo titles no longer sit below homepage photographs. The gallery archive retains full captions and the photograph buttons use descriptive accessible labels.

Screenshots: `hero-reference-1854-final.png`, `hero-1366-final.png`, `hero-390-final.png`, `doctors-wide-final.png`, `doctors-mobile-final.png`, `bay-wide-final.png`, `home-writing-compact-final.png`, `writing-archive-compact-final.png`, `final-caption-public-desktop.png`, and `final-caption-public-mobile.png` in this folder. The source-image and placement register is `../photographic-refinement/asset-sheet.json`; preservation evidence is `../photographic-refinement/preservation.json`.

## Preservation and checks

- All nine original gallery records, all sixteen supplied photographs, five videos and six distinct essays with grouped publication links remain accounted for. Twelve distinct new photographs are selected for the homepage. Existing routes, anchors, redirects, filters, full-image viewing and activity slugs remain available.
- The frontend production build and type check passed with Next's Webpack build path. Frontend lint, sixteen focused tests, and the 15-route local verification passed after the formatting corrections.
- Browser checks at 360, 390, 430, 768, 1366 and 1920px found no horizontal overflow. The doctors’ image row fills its parent at all six widths; the Bay pair fills its section. The 1854 × 744 screenshot check confirms the requested first-viewport hero. The mobile courtesy frames were measured against loaded source images at natural aspect ratios, and browser error logs were empty.
- The hosted root returned HTTP 200 and `X-Robots-Tag: noindex, nofollow, noarchive`; `/robots.txt` says `Disallow: /`. The sitemap and canonical link retain the stable production domain.

## Release boundary

The review deployment contains a static content snapshot. It has not migrated or published production Payload records. Payload is not hosted, so the contact form honestly opens an email draft instead of claiming to save an enquiry. Production deployment and any production CMS operation remain subject to approval of this preview and a CMS backup.
