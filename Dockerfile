# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the app for production
RUN npm run build

# Expose the app on port 3000
EXPOSE 3000

# Start the app with Vite using port 3000
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]