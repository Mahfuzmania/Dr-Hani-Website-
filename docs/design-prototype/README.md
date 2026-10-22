# Dr Umma Hani — visual study

Three responsive, read-only compositions using the existing cream/navy identity, actual photographs, reconciled biography, and published essay register. These answer which visual direction to take before another site-wide implementation. They are not approved production designs.

Run `node scripts/serve-design-prototype.mjs` from the repository root. Open http://127.0.0.1:4173.

The comparison board is at http://127.0.0.1:4173/directions.html. It includes final desktop/mobile screenshots and links to every homepage and archive.

- `?variant=signature`: warm framed portrait; layered paper surfaces; a navy featured essay; approachable professional profile.
- `?variant=portrait`: bold navy portrait opening; larger photography; compact editorial columns; stronger light/dark contrast.
- `?variant=journal`: typographic masthead; asymmetric introduction with a recent essay; editorial article rows; more cultural/publication character.

Append `&view=writing` for the writing archive. Switch directions with the bottom review controls or left/right arrow keys. Search, topic/publisher filters, source links, mobile navigation, email links, and photo viewing work. No forms submit, accounts are created, or CMS records change. The bottom design-study controls are review UI only.

The public name, hero image, core palette, and existing serif/sans pairing are preserved. No unconfirmed job titles, affiliations, endorsements, individual patient counts, or new qualifications are introduced. The six original works retain grouped publication links in the archive.

Production frontend, CMS, deployed review, and live website are untouched. This directory is a throwaway visual prototype; chosen decisions should be implemented in the real component system after review. Its fonts are copied from the existing local build so review does not depend on Google Fonts requests.

## Review evidence, 20 October 2026

One consolidated desktop/mobile review, followed by one repair and confirmation pass. Repairs increased mobile copy size, separated the Journal role labels, removed blur from the introduction animation, and made the isolated prototype's images load eagerly for reliable full-page review captures.

All three homepages and writing archives were inspected at 1440px and 390px, with additional overflow/heading checks at 360px, 430px, and 768px. No horizontal overflow or clipped headings were found in those checks. Six essays and seven publisher links remain grouped correctly. Search with no results, topic filtering, filtering by secondary publisher Agamir Somoy, mobile-menu toggling, and photo opening/closing worked. No browser console errors were observed in the functional pass. JavaScript syntax checks passed.

This is visual and interaction evidence for a throwaway prototype, not production accessibility certification or approval of an art direction. No application builds were needed because production application code was not modified. The visual decision remains with the user.
