# ---------- Builder ----------
FROM node:20-bookworm AS builder

WORKDIR /app

# Ensure we have essential tools
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

# Copy prisma schema early for generation
COPY prisma ./prisma
# Prisma generate needs the env var exists, providing a dummy one for build isolation
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db?schema=public"
RUN npx prisma generate

COPY . .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-bookworm-slim

WORKDIR /app

# Install runtime dependencies (ffmpeg for video, openssl for prisma)
RUN apt-get update && \
    apt-get install -y ffmpeg ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000
CMD ["npm", "start"]
