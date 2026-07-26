# Asset prompts

Two images on the page are AI-generated: the **ink mark** and the **portrait**.
The two app screens are *not* — those are drawn as real UI and should be
replaced with genuine screenshots, never with generated fakes.

Replace a file at the same path and the layout is unchanged.

| Slot | Path | Box | Source | State |
|---|---|---|---|---|
| Ink mark | `public/media/ink-mark.webp` | 900 × 384, displayed ≤ 27rem wide | AI-generated | **done** |
| Portrait | `public/media/portrait.webp` | 600 × 750 (4:5) | Generated from 6 reference photos of me | **done** |
| Plesica screen | `public/media/plesica.svg` | 800 × 600 (4:3) | Real screenshot | placeholder |
| Gymrora screen | `public/media/gymrora.svg` | 800 × 600 (4:3) | Real screenshot | placeholder |

### Post-processing (if either is regenerated)

Both originals were multi-megabyte PNGs; they ship as WebP.

- **Portrait** — the generated backdrop came out a mid warm grey, not the
  requested `#E9EAE4`, which read as a photo pasted onto the page. So the
  backdrop is **cut away entirely** and he stands directly on the paper:

  1. Flood-fill from the frame edge, keeping only pixels close to the backdrop
     colour. Connectivity matters — skin is tonally close to the backdrop, but
     it is never connected to the border, so it survives.
  2. Add a chroma guard: the backdrop is neutral (`|R−G| ≤ 22`, `|R−B| ≤ 34`),
     skin is warm. Without it the flood bridges through a lit cheek and eats a
     hole in the face.
  3. Grow the cut 1 px into the backdrop, blur ~1.3 px for a soft edge.
  4. Desaturate to 50 % so he sits in the muted palette.
  5. Fade the bottom 42 % out with a smoothstep ramp — the photo's own hard
     bottom and shoulder crops are what made him look like a sticker.
  6. Trim, resize to 700 px, WebP q84 → ~45 kB.

  Invert the mask in plain JS, not with sharp's `negate()` — see the ordering
  trap below.
- **Ink mark** — the scan's paper sat two or three levels below `#E9EAE4`, which
  showed on the page as a faint rectangle. Colour-matching it is brittle, so the
  paper is **keyed out to transparency** instead: luminance becomes the alpha
  channel (paper → 0, ink → 255) over a solid `#15171B` fill, resized to 900 px,
  WebP q75 / alphaQuality 70 → ~12 kB.

  One trap: sharp applies `linear()` *before* `negate()` regardless of the order
  you call them, which silently leaves a ~13 % grey veil over the whole frame.
  Do it in a single negative-slope pass instead:

  ```js
  sharp(src).grayscale().linear(-255 / PAPER, 255)  // PAPER = 227, the scan's paper level
  ```

  Verify by sampling a rendered screenshot inside and outside the image — both
  should read exactly `#e9eae4`.

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

## 2 — Portrait (generate from reference photos of me)

Upload **six photos of your face from different angles** as references, then ask
for one new portrait. The references are there to lock the likeness — the output
is a new photo, not a retouch of any single input.

