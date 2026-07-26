/**
 * Project entries. A name, one sentence, a link, and one image of the product.
 *
 * The images are laid out alternating — first entry's image on the left, the
 * next on the right. `src/data` order therefore also sets the page rhythm.
 *
 * The image files are *placeholders drawn as real UI*, not AI-generated fake
 * screenshots: swap in a genuine screen capture at the same path and the layout
 * is unchanged.
 */

export type Project = {
  name: string;
  /** One sentence: what it is, in the terms someone using it would recognise. */
  blurb: string;
  /** The one colour this entry owns. */
  accent: string;
  url: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const projects: Project[] = [
  {
    name: 'Plesica',
    blurb: 'Spaced-repetition flashcards that keep working with the network off.',
    accent: '#3A2FD6',
    url: 'https://plesica.com',
    image: {
      src: '/media/plesica.svg',
      alt: 'Plesica — a flashcard under review, with its spaced-repetition queue above it',
      width: 800,
      height: 600,
    },
  },
  {
    name: 'Gymrora',
    blurb: 'A coaching platform where trainers plan the work and athletes run it.',
    accent: '#0E6B52',
    url: 'https://gymrora.com',
    image: {
      src: '/media/gymrora.svg',
      alt: 'Gymrora — a workout session in progress, with logged sets and a rest timer',
      width: 800,
      height: 600,
    },
  },
];
