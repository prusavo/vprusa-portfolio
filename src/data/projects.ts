/**
 * Project content.
 *
 * Every project renders the same two devices: a *system figure* (the one
 * architectural idea, as a labelled flow) and a *spec table*. The figure is the
 * page's signature — it's what a senior engineer actually wants to show, in
 * place of a screenshot. Both projects therefore share one diagram grammar:
 * a vertical chain of nodes, each edge carrying the thing that moves along it.
 */

export type FlowStep = {
  /** Node label — short, uppercase in render. */
  node: string;
  /** What the node is. One clause. */
  note: string;
  /** Marks the node the whole architecture turns on. Exactly one per figure. */
  pivot?: boolean;
  /** Label on the arrow *leaving* this node. Omit on the last step. */
  edge?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** The distinguishing fact, used as the plate's label instead of a number. */
  kicker: string;
  tagline: string;
  body: string[];
  /** CSS custom-property value — the one colour this project owns. */
  accent: string;
  figure: { caption: string; steps: FlowStep[] };
  spec: { k: string; v: string }[];
};

export const projects: Project[] = [
  {
    slug: 'plesica',
    name: 'Plesica',
    kicker: 'Offline-first',
    tagline: 'Flashcards that keep working with the network off.',
    accent: '#3A2FD6',
    body: [
      'Plesica organises flashcards into nestable folders and teaches them with a Leitner spaced-repetition engine. The interesting part is not the scheduling — it is where the truth lives. Every read is assembled from a local replica in the browser, and every write applies optimistically, so the entire product works with no connection at all. The server is a sync and auth layer, never on the critical path of a read.',
      'That constraint decides everything downstream. Study order is deterministic with no randomness, so a queue survives being closed and reopened mid-session. Repetition state is keyed by deck, card and direction together, which lets two people sharing one account keep separate progress. Card sides are a constrained JSON document rather than HTML, so rich text and embedded media stay safe to sync and re-render anywhere.',
    ],
    figure: {
      caption: 'Reads never leave the device; the server reconciles afterwards.',
      steps: [
        {
          node: 'PWA client',
          note: 'installable, fully usable offline',
          edge: 'reads — never blocked on a request',
        },
        {
          node: 'Local replica',
          note: 'source of truth for everything the user sees',
          pivot: true,
          edge: 'optimistic writes, queued',
        },
        {
          node: 'Sync + auth',
          note: 'Express 5, hexagonal ports & adapters',
          edge: 'reconciles across devices',
        },
        {
          node: 'Drizzle → PostgreSQL',
          note: 'durable record',
        },
      ],
    },
    spec: [
      { k: 'Role', v: 'Sole engineer — product, backend, frontend, infra' },
      { k: 'Client', v: 'React · Vite · Tailwind v4 · TanStack Query, PWA' },
      { k: 'Server', v: 'Express 5, hexagonal, Drizzle ORM, PostgreSQL, Zod' },
      { k: 'Auth', v: 'Session cookies, mandatory verification, reset, Google OAuth' },
      { k: 'Scheduling', v: 'Leitner boxes 0–8, deterministic order, per direction' },
      { k: 'Quality', v: 'Strict TS, lint-enforced hexagonal boundaries, Vitest + Playwright' },
      { k: 'Status', v: 'In development' },
    ],
  },
  {
    slug: 'gymrora',
    name: 'Gymrora',
    kicker: 'Two-sided',
    tagline: 'One account, two modes: coach and athlete.',
    accent: '#0E6B52',
    body: [
      'Gymrora is a coaching platform where a single account switches between trainer and trainee, and the interface is gated by what you are allowed to do rather than by which app you installed. Trainers build exercise libraries and plan templates; trainees run them in a full-screen workout player with a rest timer, resume, and personal-record tracking.',
      'The architecture turns on the snapshot. Starting a workout copies the plan into an independent session, so a trainer editing the template tomorrow cannot rewrite what someone already did today — and the session keeps running when the signal drops in a basement gym. The same instinct shows up in onboarding: a coach can create an offline card for a client who has no account yet, and that shadow record is later claimed and merged into a real one.',
    ],
    figure: {
      caption: 'A workout is a copy, not a live view of the plan it came from.',
      steps: [
        {
          node: 'Plan template',
          note: 'trainer authors exercises, sets, progressions',
          edge: 'snapshot — an immutable copy',
        },
        {
          node: 'Live session',
          note: 'independent of the template it came from',
          pivot: true,
          edge: 'logged sets, PR / 1RM',
        },
        {
          node: 'Trainee record',
          note: 'check-ins, body metrics, progress photos',
          edge: 'WebSocket + web push',
        },
        {
          node: 'Trainer feed',
          note: '360° client card',
        },
      ],
    },
    spec: [
      { k: 'Role', v: 'Sole engineer — platform, apps, infra, monitoring' },
      { k: 'Server', v: 'Fastify, Drizzle ORM, PostgreSQL 17, Zod, Pino' },
      { k: 'Apps', v: 'React 19 · React Router v7; iOS & Android via Capacitor 8' },
      { k: 'Realtime', v: 'WebSocket chat, web push, scheduled jobs' },
      { k: 'Roles', v: 'Trainee, trainer, sales CMS, admin review' },
      { k: 'Storage', v: 'MinIO (S3-compatible), sharp image pipeline' },
      { k: 'Ops', v: 'Self-building Docker stack, Grafana · Loki · Prometheus' },
      { k: 'Status', v: 'MVP, preparing go-live' },
    ],
  },
];
