# HYPERHASH

Hyperhash es un juego de romper contraseñas para multiples jugadores. El objetivo es adivinar la contraseña de un hash antes que los demás.

## Instalación

Necesitarás instalar `docker` y `certbot` para poder ejecutar el juego.

```bash
apt update
apt install certbot
certbot certonly --standalone -d hyperhash.com
```