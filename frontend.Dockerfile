# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Ensure we have the package files
COPY frontend/package*.json ./
RUN npm install

# Copy everything else
COPY frontend/ .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Set defaults
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=4040

# Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Debugging: List files to ensure server.js is there
RUN ls -la

EXPOSE 4040

# Start the server
CMD ["node", "server.js"]
