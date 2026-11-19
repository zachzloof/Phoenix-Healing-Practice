---
name: Phoenix Healing Practice
description: Hand-leaded suncatcher windows with living firelight behind them, one window per element.
colors:
  amber: "#f0912a"
  amber-deep: "#b9561a"
  marigold: "#f6c143"
  ruby: "#7a1420"
  ember: "#b8341b"
  lead: "#17110e"
  ink: "#2a1a12"
  ink-soft: "#5b4130"
  clear: "#efe3c6"
  clear-hi: "#f7efdc"
  room: "#1a0f0b"
  room-2: "#2b170e"
  dim-glass: "#3a1d10"
  text-on-room: "#f3e7cf"
  text-on-room-soft: "#d9c3a0"
  earth-room: "#15120a"
  earth-dim-glass: "#30260f"
  earth-heading: "#e8c27c"
  earth-ink-heading: "#5c3820"
  air-room: "#0d1122"
  air-dim-glass: "#1d2852"
  air-heading: "#cfe4f6"
  air-ink-heading: "#25336b"
  air-clear: "#e7eef0"
  chakra-root: "#c8202a"
  chakra-sacral: "#ee7a1a"
  chakra-solar: "#f2c423"
  chakra-heart: "#4fa040"
  chakra-throat: "#2f8fce"
  chakra-third-eye: "#4a45b0"
  chakra-crown: "#9353c6"
typography:
  display:
    fontFamily: "Caprasimo, 'Cooper Black', 'Cooper Std', serif"
    fontSize: "clamp(3rem, 5.6vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Caprasimo, 'Cooper Black', 'Cooper Std', serif"
    fontSize: "clamp(2.3rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Caprasimo, 'Cooper Black', 'Cooper Std', serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.04
  title-sm:
    fontFamily: "Caprasimo, 'Cooper Black', 'Cooper Std', serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.04
  lead:
    fontFamily: "'Alegreya Sans', 'Gill Sans', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "'Alegreya Sans', 'Gill Sans', 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Alegreya Sans', 'Gill Sans', 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.4
  button:
    fontFamily: "Caprasimo, 'Cooper Black', 'Cooper Std', serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  none: "0px"
  field: "2px"
  lunette: "50% 50% 0 0 / 7rem 7rem 0 0"
  arch: "999px 999px 0 0"
  jewel: "50%"
spacing:
  came: "8px"
  gutter: "clamp(10px, 1.6vw, 22px)"
  pane: "clamp(1.6rem, 3.5vw, 2.6rem)"
  pane-lg: "clamp(1.75rem, 4.5vw, 4.5rem)"
  section: "clamp(4rem, 7.5vw, 6.5rem)"
  container: "78rem"
components:
  button-book:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.lead}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  button-dim:
    backgroundColor: "{colors.dim-glass}"
    textColor: "{colors.text-on-room}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "1rem 1.3rem"
  pane-clear:
    backgroundColor: "{colors.clear}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.pane}"
  pane-dim:
    backgroundColor: "{colors.dim-glass}"
    textColor: "{colors.text-on-room}"
    rounded: "{rounded.none}"
    padding: "{spacing.pane}"
  came-frame:
    backgroundColor: "{colors.lead}"
    padding: "{spacing.came}"
  nav-link:
    backgroundColor: "{colors.dim-glass}"
    textColor: "{colors.text-on-room}"
    padding: "0 1.05rem"
  nav-link-active:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.lead}"
  input-field:
    backgroundColor: "#fffcf4"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.9rem"
---

# Design System: Phoenix Healing Practice

## Overview

**Creative North Star: "The Suncatcher Window"**

