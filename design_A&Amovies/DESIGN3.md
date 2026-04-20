# Design System Document: The Timeless Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Gallery"**

This design system is not a framework; it is an exhibition space. To honor high-end photography, the UI must recede, acting as the gallery walls that support the art. We move beyond the "template" look by embracing **Intentional Asymmetry** and **Cinematic Pacing**. 

The goal is to create a "High-End Editorial" experience that feels like a physical, luxury monograph. We achieve this through radical whitespace, the total elimination of structural lines, and a "tonal-first" approach to depth. By stacking soft cream surfaces and using charcoal typography with gold accents, we create a sense of quiet authority and bespoke craftsmanship.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a refined trio: **Cream (Surface)**, **Charcoal (Primary)**, and **Soft Gold (Secondary/Tertiary)**.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning or containment are strictly prohibited. Structural boundaries must be defined solely through background color shifts.
*   *Implementation:* A `surface-container-low` (#f5f3ee) section should sit on a `surface` (#fbf9f4) background to define a change in content without "closing" the layout with lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of fine paper layers. 
*   **Lowest Layer:** `surface` (#fbf9f4) for the main canvas.
*   **Secondary Layer:** `surface-container-low` (#f5f3ee) for large secondary sections.
*   **Elevated Elements:** `surface-container-lowest` (#ffffff) for high-importance cards or interactive modules.
Nesting these tiers creates a soft, tactile depth that feels premium and organic rather than digital and rigid.

### The "Glass & Gold" Accent
To add "soul," use the Gold accents (`secondary` #775a19 and `tertiary` #735c00) sparingly.
*   **Signature Textures:** Use subtle gradients transitioning from `secondary_fixed` (#ffdea5) to `secondary_fixed_dim` (#e9c176) for primary CTAs to mimic the sheen of gold leaf.
*   **Glassmorphism:** For floating navigation or overlays, use `surface` at 80% opacity with a 20px `backdrop-blur` to allow the colors of the photography to bleed through the UI.

---

## 3. Typography
The typographic system relies on the interplay between the authoritative **Noto Serif** and the modernist **Manrope**.

*   **Display & Headlines (Noto Serif):** Used for "Hero" moments and section titles. The high-contrast serif evokes a classic masthead. Use `display-lg` (3.5rem) with increased letter-spacing for a "breathable" luxury feel.
*   **Body & Titles (Manrope):** The clean, geometric sans-serif provides a functional counterpoint. Use `body-lg` (1rem) for descriptions to ensure maximum legibility against the cream background.
*   **Labels (Manrope):** All-caps labels with wide tracking (letter-spacing: 0.1em) should be used for metadata or categorization to denote a "curatorial" voice.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card over a `surface-container` (#f0eee9) background. The subtle 2% shift in brightness is enough to signify "lift" without visual clutter.
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal or a primary action button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(27, 28, 25, 0.05)`. The shadow color must be a tint of `on-surface` (#1b1c19) to mimic natural light.
*   **The Ghost Border:** If accessibility requires a container boundary, use `outline-variant` (#d1c5b4) at 20% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** `on-primary-fixed` (#1b1c1c) background with `surface` (#fbf9f4) text. Shape: `sm` (0.125rem) radius. High-end design favors sharp or nearly-sharp corners over "pill" shapes.
*   **Secondary (The Gold Standard):** A gradient of `secondary_fixed` to `secondary_fixed_dim`. Use for high-conversion actions like "Book a Session."
*   **Tertiary:** Ghost style. No background, `on-surface` text with a 1px `underline` that disappears on hover.

### Cards & Lists
*   **The No-Divider Rule:** Forbid the use of divider lines. Separate list items using `vertical white space` (minimum 24px) or subtle shifts between `surface-container-low` and `surface-container-high`.
*   **Image Containers:** Use `none` (0px) or `sm` (0.125rem) roundedness for images to maintain an architectural, "framed" look.

### Input Fields
*   **Styling:** Underline-only style using the `outline` (#7f7667) token. When focused, the underline transitions to `secondary` (Gold). Labels should be in `label-md` Manrope, all-caps.

### Unique Components
*   **The Image Loupe:** A custom cursor or floating element that appears over high-res photography, using a glassmorphic background and a gold icon.
*   **The Story-Scroll:** A full-screen vertical transition component that uses `surface-dim` to fade between gallery sections.

---

## 6. Do's and Don'ts

### Do
*   **DO** use asymmetric margins. A photo might be offset 10% from the left, while the text is offset 20% from the right.
*   **DO** treat whitespace as a functional element. If it feels like there is "too much" space, add 10% more.
*   **DO** use the Gold (`secondary`) only for 5% of the total screen area. It is a highlight, not a theme.

### Don't
*   **DON'T** use pure black (#000000). Always use Charcoal (`on-background` #1b1c19) to keep the contrast "soft-luxury."
*   **DON'T** use "heavy" rounded corners (xl, full) for main UI elements. This isn't a playful consumer app; it is a professional studio. Stick to `none` or `sm`.
*   **DON'T** use standard grid-row borders. Use `surface-container` tiers to create horizontal bands of color for separation.