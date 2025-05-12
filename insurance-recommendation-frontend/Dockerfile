# Build stage

# this basically means that we are using the Node.js 20 image as the base image for our Dockerfile.
FROM node:20-slim AS build

# this sets the working directory in the container to /app.
# same as back but multiple stages
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



# Production stage
FROM nginx:stable-alpine


# since i used vite to create my react app the build files are in the dist folder not build folder
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# the reason for mulitple stages is to reduce the size of the image
# this is done by using a smaller image for the production stage
# 2 stages: build and production
