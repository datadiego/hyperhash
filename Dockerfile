FROM node:18

# Set the working directory
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV COOKIE_SECRET=changethis
# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]