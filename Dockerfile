# Stage 1: Build the React application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for the React app
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy the rest of the React app and build it
COPY client/ ./client/
RUN cd client && npm run build

# Stage 2: Setup the Express server and copy the built React files
FROM node:18

# Set the working directory for the Express server
WORKDIR /app

# Copy the package.json and install server dependencies
COPY package*.json ./
RUN npm install

# Install Playwright dependencies
RUN npx playwright install
RUN npx playwright install-deps  

# Copy the Express server source code
COPY src/ ./src

# Copy built React files from the previous stage
COPY --from=build /app/client/build /app/public

# Define build arguments
ARG MONGODB_URI
ARG PORT

# Set environment variables from build arguments
ENV MONGODB_URI=$MONGODB_URI
ENV PORT=$PORT

# Expose the port that the server will run on
EXPOSE 5000

# Start the Express server
CMD ["node", "src/server.js"]
