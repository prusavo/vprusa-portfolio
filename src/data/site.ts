export const site = {
  name: 'Vojtěch Prusa',
  role: 'Product engineer',
  domain: 'vprusa.com',
  email: 'prusavo@gmail.com',
  title: 'Vojtěch Prusa',
  description:
    'Vojtěch Prusa — product engineer. Building Plesica and Gymrora; runs, lifts, reads romantasy, and walks a Samoyed named Maggie.',
} as const;

const instagram = 'https://www.instagram.com/vojtapru__/';
const linkedin = 'https://www.linkedin.com/in/vojt%C4%9Bch-pr%C5%AF%C5%A1a-a5043722b/';

/**
 * The contact rows, in order. Add a link here and it appears on the page —
 * external ones are also picked up as schema.org `sameAs` (see below).
 */
export const links = [
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    label: 'Instagram',
    value: '@vojtapru__',
    href: instagram,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'in/vojtěch-průša',
    href: linkedin,
    external: true,
  },
] as const;

/** Profiles that identify the same person, for structured data. */
export const sameAs = links.filter((l) => l.external).map((l) => l.href);

/**
 * Images. Both are final: generated, then resized and converted to WebP.
 *
 * The ink mark's paper was keyed out to transparency rather than colour-matched
 * — its scanned paper sat two or three levels below #E9EAE4, which showed as a
 * faint rectangle. With an alpha channel the page's own background shows
 * through, so it stays correct whatever the paper colour becomes.
 */
export const media = {
  /**
   * Duotone: luma mapped from the page's ink to just under its paper, so the
   * photograph is built from the page's own two colours and cannot clash. It
   * fills its hero cell edge to edge — material, not a sticker.
   */
  portrait: {
    src: '/media/portrait.webp',
    alt: 'Vojtěch Prusa',
    width: 1000,
    height: 1250,
  },
  /**
   * Maggie. Same duotone pipeline as the portrait, with the highlight end of
   * the ramp lowered so the white coat keeps its texture on the paper.
   */
  dog: {
    src: '/media/dog.webp',
    alt: 'Maggie, the Samoyed',
    width: 900,
    height: 1125,
  } as { src: string; alt: string; width: number; height: number } | null,
} as const;

/**
 * The about section. Voice rule for the whole page: this is a get-to-know-me
 * page, not a hire-me page — first person, warm, specific, nothing that would
 * fit on a CV.
 */
export const about = {
  story: [
    'Code since I was twelve; the dream back then was video games. These days I build web apps instead — nearly the same thing, except my final boss is a production deploy. Since 2022 it’s also the day job.',
    'Away from the keyboard: running, the gym, and romantasy — yes, the kind with fae courts and terrible decisions; no, I regret nothing. Everything else is Maggie’s time. She’s a Samoyed, which is to say a cloud with opinions.',
  ],
} as const;

/** One line above the contact rows — an invitation, not a funnel. */
export const contactNote =
  'For anything at all — a question, a book recommendation, a photo of your dog.';