Every surface is a pane of hand-rolled glass held in black lead came, hung in front of a dusk room, with a light source behind it that the visitor moves. Nothing sits on a page; it sits in a window. The fire window (home) glows umber and amber, the earth window (Myofascial Release) settles into soil-olive and ochre, the wind window (Shamanic Healing) cools to twilight indigo, sky and lilac. One radial law (a rose window: seeded border ring, bead ring, leaf wreath, medallion with the element's figure) governs every hero window, and seven chakra cabochons run up each figure's spine, root at the bottom, crown at the top.

The world is warm, 1970s and hand-made rather than ecclesiastical or spa-clean. Display type is a soft-flared 70s face; reading copy sits on pale clear-seeded panes in a warm humanist sans. Lines are never vector-perfect: every procedural pane is cut from jittered points and every pane's colour is jittered a few percent, so no two pieces are the same glass. Glass plants (ivy, fern, monstera, trailing pothos) climb through frames and grow in the margins between sections.

Motion is light, not movement: glass brightens where light falls and dims elsewhere; nothing slides.

**Key Characteristics:**
- Black lead came (8px) is the only line ink and the only gap between panes.
- A dark, element-tinted room glows behind all glass; the page itself is the room.
- Pale clear-seeded panes carry all long reading; dim coloured panes carry chrome.
- Amber glass is the single hot action colour.
- Procedural, seeded, slightly wobbly geometry; nothing perfectly regular.
- A breathing firelight follows pointer (fine pointers) or rises with scroll (touch).

## Colors

A warm dusk room behind leaded glass: near-black lead, umber room light, cream clear glass, one hot amber, with each element page retinting the room, the dim glass and the headings.

### Primary
- **Firelit Amber** (amber, with amber-deep for the glow's lower edge): the booking pane and the active nav pane. Rendered as a radial gradient from a pale gold hot-spot through amber to amber-deep, with dark lead text. On hover/focus it brightens and throws an amber halo.

### Secondary
- **Marigold** (marigold): headings on the dark room (section lunettes, footer headings), the brand name, prices on dim panes, link hover on dark, and the global focus ring.
- **Ruby** (ruby): display and step headings on clear glass on the fire page; the sent-confirmation heading.
- **Ember** (ember): error borders on fields and inline links on clear glass.

### Tertiary
- **Chakra Cabochons** (chakra-root through chakra-crown): seven fixed jewel colours, always in root-to-crown order, used only as set cabochons (spines of figures, list bullets in service windows, the chakra rule under section heads, testimonial hanger jewels). Never as UI fills or text.

### Neutral
- **Came Lead** (lead): every frame, came gap, field border and jewel bezel; the text colour on amber.
- **Pane Ink / Soft Ink** (ink, ink-soft): heading-adjacent and body text on clear glass.
- **Clear Glass** (clear, clear-hi): the reading pane, a 158deg gradient clear-hi → clear → a darker cream, overlaid with seeds and streaks.
- **Dusk Room** (room, room-2): page ground with two radial glows of the element's room light.
- **Dim Glass** (dim-glass): chrome panes (nav links, secondary buttons, lunette panes, footer columns), a 160deg gradient to a darker umber.
- **Room Text** (text-on-room, text-on-room-soft): text on dim glass and the room.

### Element retints
Each element page sets `data-element` and retints only the room, dim glass, room headings, and ink headings. Earth: earth-room, earth-dim-glass, earth-heading on the room, earth-ink-heading on clear glass. Air: air-room, air-dim-glass, air-heading, air-ink-heading, and its clear glass cools to air-clear with a cooler ink. Amber, marigold focus and the lead never change between elements.

### Named Rules
**The Reserved Fire Rule.** Amber as a UI pane belongs to booking and the active state only. Amber inside illustrated glass (rose windows, the portrait arch) is fire, not action, and never carries a label.

**The One Lead Rule.** All structural line work is the single lead colour (lead). No grey hairlines, no coloured borders on panes.

## Typography

**Display Font:** Caprasimo (with Cooper Black, Cooper Std, serif)
**Body Font:** Alegreya Sans (with Gill Sans, Segoe UI, sans-serif)

**Character:** A soft, flared 70s display face with the weight of a poured-glass letter, over a warm calligraphic humanist sans that reads easily on cream glass.

### Hierarchy
- **Display** (400, clamp(3rem, 5.6vw, 5.75rem), 1.04): the hero title in each element window, on clear glass in the element's ink-heading colour.
- **Headline** (400, clamp(2.3rem, 5vw, 4rem), 1.04): section titles inside the lunette, marigold (or element heading) on dim glass.
- **Title** (400, clamp(2rem, 3.4vw, 2.75rem)): service window names. **Title-sm** (400, 1.45rem): step and small pane headings.
- **Lead** (400 italic, clamp(1.35rem, 2vw, 1.75rem), 1.3): the one-line tagline under a hero title; also the italic subtitle under a service name.
- **Body** (400, 1.125rem, 1.6): all reading copy; hero body capped at 34rem.
- **Label** (700, 1rem): form labels in ink; optional hints in 400 soft ink.
- **Button** (Caprasimo 400, 1.25rem, 1.1): every glass button; the hero book button scales to clamp(1.35rem, 2vw, 1.75rem).

### Named Rules
**The Display-Only-Flare Rule.** Caprasimo is for headings, buttons, prices and the brand name. Never for paragraphs, labels or fields.

**The Balanced Headline Rule.** Headings use `text-wrap: balance`, body uses `text-wrap: pretty`.

## Layout

The page is a stack of leaded windows on the dusk room. Sections pad clamp(4rem, 7.5vw, 6.5rem) vertically with a side gutter of clamp(10px, 1.6vw, 22px), and content sits in a 78rem container. Inside a window, panes are tiled by CSS grid with the came (8px) as both the frame padding and every gap, so the lead lines are the grid gutters.

The hero is one leaded panel filling the viewport below the nav: a clear words pane and an amber/dim action row on the left (about 0.92fr), the quarry pane with the rose window on the right (about 1.18fr), with diamond-quarry lead lattice (±62deg, 3px lines at 64px) behind the rose. Below 860px the panel stacks: rose (cropped, ~37svh) first, then words, then the full-width book pane.

Section headings sit in a leaded lunette (half-moon transom) centred over each section window, max 50rem wide. Service windows pair two-up and stagger the second down by up to 5rem. Steps run four across, two below 980px, one below 540px with the glass to the side.

Breakpoints observed: 1500, 1100 (nav collapses to brand + book + menu; margin plants shrink or hide), 980, 900, 860 (hero and two-column windows stack), 560, 540, 460, 420.

## Elevation & Depth

Depth is backlight, not lift. Panes are flat; light comes through them. Whole windows cast one deep, soft drop shadow onto the room, panes carry inset glow (the glass's own thickness), and the only outward glow is amber light spilling from the booking pane and the booking frame. Firelight is an overlay gradient driven by `--lx/--ly/--lr/--li` that darkens the glass away from the light and screens light onto it near the light.

### Shadow Vocabulary
- **Window drop** (`box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.7), inset 0 0 0 1px rgb(255 255 255 / 0.04)`): every came frame.
- **Lunette drop** (`box-shadow: 0 24px 50px -20px rgb(0 0 0 / 0.7)`): section heading transoms.
- **Clear glass body** (`box-shadow: inset 0 0 40px rgb(120 70 20 / 0.12)`): clear panes.
- **Amber rest / lit** (`inset 0 0 30px rgb(120 40 0 / 0.35)` → `inset 0 0 30px rgb(255 230 160 / 0.5), 0 0 48px rgb(240 145 42 / 0.55)`): booking pane.
- **Booking halo** (`0 0 90px rgb(240 145 42 / 0.28)` added to the window drop): the calendar frame only.

### Named Rules
**The Backlight Rule.** Interaction never moves a pane. Hover and focus raise `brightness`/`saturate` (dim glass to 1.5–1.6, amber to 1.12, windows to 1.15) over 0.6–0.8s on cubic-bezier(0.16, 1, 0.3, 1).

**The Glass Texture Rule.** Every glass surface carries the seeds texture (bubbles); clear and amber panes also carry pulled streaks. Untextured flat fills read as plastic.

## Shapes

Panes are square-cornered: the lead came does the shaping. Curves come from window silhouettes, not radii: the lunette transom (50% 50% 0 0 / 7rem), the round-topped arch (999px top radii, 8px lead border), the circular rose window, and the arched tops of the hanging testimonial suncatchers. Fields take a near-square 2px corner with a 3px lead border. Chakra jewels are circles with a lead bezel and a single white glint. Procedural pieces (sectors, leaves, flames, plants) are cut from jittered points and smoothed, so nothing is geometrically perfect.

## Components

### Buttons
Glass panes you can press: flat, square, lit from behind.
- **Shape:** square (0), set into came or edged with a 3–4px lead border when free-standing.
- **Book (primary):** amber radial glass with seeds and streaks, lead-coloured Caprasimo text; in the hero it pairs the label with a "£60" price split by a 3px lead-tint rule. Minimum height 5.25rem in the hero, 4rem on mobile.
- **Hover / Focus:** brighten 1.12 and saturate 1.1 with an amber outer glow; focus additionally gets the 3px marigold outline at 3px offset.
- **Dim (secondary):** dim glass with room text and a hand-drawn arrow SVG; hover brightens to 1.5.
- **Disabled:** grayscale 0.5, brightness 0.9, progress cursor.

### Cards / Containers
- **Came frame:** lead background, 8px padding and gap, the window drop shadow.
- **Clear pane:** cream seeded glass, ink text, padding clamp(1.6rem, 3.5vw, 2.6rem) (hero: up to 4.5rem).
- **Dim pane:** dim glass with seeds, room text.
- **Quarry pane:** illustrated window cell with diamond lead lattice over a radial room glow, brightening 1.15 on hover.

### Inputs / Fields
- **Style:** near-white warm fill (rgb(255 252 244 / 0.85)), 3px lead border, 2px radius, 0.8rem 0.9rem padding, 1.05rem body type.
- **Focus:** fill warms to #fffaf0 with a 4px amber ring and a soft amber glow; no outline.
- **Error:** border turns ember on `:user-invalid`.

### Navigation
A sticky top transom strip of dim panes inside a came strip: brand pane (phoenix mark + marigold Caprasimo name with a small soft subtitle), five link panes (Alegreya Sans 500, 1rem), an empty filler pane that is still glass, and the amber book pane at the right. Hover brightens 1.6; the current page's pane turns amber glass with lead text. Below 1100px links collapse into a menu pane that drops a stacked came of link panes.

### Rose Window (signature)
The element's hero window, built procedurally from one seeded radial law: 32-pane border ring alternating coloured and clear glass with bright nuggets, a bead ring, a 16-sector dark wreath with 22 tangential leaves (veins as lead), and a medallion holding the element's figure with the seven chakra jewels on its spine. Palettes per element (deep, flame, bright, pale, leaf, clear, border) live in the glass library. On the fire page it ignites: an ember at the foot catches and the light rises over ~2.8s (expo.out).

### Firelight (signature interaction)
A light source behind the glass. Fine pointers: the light pulls halfway toward the cursor (1.1s, power3.out), clamped so the window never goes dark. Touch: the light rises through the window as it scrolls past. Always: a slow breathing flicker (radius ±4%, intensity 0.86–1, 1.4–2.8s sine). Reduced motion: one still, generous light.

### Lunette Section Head
The section heading set into a half-moon leaded transom: the first pane is the arched title pane, following panes (lede, chakra rule) stack beneath, all dim glass in came.

### Step Panes
Four leaded steps, each an illustrated glass square above a clear copy pane. They light in sequence when reached (`--lit` 0 → 1, 1.4s expo.out, 0.45s stagger), raising glass brightness and copy opacity.

### Glass Plants
Ivy, fern, monstera and pothos built from leaded leaf blades in the element's leaf palette. They overlap frames in heroes and grow in section margins on wide screens; below 1100px they shrink to 9rem or hide.

## Do's and Don'ts

### Do:
- **Do** set every surface as glass inside lead came: 8px lead frame and gaps, never a free-floating card.
- **Do** put all reading text on clear seeded glass in ink or soft ink; keep dim glass for chrome and short lines.
- **Do** reserve amber panes for booking and the active state, with lead-coloured text.
- **Do** retint a new element page only through `data-element` (room, dim glass, room heading, ink heading).
- **Do** generate new glass procedurally from a seeded RNG with jittered points and jittered pane colours.
- **Do** express interaction as light: brightness, saturation and glow, 0.6–0.8s on cubic-bezier(0.16, 1, 0.3, 1).
- **Do** keep chakra colours in root-to-crown order and only as set cabochons.

### Don't:
- **Don't** slide, scale or translate panes on hover or scroll; glass brightens, nothing slides.
- **Don't** introduce grey or coloured hairline borders; the only line is lead.
- **Don't** round pane corners; curves belong to window silhouettes (lunette, arch, rose).
- **Don't** use amber as a decorative UI fill, badge or secondary button.
- **Don't** draw perfectly regular vector geometry for glass; every cut wobbles.
- **Don't** set paragraphs or form text in Caprasimo.
- **Don't** flicker fast: the firelight breathes over seconds, never strobes, and stands still under reduced motion.
