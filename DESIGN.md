---
name: Dr Umma Hani
description: Immersive Navy visual system for a photography-led medical and public-life portfolio.
colors:
  deep-navy: "#0b2038"
  navy-soft: "#19364f"
  warm-white: "#fcfbf8"
  cream: "#f2f0e9"
  muted-ink: "#435160"
  pale-blue-text: "#d1dee8"
  restrained-gold: "#a68139"
  pale-gold-action: "#e5cb92"
  warm-border: "#dce0df"
  field-surface: "#fafbf9"
  field-border: "#c6ced2"
typography:
  display:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(46px, 4.9vw, 70px)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 48px)"
    fontWeight: 650
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(22px, 2vw, 30px)"
    fontWeight: 650
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.7
  label:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  bengali-title:
    fontFamily: "Noto Serif Bengali, serif"
    fontSize: "clamp(23px, 1.8vw, 30px)"
    fontWeight: 500
    lineHeight: 1.7
  identity:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "36px"
    lineHeight: 1.1
rounded:
  control: "10px"
  field: "12px"
  navigation: "14px"
  feature-card: "16px"
  photo: "20px"
  feature: "26px"
  contact: "28px"
spacing:
  gutter-mobile: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  section-mobile: "40px"
  section-desktop: "64px"
components:
  button-primary:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.navy-soft}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-hero:
    backgroundColor: "{colors.pale-gold-action}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  field:
    backgroundColor: "{colors.field-surface}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  filter-selected:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.warm-white}"
    rounded: "8px"
    padding: "8px 14px"
    height: "44px"
  floating-navigation:
    backgroundColor: "#fcfbf8fa"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.navigation}"
    padding: "14px 24px"
    height: "82px"
  featured-writing:
    backgroundColor: "#f1eee6"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.feature-card}"
    padding: "28px 32px"
---

# Design System: Dr Umma Hani

## Overview

**Creative North Star: "Immersive Navy"**

An experience-led portrait of a physician and writer. Original photography carries the public record; deep navy provides an immersive but readable setting, and warm-white pages give the evidence room to breathe. The site feels assured and personal through wide image-led composition, precise type and a few tactile controls.

The floating cream navigation and framed footer establish continuity across the portfolio. Gold marks selected actions, icons and focus without becoming a decorative wash. Navy returns for the hero, dialogues and contact feature; most reading and archive content stays on warm white or quiet cream. This system preserves the chosen identity while allowing the content of each photograph and publication to set the pace.

**Key Characteristics:**

- Original photographs lead the composition, with source-aware crops and concise verified context.
- A wide centred frame keeps comfortable gutters while letting photograph groups use the available width.
- Contemporary Instrument Sans hierarchy carries the interface; serif faces are reserved for identity and Bengali writing.
- Glass and soft depth are concentrated in floating navigation, media controls, fields and tactile buttons.

**The Photograph Leads Rule.** Use visual framing to support original photographs, not to bury them in repeated glass cards or decorative effects.

## Colors

The palette moves between deep photographic navy, warm paper and restrained gold.

### Primary

- **Deep Navy** (`#0b2038`): Hero, dialogue and contact backgrounds, primary controls and high-contrast text.
- **Navy Soft** (`#19364f`): The primary button's hover state and quiet navy variation.

### Secondary

- **Restrained Gold** (`#a68139`): Focus outline, link underline, key icons and small accents.
- **Pale Gold Action** (`#e5cb92`): The warm primary action on the navy hero and header contact control.

### Neutral

- **Warm White** (`#fcfbf8`): Main canvas and pale text on dark features.
- **Cream** (`#f2f0e9`): Tonal section ground and image-adjacent neutral field.
- **Muted Ink** (`#435160`): Secondary copy, captions and metadata on light surfaces.
- **Pale Blue Text** (`#d1dee8`): Muted copy on navy surfaces.
- **Warm Border** (`#dce0df`): Dividers in archive rows and other light sections.
- **Field Surface** (`#fafbf9`) and **Field Border** (`#c6ced2`): Tactile form fields and archive controls.

**The Gold in Restraint Rule.** Let navy and photography carry the weight; use gold for focus and a small number of actionable details.

## Typography

**Display and body font:** Instrument Sans, with a sans-serif fallback. **Identity accent:** Cormorant Garamond, with a serif fallback. **Bengali article titles:** Noto Serif Bengali, with a serif fallback.

Instrument Sans gives the portfolio a contemporary, readable hierarchy. The two serif faces have specific jobs: Cormorant names the person in navigation and footer; Noto Serif Bengali respects the original script of authored essays.

- **Display** (650, `clamp(46px, 4.9vw, 70px)`, 1.05): Desktop hero name. It scales separately below 900px and again below 768px.
- **Headline** (650, `clamp(32px, 3.4vw, 48px)`, 1.14): Homepage section headings; archive introductions use their own larger responsive scale.
- **Title** (650, `clamp(22px, 2vw, 30px)`, 1.14): Section subheads. English publication headings use 600 weight and a quieter 26px scale.
- **Body** (16px mobile, 17px from 768px, 1.7): General copy. Longer reading passages use a 65ch maximum and 1.85 line-height.
- **Label** (14px, 500, 1.5): Essential navigation, metadata, captions and controls. Labels remain legible rather than becoming tiny decorative eyebrows.
- **Bengali title** (500, `clamp(23px, 1.8vw, 30px)`, 1.7): Authored essays in original script. The featured homepage essay grows to `clamp(26px, 2.4vw, 36px)`.

