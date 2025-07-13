# ✅ Use Node.js 20 with full OpenSSL and crypto.subtle support
FROM node:20-slim

# Install required system packages for Vite + crypto
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
