# ---------- STAGE 1: Build frontend ----------
FROM node:18 AS builder

WORKDIR /app

# Copy client + server + data
COPY client ./client
COPY server ./server
COPY data ./data

# Install frontend dependencies & build UI
WORKDIR /app/client
RUN npm install
RUN npm run build


# ---------- STAGE 2: Production Server ----------
FROM node:18

WORKDIR /app

# Copy backend code
COPY server ./server

# Copy built frontend
COPY --from=builder /app/client/dist ./server/public

# COPY DATABASE INTO FINAL IMAGE (IMPORTANT!)
COPY --from=builder /app/data ./data

# Install backend dependencies
WORKDIR /app/server
RUN npm install --production

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
