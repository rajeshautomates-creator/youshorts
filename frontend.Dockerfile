# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./
RUN npm install

# Copy source
COPY frontend/ .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=4040

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 4040
CMD ["npm", "start"]
