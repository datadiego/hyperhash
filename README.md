    __                          __               __  
   / /_  __  ______  ___  _____/ /_  ____ ______/ /_ 
  / __ \/ / / / __ \/ _ \/ ___/ __ \/ __ `/ ___/ __ \
 / / / / /_/ / /_/ /  __/ /  / / / / /_/ (__  ) / / /
/_/ /_/\__, / .___/\___/_/  /_/ /_/\__,_/____/_/ /_/ 
      /____/_/                                       

Hyperhash es un juego multijugador de cracking de contraseñas. Los jugadores compiten por romper el hash de una contraseña, quien lo haga primero consigue puntos.

## Tecnologías

- Express
- SQLite
- Nunjucks
- Docker

## Instalación

Puedes lanzar Hyperhash con Docker, para ello ejecuta el siguiente comando:

```bash
docker run -d -p 3000:3000 --name hyperhash datadiego808/hyperhash
```

Alternativamente, clona este repositorio y ejecuta:

```bash
cd hyperhash
npm install
npm run start
```

Deberias tener accesible tu servidor en `http://localhost:3000`.

## TODO

- [X] Autenticación
- [X] Ranking
- [X] Perfil de usuario
- [X] Hashing MD4
- [X] Hashing MD5
- [X] Hashing SHA1
- [X] Hashing SHA256
- [X] Hashing SHA512
- [X] CI

## TODO

- [ ] CD
- [ ] Tests
- [ ] Sesiones de usuarios con Redis
- [ ] Avatar aleatorio ASCII
- [ ] Modo de juego por equipos
- [ ] Modo de un solo jugador
- [ ] Hashing bcrypt
- [ ] Hashing scrypt
- [ ] Hashing argon2
- [ ] Hashing pbkdf2
- [ ] Hashing whirlpool