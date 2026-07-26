export const site = {
  name: 'Vojtěch Prusa',
  role: 'Product engineer',
  domain: 'vprusa.com',
  email: 'prusavo@gmail.com',
  /** One line of orientation. Not a pitch — this page is not selling anything. */
  intro: 'I build things for the web. Two of them are below.',
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
