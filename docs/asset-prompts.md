# Asset prompts

Two images on the page are AI-generated: the **ink mark** and the **portrait**.
The two app screens are *not* — those are drawn as real UI and should be
replaced with genuine screenshots, never with generated fakes.

Replace a file at the same path and the layout is unchanged.

| Slot | Path | Box | Source |
|---|---|---|---|
| Ink mark | `public/media/ink-mark.svg` | 1200 × 320, displayed ≤ 27rem wide | AI-generated |
| Portrait | `public/media/portrait.svg` | 400 × 500 (4:5) | Retouched photo of me |
| Plesica screen | `public/media/plesica.svg` | 800 × 600 (4:3) | Real screenshot |
| Gymrora screen | `public/media/gymrora.svg` | 800 × 600 (4:3) | Real screenshot |

The page palette, for reference:

| Token | Hex |
|---|---|
| paper | `#E9EAE4` |
| ink | `#15171B` |
| graphite | `#5C6269` |
| hairline | `#CBCDC5` |

---

## 1 — Ink mark (generate)

> A single abstract sumi-e ink gesture on a plain warm-grey paper background
> (#E9EAE4). One confident horizontal brushstroke travelling left to right,
> drawn in near-black ink (#15171B): thick and fully saturated where the brush
> presses down, tapering to a dry, split, feathered edge where it lifts. Around
> it, a handful of much finer hairline strokes echo its path like contour lines
> on a map, and three or four small ink specks sit off to one side. Wide
> panoramic composition, roughly 1200 × 320, with generous empty paper on all
> sides. Entirely monochrome — black ink on warm grey paper, no other colour, no
> gradients, no glow, no drop shadow. Flat, scanned-from-paper look with visible
> brush texture and slight fibre bleed. No text, no letters, no signature, no
> frame or border.

Notes: ask for a **transparent or flat #E9EAE4 background** — anything white
will show as a rectangle against the page. Export as SVG if the tool can, else a
transparent PNG at 2400 × 640.

## 2 — Portrait (edit an existing photo of me)

Feed it a decent, sharp photo of yourself, ideally head-and-shoulders, then:

> Edit this photograph into a clean studio portrait. Keep the person's face,
> expression, hair and clothing exactly as they are — do not restyle, beautify,
> slim, or alter the likeness in any way. Replace the background with a
> seamless, perfectly even warm light-grey studio backdrop (#E9EAE4), no
> vignette, no gradient, no visible seam. Relight the subject as if by a large
> softbox slightly above and to one side: soft directional light, gentle falloff,
> soft-edged shadows, no harsh specular highlights, no blown-out skin. Grade the
> whole image cool and muted to match the backdrop — desaturated, low contrast,
> natural skin tone with the saturation pulled well back, close to a warm
> monochrome without being fully black and white. Crop to a 4:5 vertical
> head-and-shoulders frame with the eyes about a third from the top and a little
> space above the head. Sharp focus on the eyes, natural skin texture retained
> — no smoothing, no plastic retouching, no beauty filter. No props, no text, no
> border.

Notes: the two things that make it *sit* on the page are the exact backdrop
colour and the pulled-back saturation. If it still looks like a photo pasted
onto the page, desaturate further rather than adding effects. Export 800 × 1000
JPEG, then update `media.portrait.src` in `src/data/site.ts` to the new
extension.

## 3 & 4 — App screens (do NOT generate)

Take real screenshots:

- **Plesica** — a card mid-review, with the queue/box state visible.
- **Gymrora** — a live session with logged sets and the rest timer running.

Crop to 4:3, keep the app's own colours, and avoid personal data in the frame.
The placeholders currently in those slots show the composition each screenshot
should roughly match.
