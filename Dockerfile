FROM node:18

# Set the working directory
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV COOKIE_SECRET=changethis
# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

#run utils/get_dics.sh
RUN wget -O utils/dict.txt https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]