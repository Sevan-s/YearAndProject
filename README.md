# Comment démarrer le projet

## Server + Web + Database

> /!\ si c'est la première fois il faudra changer l'ip présent dans /Server/communicateDB.js par l'ip donnée par rethinkdb lors du lancement, puis relancer via docker-compose up --build

Tout ce passe sur docker:
- lancer le projet
```sh
docker-compose up
```

- mettre à jour les dockers en cas de modification du code
```sh
docker-compose up --build
```

- suppimer les dockers
```sh
docker-compose down
```
> /!\ supprime la base de donnée

## Mobile

> /!\ si c'est la première fois / que vous avez redémarer votre pc
1- lancer `ifconfig` pour obtenir l'ip inet de wlp...
2- remplacer l'ip dans /Mobile/communicateServer.js par celle obtenu précédement

Action (Tout dois se faire dans le dossier Mobile):
- pour lancer:
```sh
docker-compose down
```