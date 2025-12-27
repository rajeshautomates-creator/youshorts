# ---------- Builder ----------
FROM node:20-bookworm AS builder

# This Dockerfile is designed to be run from the ROOT of the monorepo
WORKDIR /app

# Ensure we have essential tools
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy package files from backend
COPY backend/package*.json ./
RUN npm install

# Generate Prisma
COPY backend/prisma ./prisma
# Provide a dummy DATABASE_URL for build time
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db?schema=public"
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy backend source code
COPY backend/ .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-bookworm-slim

WORKDIR /app

# Install runtime dependencies
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
