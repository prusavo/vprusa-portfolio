/**
 * Project entries. A name and one sentence — no stack, no status, no case
 * study. This page is a signpost to the work, not a sales page for it.
 */

export type Project = {
  name: string;
  /** One sentence: what it is, in the terms someone using it would recognise. */
  blurb: string;
  /** The one colour this entry owns. */
  accent: string;
  /** Set once there is somewhere public to send people. */
  url?: string;
};

export const projects: Project[] = [
  {
    name: 'Plesica',
    blurb: 'Spaced-repetition flashcards that keep working with the network off.',
    accent: '#3A2FD6',
  },
  {
    name: 'Gymrora',
    blurb: 'A coaching platform where trainers plan the work and athletes run it.',
    accent: '#0E6B52',
  },
];
