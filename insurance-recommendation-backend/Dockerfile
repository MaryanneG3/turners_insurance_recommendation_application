# Use the Node.js 20 image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the backend port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
