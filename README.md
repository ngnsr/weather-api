<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## WeatherApi powered by NestJS

#### 4. TypeORM instructions:

4.1 Please create a new entity in [directory](/src/common/entities)

4.2 Please add a new entity to [import array](/src/common/entities/index.ts)

4.3 Please generate a new migration for this entity

```bash
$ yarn migration:generate ./src/common/migrations/{name}
# example
$ yarn migration:generate ./src/common/migrations/create-users
```

4.4 Please add a new migration to [import array](src/common/migrations/index.ts)

4.5 Additional useful commands

```bash
# create a new empty migration
$ yarn migration:create ./src/common/migrations/{name}

# run all pending migrations to check
$ yarn migration:run

# revert all recently ran migrations
$ yarn migration:revert

```
