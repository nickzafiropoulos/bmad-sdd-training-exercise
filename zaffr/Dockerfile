# Multi-stage Dockerfile for Zaffr (Next.js, tRPC, SQLite)
# Non-root user, health check, minimal production image

# -----------------------------------------------------------------------------
# Stage 1: Dependencies
# -----------------------------------------------------------------------------
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 2: Build
# -----------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip env validation at build time; DATABASE_URL set at runtime
ENV SKIP_ENV_VALIDATION=1
ENV NODE_ENV=production
ENV DATABASE_URL="file:/tmp/zaffr-build.sqlite"

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Runner (non-root, production)
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app (standalone server + static assets)
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Copy app source and deps for drizzle-kit push at startup (schema + env)
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/drizzle.config.ts ./
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/src ./src

# Data directory for SQLite (mounted volume in compose)
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data /app/.next /app/src

USER nextjs

EXPOSE 3000

# Health check: GET /api/health must return 200 (Alpine has wget)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:3000/api/health 2>/dev/null | grep -q '"status":"ok"' || exit 1

# Push schema to DB on first run (DATABASE_URL from env), then start Next.js
CMD ["sh", "-c", "npx drizzle-kit push 2>/dev/null || true && node server.js"]
