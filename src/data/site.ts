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
 * Images. Both are placeholders drawn in the page's own palette — swap the file
 * at the same path (keeping the dimensions) and nothing else needs to change.
 * Generation prompts live in docs/asset-prompts.md.
 */
export const media = {
  portrait: {
    src: '/media/portrait.svg',
    alt: 'Vojtěch Prusa',
    width: 400,
    height: 500,
  },
  ink: {
    src: '/media/ink-mark.svg',
    width: 1200,
    height: 320,
  },
} as const;
