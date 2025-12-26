FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
# Provide a valid URL for schema validation during generation
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db" npx prisma generate
COPY . .
RUN npm run build

FROM node:20
WORKDIR /app
RUN apt-get update && apt-get install -y ffmpeg openssl ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000
CMD ["npm", "start"]
