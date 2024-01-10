# Use an official Node runtime as a parent image
FROM node:16 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Start a new stage from the Node image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Your app binds to port 3001 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3001

# Define the command to run your app
CMD [ "node", "dist/server.js" ]
