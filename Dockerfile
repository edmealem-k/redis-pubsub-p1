FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Copy the app
COPY . .

# Default environment 
ENV REDIS_URL=redis://redis:6379

# Let compose set the command, but default to the publisher
CMD ["node", "publisher.js"]
