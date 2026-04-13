# BMAD training — Zaffr todo app

This repository is a **BMAD Method** training exercise: product planning workflows, artifacts, and a working reference implementation of **Zaffr**, a small todo list application.

**Application code** lives in [`zaffr/`](./zaffr/). Planning outputs, BMAD framework files, and process notes are elsewhere in the tree (for example `_bmad-output/`, `docs/task-progress-documentation/`).

## Zaffr (the app)

Zaffr is a todo list built with the [T3 Stack](https://create.t3.gg/): **Next.js** (App Router), **tRPC**, **Drizzle ORM**, **SQLite** (via libSQL), **Tailwind CSS**, and **TypeScript**. It includes Vitest and Playwright tests.

### Local development

From the **`zaffr/`** directory:

```bash
cd zaffr
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Adjust `DATABASE_URL` in `.env` if you change where SQLite stores data.

### Useful scripts (`zaffr/`)

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Next.js with Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm test` | Vitest (unit / integration) |
| `npm run test:coverage` | Tests with coverage report |
| `npm run test:e2e` | Playwright E2E |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:clear-todos` | Clear all todos (script) |

More detail: [`zaffr/README.md`](./zaffr/README.md).

### Docker

From the **repository root**:

```bash
docker compose up --build
```

The app is exposed on [http://localhost:3000](http://localhost:3000). SQLite data is persisted in the `zaffr-data` Docker volume. Health check: `/api/health`.

### Deploying to Vercel

#### A. Configure the Vercel project (one-time)

These tell Vercel **where** the Next.js app lives and **how** to build it.

1. Open your project on [vercel.com](https://vercel.com) → **Settings** → **Build and Deployment** (sometimes under **General**).
2. Set **Root Directory** to **`zaffr`** (the folder that contains `package.json` and `next.config.js`).
3. Set **Framework Preset** to **Next.js**, not **Other**.  
   - **Why:** “Other” deploys a static site. This app needs the Next.js runtime; otherwise you get **`404 NOT_FOUND`**.  
   - The repo also has [`zaffr/vercel.json`](./zaffr/vercel.json) with `"framework": "nextjs"` to reinforce that.
4. Leave **Output Directory** **unoverridden** (default). Do not point it at `public` or `.` unless you have a special setup.

#### B. Why you need a hosted database

Locally, Zaffr often uses **`DATABASE_URL="file:./db.sqlite"`**. That means “SQLite on my computer’s disk.”

**Vercel does not give you a persistent disk** for that file in production. So you must use a **hosted** SQLite-compatible database. These steps use **[Turso](https://turso.tech/)** (libSQL). You will get:

- A **database URL** (starts with `libsql://` — this becomes `DATABASE_URL` on Vercel).
- An **API token** (a secret string — this becomes `DATABASE_AUTH_TOKEN` on Vercel).

Keep both secret; never commit them to git.

#### C. Install the Turso CLI and sign in

1. Install the CLI using the [official Turso CLI install guide](https://docs.turso.tech/cli/introduction) (Homebrew on macOS, or the script/curl method they document).
2. In a terminal, run:

   ```bash
   turso auth login
   ```

3. Complete the browser login when prompted. You need a Turso account (free tier is enough to try this).

#### D. Create the database and copy URL + token

Pick a **database name** (example: `zaffr-prod`). Use the **same name** everywhere below instead of `zaffr-prod` if you choose something else.

1. **Create the database**

   ```bash
   turso db create zaffr-prod
   ```

2. **Get the connection URL** (the `libsql://…` value)

   ```bash
   turso db show zaffr-prod
   ```

   In the output, find the **URL** line. It looks like `libsql://zaffr-prod-yourorg.turso.io`.  
   **Copy that entire URL** and keep it somewhere safe (notes app, password manager). This string is your **`DATABASE_URL`**.

3. **Create an auth token** (the secret the app uses to talk to Turso)

   ```bash
   turso db tokens create zaffr-prod
   ```

   The CLI prints a long token string. **Copy it once** — you often cannot see it again. This string is your **`DATABASE_AUTH_TOKEN`**.

#### E. Add environment variables in Vercel

1. On Vercel, open the **same project** → **Settings** → **Environment Variables**.
2. Add **two** variables:

   | Name | Value | Notes |
   |------|--------|--------|
   | `DATABASE_URL` | The `libsql://…` URL from step D.2 | No quotes needed in the Vercel UI. |
   | `DATABASE_AUTH_TOKEN` | The token from step D.3 | Treat like a password. |

3. For each variable, choose **Environments**:
   - Enable at least **Production** (required for your live site).
   - Enable **Preview** too if you want preview deployments to work with todos (optional but convenient).
4. Save each variable.

**Important:** Changing env vars does **not** update already-built deployments by itself.

#### F. Redeploy

1. Go to **Deployments**, open the latest deployment, use **⋯** (or **Redeploy**), and redeploy **with existing Build Cache** cleared if you want a clean build (optional).
2. Or push a new commit to your connected branch — that triggers a new deployment that picks up the new env vars.

Wait until the deployment shows **Ready**.

#### G. Create tables on Turso (once per database)

Your Turso database starts **empty**. The app expects tables such as `zaffr_todo`. You apply the schema **from your laptop** (not inside Vercel’s UI) using Drizzle’s **push** command.

1. Open a terminal on your machine.
2. Go to the app folder:

   ```bash
   cd zaffr
   ```

3. Run **one** of the following (same values as on Vercel):

   **Option 1 — inline (good for a one-off):**

   ```bash
   DATABASE_URL="paste-libsql-url-here" DATABASE_AUTH_TOKEN="paste-token-here" npm run db:push
   ```

   **Option 2 — `.env` file (if you already use Turso locally):**  
   Put `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in `zaffr/.env`, then:

   ```bash
   npm run db:push
   ```

4. If the command succeeds, the remote database now has the tables Zaffr needs.

#### H. Check the live site

Open your Vercel URL, refresh the todo page, and try adding a todo. If something still fails, confirm: env vars are set for **Production**, you **redeployed** after adding them, and **`db:push`** completed without errors.

## Repository layout (high level)

| Path | Contents |
|------|----------|
| `zaffr/` | Next.js application |
| `_bmad/` | BMAD framework assets |
| `_bmad-output/` | Generated planning and implementation artifacts |
| `docs/` | Task progress and training documentation |
| `docker-compose.yml` | Container setup for Zaffr |

## Contributing / learning

- Application README: [`zaffr/README.md`](./zaffr/README.md)
- T3 Stack docs: [create.t3.gg](https://create.t3.gg/)
