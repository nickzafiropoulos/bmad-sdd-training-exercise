# Zaffr

A minimal todo list app built with the [T3 Stack](https://create.t3.gg/) (Next.js, tRPC, Drizzle, Tailwind).

## Scripts

- **`npm run dev`** — Start the dev server (Next.js).
- **`npm run build`** — Production build.
- **`npm test`** — Run unit and integration tests (Vitest).
- **`npm run test:coverage`** — Run tests with coverage report (output in `./coverage`; aim for ≥70% meaningful coverage).
- **`npm run test:e2e`** — Run E2E tests (Playwright; starts the app automatically).

## Running with Docker

From the **repository root** (not `zaffr/`):

```bash
docker compose up
```

App: http://localhost:3001. Health: http://localhost:3001/api/health. (Port 3001 is used so the container doesn’t clash with a local dev server on 3000.) SQLite data is stored in the `zaffr-data` volume.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