> Use the supplied reference photographs of the same man, shot from several
> angles, as the definitive guide to his identity, and generate one new studio
> portrait of him.
>
> **Likeness — the priority.** His face must stay unmistakably his: the same bone
> structure, the same eyes, nose, mouth and jawline, the same skin tone, the same
> apparent age, the same facial hair. Do not slim the face, sharpen the jaw,
> enlarge the eyes, or idealise the features in any way. Keep real skin texture,
> pores and natural asymmetry.
>
> **Expression.** Head and shoulders, facing the camera almost straight on with
> the head turned very slightly to one side, chin level, shoulders relaxed. A
> genuine, warm, closed-lip smile that reaches the eyes — relaxed and friendly,
> not a wide grin or a posed grin. Eyes looking directly into the lens.
>
> **Hair.** The same haircut, hairline and colour as in the references, simply
> well groomed: tidy, clean, naturally arranged, no stray or frizzy strands, no
> flyaways. Do not change the length or the style, and do not add hair where
> there is none.
>
> **Clothing.** A plain, well-fitting dark top with a simple neckline. No logos,
> no patterns, no busy detail.
>
> **Light and background.** A seamless, perfectly even warm light-grey studio
> backdrop (#E9EAE4) — no vignette, no gradient, no visible seam. Lit by a large
> softbox slightly above and to one side with a soft fill opposite: soft
> directional light, gentle falloff, soft-edged shadows, small natural catchlights
> in the eyes, no harsh specular highlights, no blown-out skin.
>
> **Colour.** Graded cool and muted to match the backdrop — desaturated, low
> contrast, natural skin tone with the saturation pulled well back, close to a
> warm monochrome without being fully black and white.
>
> **Framing.** Vertical 4:5 crop, head and shoulders, eyes about one third from
> the top, a little space above the head.
>
> Photographic, not illustrated. Sharp focus on the eyes, natural skin texture
> retained — no smoothing, no plastic retouching, no beauty filter, no AI gloss.
> No props, no text, no border.

**Which six references to send.** Straight on, three-quarter left, three-quarter
right, near profile, one slightly from above, one slightly from below. Even
daylight, no sunglasses, no hat, nothing across the face, and all reasonably
recent so the age matches.

**Failure modes, in the order they bite:**

1. *Identity drift* — the face comes back generically handsome and not quite
   yours. Generate several and pick on likeness first, aesthetics second; if all
   of them drift, add “the face must match the references exactly” and re-run.
2. *Airbrushed skin* — ask for “more visible skin texture and pores, less
   retouching”.
3. *Wrong smile* — “a smaller, softer closed-lip smile” usually fixes a grin.
4. *Photo sitting on top of the page* rather than in it — desaturate further and
   check the backdrop is the exact `#E9EAE4`. Don't fix this with effects.

Export 800 × 1000 JPEG to `public/media/portrait.jpg`, then point
`media.portrait.src` in `src/data/site.ts` at the new file (the placeholder is
`.svg`, so the extension changes).

## 3 — Samoyed (generate from reference photos of the dog)

Upload several photos of the dog as references, then:

> Use the supplied reference photographs of the same Samoyed dog as the
> definitive guide to this specific dog's appearance, and generate one new
> studio portrait of him.
>
> **Likeness.** This exact dog: the same face, the same eye shape and colour,
> the same ear set, the same fur density and any individual markings visible in
> the references. Do not generate a generic breed photo.
>
> **Pose and expression.** Head-and-chest portrait, sitting, facing the camera
> almost straight on with the classic Samoyed smile — mouth slightly open,
> relaxed, alert ears. Looking into the lens.
>
> **Light and background.** A seamless, perfectly even warm light-grey studio
> backdrop (#E9EAE4), no vignette, no gradient. One large softbox slightly above
> and to one side, soft fill opposite: soft directional light with visible
> texture in the white coat — individual guard hairs sharp, no blown-out fur.
>
> **Colour.** Desaturated and cool, low contrast — the coat off-white, not pure
> white, so detail survives.
>
> **Framing.** Vertical 4:5, chest up, eyes about a third from the top.
>
> Photographic, not illustrated. No props, no bandana, no text, no border.

Post-processing: run the result through the **same duotone pipeline as the
portrait** (luma → ink-to-paper ramp), resize to 900 px wide, WebP q80, save as
`public/media/dog.webp`, then fill `media.dog` in `src/data/site.ts` — the
"photo pending" plate swaps for the image automatically.

White-coat note: the shipped asset uses the **same ramp as the portrait**
(HI #DDDED6) plus a light pre-duotone sharpen (sigma 0.5) — one tonal system
for both photographs. The dissolve worry only applies to cutouts; as a
rectangle the coat reads against the photo's own backdrop, not the paper. Only
drop the ramp (HI ≈ #d4d5cd) if a regenerated coat comes back truly blown out.

## 4 — App screens (do NOT generate)

Take real screenshots:

- **Plesica** — a card mid-review, with the queue/box state visible.
- **Gymrora** — a live session with logged sets and the rest timer running.

Crop to 4:3, keep the app's own colours, and avoid personal data in the frame.
The placeholders currently in those slots show the composition each screenshot
should roughly match.
