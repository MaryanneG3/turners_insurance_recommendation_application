# Use the Node.js 20 image as the base
FROM node:20

# this just sets the working directory in the container to /app.
WORKDIR /app

# this copies the package.json and package-lock.json files from the host machine to the container.
# this is done so that the dependencies can be installed in the container.
COPY package*.json ./

# Install dependencies
# this runs the npm install command in the container to install the dependencies.
RUN npm install

# Copy the rest of the application
COPY . .

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the backend port
# 3k cause i used 3k in index.js
EXPOSE 3002

# Start the application - index is in src folder
CMD ["node", "src/index.js"]
