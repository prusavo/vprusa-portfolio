export const site = {
  name: 'Vojtěch Prusa',
  role: 'Product engineer',
  domain: 'vprusa.com',
  email: 'prusavo@gmail.com',
  /** Three words. Not a pitch — this page is not selling anything. */
  intro: 'I build things.',
  title: 'Vojtěch Prusa',
  description:
    'Vojtěch Prusa — product engineer. Projects: Plesica, a spaced-repetition app, and Gymrora, a coaching platform.',
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
  /** Cut out of its studio backdrop so it sits directly on the paper. */
  portrait: {
    src: '/media/portrait.webp',
    alt: 'Vojtěch Prusa',
    width: 700,
    height: 772,
  },
  /** Trimmed to the stroke, so it spans its box edge to edge. */
  ink: {
    src: '/media/ink-mark.webp',
    width: 1100,
    height: 469,
  },
} as const;
