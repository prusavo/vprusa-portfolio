export const site = {
  name: 'Vojtěch Prusa',
  role: 'Full-stack engineer',
  domain: 'vprusa.com',
  email: 'prusavo@gmail.com',
  instagram: {
    handle: '@vojtapru__',
    url: 'https://www.instagram.com/vojtapru__/',
  },
  /** <title> — carries the name/role that the display headline deliberately doesn't. */
  title: 'Vojtěch Prusa — full-stack engineer',
  description:
    'Full-stack engineer building complete products in strict TypeScript — offline-first clients, hexagonal backends, and the Docker infrastructure they run on. Projects: Plesica and Gymrora.',
} as const;

/** Hero ledger: what he builds with, and what he runs it on. Two real columns. */
export const ledger = [
  {
    label: 'Builds with',
    items: [
      'TypeScript, maximum strictness',
      'React 19 · Vite · TanStack Query',
      'Fastify · Express 5, hexagonal',
      'Drizzle ORM · PostgreSQL',
      'Zod · Vitest · Playwright',
    ],
  },
  {
    label: 'Runs it on',
    items: [
      'Docker Compose, one stack per service',
      'WireGuard-only ingress',
      'Grafana · Loki · Prometheus',
      'MinIO, S3-compatible storage',
      'GitHub Actions CI',
    ],
  },
] as const;
