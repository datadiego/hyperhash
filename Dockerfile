FROM node:18

RUN apt-get update && apt-get install -y wget
# Set the working directory
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV COOKIE_SECRET=changethis
# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

#run utils/get_dics.sh
RUN wget -O utils/dict.txt https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/10k-most-common.txt

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]