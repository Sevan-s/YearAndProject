# Comment démarrer le projet

## Server + Web + Database

> /!\ si c'est la première fois il faudra changer l'ip présent dans /Server/communicateDB.js par l'ip donnée par rethinkdb lors du lancement, puis relancer via docker-compose up --build --force-recreate

Tout ce passe sur docker:
- lancer le projet
```sh
docker-compose up
```

- mettre à jour les dockers en cas de modification du code
```sh
docker-compose up --build --force-recreate
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
- pour initialiser le projet:
```sh
npm start
```

- pour lancer:
```sh
expo start
```
Puis suivre les indications données par expo (/!\ il faut le lancer via emulateur, pour que l'application puisse faire les requètes au serveur)