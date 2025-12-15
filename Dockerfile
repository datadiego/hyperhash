FROM node:18

# Instala dependencias necesarias para compilar better-sqlite3
RUN apt-get update && apt-get install -y wget python3 make g++

# Set the working directory
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV COOKIE_SECRET=changethis

# Copia los archivos package.json y package-lock.json primero para aprovechar la cache de Docker
COPY package*.json ./

# Instala dependencias limpiando la cache de npm y forzando la reconstrucción de nativos
RUN npm cache clean --force && npm install --build-from-source=better-sqlite3

# Copia el resto del código de la aplicación
COPY . .

# Descarga el diccionario
RUN wget -O utils/dict.txt https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/10k-most-common.txt

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]