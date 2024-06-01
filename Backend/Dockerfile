# Use Node.js as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all other files
COPY . .

# Copy the wait script into the image
COPY wait-for-neo4j.sh /wait-for-neo4j.sh

# Build React app
# RUN npm run build

# Expose port
EXPOSE 4000

CMD ["./wait-for-neo4j.sh", "npm", "start"]