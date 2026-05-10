---
name: Cinematic Grace
colors:
  surface: '#f9f9ff'
  surface-dim: '#d1daf4'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8ff'
  surface-container-highest: '#d9e2fc'
  on-surface: '#121b2e'
  on-surface-variant: '#424752'
  inverse-surface: '#273044'
  inverse-on-surface: '#edf0ff'
  outline: '#727784'
  outline-variant: '#c2c6d4'
  surface-tint: '#0d5bbc'
  primary: '#00408b'
  on-primary: '#ffffff'
  primary-container: '#0057b8'
  on-primary-container: '#bfd2ff'
  inverse-primary: '#adc7ff'
  secondary: '#00677f'
  on-secondary: '#ffffff'
  secondary-container: '#86ddfd'
  on-secondary-container: '#006279'
  tertiary: '#725c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba81b'
  on-tertiary-container: '#4d3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc7ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#b6eaff'
  secondary-fixed-dim: '#7ad2f1'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffe07e'
  tertiary-fixed-dim: '#e9c339'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#564500'
  background: '#f9f9ff'
  on-background: '#121b2e'
  surface-variant: '#d9e2fc'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 84px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

This design system is built on the pillars of **Soft Cinematic & 3D Dimensionality**. The aesthetic moves away from flat, clinical layouts toward a digital environment that feels tangible, airy, and sophisticated. It targets a high-end audience seeking expertise wrapped in an approachable, feminine, and civic-minded elegance.

The visual direction utilizes **Glassmorphism** as a core structural element, layering semi-transparent "frosted" panels over a backdrop of shifting 3D forms. The emotional response should be one of calm authority—merging the intellectual rigor of a medical professional with the warmth of a premium personal brand. Light is used as a narrative tool, with soft glows and subtle shadows creating a sense of physical space and depth.

## Colors

The palette is anchored in an "Ivory & Deep Navy" foundation to establish civic trust and traditional authority. This is softened by "Pale Aqua" and "Sky Blue" accents that introduce a modern, breathable quality. 

**Golden Yellow** and **Blonde Gold** are reserved for high-impact details, such as active states or premium iconography, providing a sense of "Cinematic Lighting" within the UI. The use of a semi-transparent white glass (`rgba(255,255,255,0.72)`) is essential for maintaining legibility over complex 3D background orbs without sacrificing the layered depth of the design system.

## Typography

This design system pairs the timeless, editorial authority of **Noto Serif** with the functional clarity of **Inter**. 

Headings should utilize generous letter spacing to evoke a premium, cinematic feel. Display type is intended to be large and airy, often overlapping with glass containers or 3D elements to enhance the sense of depth. Body text maintains a high line-height to ensure the interface feels spacious and unhurried. Metadata and small labels use Inter in uppercase with increased tracking to provide a modern, systematic contrast to the traditional serif headings.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for content, centered within a fluid background of 3D forms. A 12-column grid is used for desktop layouts, with wide 32px gutters to prevent visual clutter. 

Vertical spacing is intentionally "Airy," using large `stack-lg` gaps between sections to allow the background parallax elements to be seen and appreciated. Content containers should rarely hit the edges of the viewport, instead floating as glass cards within the safe margins of the screen.

## Elevation & Depth

Hierarchy is established through **Backdrop Blurs** and **Ambient Shadows** rather than flat color changes. 

1.  **Level 0 (Base):** The ivory background with animated 3D orbs and mesh gradients.
2.  **Level 1 (Surface):** Large Glassmorphic panels with a 24px backdrop-blur and a subtle 1px solid border (#E8DEC9).
3.  **Level 2 (Interactive):** Buttons and cards that use extra-diffused, low-opacity navy shadows (`rgba(8, 32, 68, 0.08)`) with a 40px blur radius.
4.  **Level 3 (Overlays):** Modals and high-priority tooltips featuring stronger blurs and light-source highlights on the top-left edge to simulate cinematic lighting.

## Shapes

The shape language is defined by **Soft Curvature**. Avoid harsh 90-degree angles. Primary containers use a 1rem (`rounded-lg`) radius, while smaller interactive elements like buttons and input fields utilize 0.5rem. 

The background 3D elements should consist of "Organic Blobs" and "Soft Orbs" with no defined edges, blending into one another through mesh gradients. This reinforces the "Soft" aspect of the cinematic theme.

## Components

### Buttons
Primary buttons use the **Deep Royal Blue** background with white text. They should have a subtle inner glow on the top edge. Secondary buttons are "Glass-style" with a semi-transparent white fill and a **Warm Border**.

### Cards
Cards are the primary vehicle for Glassmorphism. They must feature a `backdrop-filter: blur(20px)` and a subtle gradient stroke that simulates a light catching the edge of a glass pane.

### Input Fields
Inputs use the **Secondary Background** (#FFF9EE) with a 1px border. When focused, the border transitions to **Sky Blue** and gains a soft outer glow.

### Chips & Tags
Small, pill-shaped elements using the **Pale Aqua** background with **Authority Navy** text. These should be semi-translucent to stay consistent with the layered theme.

### Additional Elements
- **Parallax Orbs:** Abstract 3D spheres that move at different speeds relative to the scroll.
- **Glass Nav Bar:** A fixed header with high blur and a bottom border in **Warm Border** (#E8DEC9).