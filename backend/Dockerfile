FROM node:20-slim AS builder
# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Use a valid schema URL for build-time generation
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db"
RUN npx prisma generate
RUN npm run build

FROM node:20-slim
WORKDIR /app
# Install runtime dependencies
RUN apt-get update && apt-get install -y ffmpeg openssl && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000
CMD ["npm", "start"]
