FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db" npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache ffmpeg
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# Provide .env if it exists, but don't fail if it doesn't. 
# Best practice for Dokploy is to use their Env Vars UI.
COPY --from=builder /app/.env* ./ 

EXPOSE 5000
CMD ["npm", "start"]
