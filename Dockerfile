# ---------- STAGE 1: Build frontend ----------
FROM node:18 AS builder

WORKDIR /app

# Copy client code
COPY client ./client
COPY server ./server
COPY data ./data

# Copy your real DB from repo to container
COPY data/hirehero.db /app/data/hirehero.db

# Install frontend dependencies & build UI
WORKDIR /app/client
RUN npm install
RUN npm run build

# ---------- STAGE 2: Production Server ----------
FROM node:18

WORKDIR /app

# Copy backend code
COPY server ./server

# Copy frontend build into backend public folder
COPY --from=builder /app/client/dist ./server/public

# Install backend dependencies
WORKDIR /app/server
RUN npm install --production

# Railway exposes PORT automatically
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
