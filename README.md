# Comment démarrer le projet

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
