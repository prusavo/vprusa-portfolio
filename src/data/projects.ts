/**
 * Project entries. A name, one sentence, a live URL, and the one colour the
 * entry owns. The page shows projects as typography, not screenshots — this is
 * a signpost, and the real product is one click away at its own domain.
 */

export type Project = {
  name: string;
  /** One sentence: what it is, in the terms someone using it would recognise. */
  blurb: string;
  /** Shown as the row's destination, mono. */
  domain: string;
  url: string;
  /** The one colour this entry owns. */
  accent: string;
};

export const projects: Project[] = [
  {
    name: 'Plesica',
    blurb: 'Flashcards on spaced repetition that keep working when the wi-fi doesn’t.',
    domain: 'plesica.com',
    url: 'https://plesica.com',
    accent: '#3A2FD6',
  },
  {
    name: 'Gymrora',
    blurb: 'A coaching platform — trainers plan the work, athletes run it.',
    domain: 'gymrora.com',
    url: 'https://gymrora.com',
    accent: '#0E6B52',
  },
];
