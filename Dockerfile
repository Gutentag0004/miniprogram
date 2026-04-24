# Use Node.js 18 Alpine as the base image for a small footprint
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install system dependencies if needed (e.g., for some npm packages)
RUN apk add --no-cache git

# Install miniprogram-ci globally for CI/CD automation
RUN npm install -g miniprogram-ci

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Default command (can be overridden in CI/CD pipeline)
# For example, to run linting: docker run <image> npm run lint
CMD ["npm", "run", "check"]
