FROM node:lts-alpine

# Set working dir
WORKDIR /app

# Copy manifests first to leverage Docker layer caching
# Make sure both package.json and package-lock.json are copied
COPY src/vuln-node/package*.json ./

# Install only production deps based on the lockfile
RUN npm ci --omit=dev

# Copy the app source
COPY src/vuln-node/. .

# Default command
CMD ["node", "index.js"]
