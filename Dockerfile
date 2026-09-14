# Step 1: Base image
FROM node:18-alpine AS base
WORKDIR /app

# Step 2: Install API Dependencies
COPY api/package*.json ./api/
RUN cd api && npm ci --only=production

# Step 3: Copy source code
COPY api ./api

# Step 4: Environment and Port
EXPOSE 5000
ENV NODE_ENV=production

# Step 5: Start command
CMD ["node", "api/index.js"]
