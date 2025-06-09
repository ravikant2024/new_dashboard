# Use Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy source code
COPY . .

# Expose dev server port (adjust based on Vite or React)
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]
