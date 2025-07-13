# Use an official Node.js 20 image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "dev"]
