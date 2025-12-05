# ---------- STAGE 1: Build frontend ----------
FROM node:18-bullseye AS builder

WORKDIR /app

COPY client ./client
COPY server ./server
COPY data ./data

WORKDIR /app/client
RUN npm install
RUN npm run build

# ---------- STAGE 2: Production Server ----------
FROM node:18-bullseye

WORKDIR /app

COPY server ./server
COPY --from=builder /app/client/dist ./server/public
COPY --from=builder /app/data ./data

WORKDIR /app/server
RUN npm install --production

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
