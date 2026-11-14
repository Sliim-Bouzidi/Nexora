# Multi-stage build: dependencies and build tools stay in the "build" stage;
# the final image only contains Next.js's standalone output (server + the
# node_modules it actually imports), which keeps the image small and fast to
# pull on the test VM.

# ---- Build stage ----
FROM node:20-bookworm-slim AS build

WORKDIR /app

# Copied first so the npm ci layer is cached unless dependencies change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

RUN npm run build

# ---- Runtime stage ----
FROM node:20-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# Listen on all interfaces (Kubernetes sets HOSTNAME to the pod name otherwise).
ENV HOSTNAME=0.0.0.0

# --chown sets ownership while copying; a separate "RUN chown -R" would
# duplicate every file into a new layer.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
