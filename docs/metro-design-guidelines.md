# Metro Design Guidelines

Design language based on Microsoft's **Metro** (Windows Phone 7 / Windows 8 era).
Core idea: *authentically digital*. Flat, typography-first, content over chrome,
strong grid, generous whitespace, motion as feedback. No skeuomorphism, no
gradients on surfaces, no drop shadows, no fake textures.

> This is a living document. Adapt values to fit the Montageplaner app.

---

## 1. Principles

1. **Content, not chrome** — strip decoration; the content *is* the interface.
2. **Typography is the UI** — large, light type carries the design.
3. **Flat and authentically digital** — no bevels, gradients, glossy, or 3D fakery.
4. **Strong grid + whitespace** — empty space is intentional, not wasted.
5. **One accent color** — a single theme color drives the whole UI.
6. **Motion is meaningful** — fast, snappy, staggered; communicates state.

---

## 2. Typography

Font is the heart of Metro. Use it big and light.

- **Primary font:** Segoe UI
- **Web stack:** `"Segoe UI", "Segoe", Tahoma, Geneva, Verdana, sans-serif`
- **Open-source alternatives:** Selawik (MS Segoe substitute), Open Sans
- **Weights:** Light, Semilight, Regular, Semibold, Bold
  - Favor **Light / Semilight** at large sizes; Regular for body.

### Type ramp

| Role             | Size      | Weight        | Notes                          |
|------------------|-----------|---------------|--------------------------------|
| Hero / page title| 42–72 px  | Light         | May bleed off edge (panorama)  |
| Section header   | 24–28 px  | Light/Semilight | Often lowercase              |
| Sub-header       | 20 px     | Semilight     |                                |
| Body             | 15 px     | Regular       | Default reading text           |
| Caption / meta   | 12–13 px  | Regular       | Secondary at ~60% opacity      |

### Rules

- **No text effects.** No drop shadow, bevel, gradient, or glow. Solid color only.
- **Left-align** text. Ragged right. Avoid justification.
- **Tight tracking** on large light text; default elsewhere.
- **Casing:** nav/pivot labels often lowercase or ALL CAPS — pick one, be consistent.
- Secondary text = primary color at reduced opacity, **not** a gray hex.

---

## 3. Color

High-contrast, solid, saturated. No gradients on surfaces.

The main color for the application is 
$color-primary: #6667AB; // Very Peri

## 4. Spacing & Grid

Strict grid. Big margins. Whitespace is design.

- **Base unit:** 4 px. Common steps: 4, 8, 12, 16, 24, 48.
- **Tile gutter:** 12 px between tiles.
- **Page margin:** ~24 px content indent from left edge.
- **Touch target:** min **40 × 40 px** visual; pad hit area larger than visual.
- **Alignment:** snap everything to the grid; strong left alignment.
- **Negative space:** don't fill. Leave room intentionally.

### Live Tile sizes (reference)

| Tile   | Size (px)  |
|--------|------------|
| Small  | 150 × 150  |
| Wide   | 310 × 150  |
| Large  | 310 × 310  |

Tiles: flat colored rectangles, **square corners**, no border. Icon + text.

---

## 5. Motion

No Animation right now.

## 6. Layout patterns

- **Panorama / Hub:** wide horizontal canvas; off-screen content peeks at the edge
  to hint there's more. Big light title bleeds off edge.
- **Pivot:** horizontal tab sections; header labels swipe.
- **App bar:** minimal bottom bar with circular monochrome icon buttons.
- **Lists:** flat rows, left-aligned, alternating or plain; no heavy dividers.

---

## 7. Iconography

No icons right now.

## 8. Design tokens (starter)

Adapt these to the app's styling system (SCSS / CSS vars).

```css
:root {
  /* color */
  --bg:            #000000;
  --fg:            #ffffff;
  --fg-secondary:  rgba(255, 255, 255, 0.6);
  --accent:        #1ba1e2;

  /* type */
  --font-family:   "Segoe UI", "Segoe", Tahoma, Geneva, Verdana, sans-serif;
  --fs-hero:       42px;
  --fs-header:     24px;
  --fs-subheader:  20px;
  --fs-body:       15px;
  --fs-caption:    12px;
  --fw-light:      300;
  --fw-regular:    400;
  --fw-semibold:   600;

  /* spacing (4px base) */
  --space-1:       4px;
  --space-2:       8px;
  --space-3:       12px;
  --space-4:       16px;
  --space-6:       24px;
  --space-12:      48px;

  /* layout */
  --page-margin:   24px;
  --tile-gutter:   12px;
  --touch-min:     40px;

  /* motion */
  --motion-fast:   150ms;
  --motion-base:   250ms;
  --ease-out:      cubic-bezier(0.1, 0.9, 0.2, 1);
}
```

---

## Don'ts

- ❌ Gradients on surfaces or text
- ❌ Drop shadows, bevels, glossy highlights
- ❌ Rounded tile corners / heavy borders
- ❌ Skeuomorphic textures
- ❌ Gray hex for secondary text (use opacity)
- ❌ Centered body text / justified text
