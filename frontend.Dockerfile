# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Check for package-lock.json and copy it
COPY frontend/package*.json ./
RUN npm install

# Copy source
COPY frontend/ .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=4040

# Standalone build creates a 'standalone' folder which is what we need
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 4040
CMD ["node", "server.js"]
