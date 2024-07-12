FROM node:20.11.1-alpine as base

# ---------------
# Install Dependencies
# ---------------
FROM base as deps

WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci

# ---------------
# Build App
# ---------------
FROM deps as build

WORKDIR /app

# Set env variables
ENV NEXT_TELEMETRY_DISABLED=1

# Build the NextJS application
COPY . .
RUN npm run build

# Remove non production necessary modules
RUN npm prune --production

# ---------------
# Release App
# ---------------
FROM base

WORKDIR /app

# Set env variables
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000 

ENTRYPOINT ["node", "server.js" ]