**The Three Voices Rule.** Keep Instrument Sans as the reading and interface voice, Cormorant for identity, and Noto Serif Bengali for Bengali essay titles.

## Layout

The centred page shell has a maximum width of 1840px. Its responsive side gutters are 20px on mobile, 32px from 768px, and 48px from 1024px. The desktop homepage uses 64px section spacing, reducing to 40px below 768px. Text usually stays within a 60–65ch measure while photography takes the wider columns.

The first desktop viewport is an inset navy hero with copy on solid navy at left and the seated portrait at right; only the seam receives a fade. Below 900px the portrait moves ahead of the name and actions. The journey follows immediately. Medical, dialogue and public-life photographs form source-aware rows; the doctors' and Bay event pairs use the full available section width without an extra 1100px cap. On mobile, selected photo groups become natural-size stacks or scrollable strips, and the viewer retains the complete caption.

Writing uses a compact full-width two-column feature followed by two smaller articles on desktop, then stacks on mobile. Archive publication rows place metadata, title and summary in distinct columns; Bengali title and source links occupy adjacent rows. Dialogue and contact features stay inside the same safe frame as the rest of the site.

**The Safe Frame Rule.** Use the wide shell and its responsive gutters for every navy or photographic feature; never press essential content against the viewport edge.

## Elevation & Depth

The base system is tonal and largely flat. Depth appears where a control should feel touchable or where floating navigation needs separation from photographs. The navigation combines a translucent warm-white surface, a 24px blur and a soft layered shadow. Primary buttons gain a shallow outer lift and light inset edge; fields use low-contrast inset shading. The contact form has a stronger shadow only because it sits on navy.

- **Floating navigation:** `0 10px 32px #0b203812, 0 1px 3px #0b20380c, inset 0 1px 0 #ffffff`.
- **Primary control:** `0 5px 12px #0b203816, inset 0 1px 0 #ffffff26`.
- **Field inset:** `inset 2px 2px 5px #0b203807, inset -2px -2px 5px #ffffff`.
- **Contact form:** `0 18px 38px #00000020, inset 0 1px 0 #ffffff`.

**The Selective Glass Rule.** Blur floating navigation and media controls; keep the content and photographs visually clear.

## Shapes

Corners are deliberate and moderate. Buttons and small action controls use 10px radii, fields use 12px, and the floating navigation uses 14px. Featured writing uses 16px. Photographs commonly use 12–20px, while large navy and cream compositions use 22–28px according to the viewport. Avoid pill silhouettes. Borders are thin and quiet; clipping protects image edges rather than forcing unrelated photographs into identical crops.

## Components

### Buttons and links

Primary and secondary actions share a 48px minimum height, 12px by 22px padding, 10px corners and a 180ms state transition. Navy is the default primary fill; the hero primary is pale gold on navy. Secondary actions are outlined and transparent, with a quiet hover fill. Hover lifts the primary by 1px, active presses it by 1px, and keyboard focus has a 3px gold outline with 5px offset. Text links remain compact, underlining in gold on hover and moving the arrow slightly.

### Navigation

The header floats over the page in a warm-white, lightly translucent 14px-corner frame. Desktop links use 14px type with gold underline on hover or current page. The contact action appears at wide desktop sizes; mobile uses a 44px square menu control and a full-height dialog. The footer is a separate cream framed surface with serif identity and tactile social links.

### Fields and filters

Inputs and selects have a 48px minimum height, 12px corners, pale field surface, restrained border and subtle inset depth. They retain the shared gold focus outline. Archive filters sit in a cream panel; gallery tabs are quiet at rest and turn navy when selected. Field labels use 14px text without decorative tracking.

### Photographs and media

Photograph buttons have softly clipped edges and a small translucent expand control. Homepage groups omit generic repeated captions; archive figures and the keyboard-operable viewer carry fuller verified descriptions. Use natural aspect ratios, `object-fit: contain` where a crop could remove a person, and differing widths at a shared visual height for narrow courtesy portraits. Video posters use a 16px-corner blurred play control and load playback after interaction.

### Publications and contact

Archive publication cards are divided rows rather than a grid of boxes. The featured homepage essay alone receives a cream 16px-corner panel. The contact feature is navy with a warm-white 16px-corner form panel and clear delivery state copy.

## Do's and Don'ts

### Do:

- **Do** use original photographs as the lead material and choose their framing from the source aspect ratio.
- **Do** keep navy and photograph features inside the 1840px shell with 20px, 32px and 48px responsive gutters.
- **Do** preserve 14px essential metadata and readable 16–17px body copy.
- **Do** use the Phosphor icon family consistently: regular for navigation and media controls, duotone for milestones.

### Don't:

- **Don't** force every image into the same crop, clip a person to satisfy a grid, or add filler captions.
- **Don't** turn the site into repeated glass panels, icon-card grids, pill buttons or gratuitous gradients.
- **Don't** replace the photographic record with stock images, invented metrics or unsupported identity claims.
