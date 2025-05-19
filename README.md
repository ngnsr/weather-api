<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## WeatherApi powered by NestJS

### Development guide

#### 1. Common

1.1 Please use NodeJS version >= 18.14.2

1.2 Please setup your IDE to use internal eslint module

1.3 Please setup your IDE to use internal prettier module

1.4 Please install NestJS CLI globally

```bash
$ npm i -g @nestjs/cli
```

1.5 Please clone repo

```bash
git clone https://github.com/ngnsr/weather-api && cd weather-api
```

1.6 Please install dependencies

```bash
$ yarn install
```

#### 2. Weather API app

2.1 Please start [PostgreSQL](https://hub.docker.com/_/postgres) v15 server instance

2.2 Please setup env variables from [.env.example](/.env.example)

2.3 Please run app in development mode

```bash
# watch mode
$ yarn start:dev
```

2.4 Please use Swagger documentation [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

#### 3. TypeORM instructions:

3.1 Please create a new entity in [directory](/src/common/entities)

3.2 Please add a new entity to [import array](/src/common/entities/index.ts)

3.3 Please generate a new migration for this entity

```bash
$ yarn migration:generate ./src/common/migrations/{name}
# example
$ yarn migration:generate ./src/common/migrations/create-users
```

3.4 Please add a new migration to [import array](src/common/migrations/index.ts)

3.5 Additional useful commands

```bash
# create a new empty migration
$ yarn migration:create ./src/common/migrations/{name}

# run all pending migrations to check
$ yarn migration:run

# revert all recently ran migrations
$ yarn migration:revert
```

#### 4. Docker

4.1 Please setup env variables from [.env.example](/.env.example)

4.2 Please run in Docker

```bash
# development
$ docker-compose up --build -V
```

## 📁 Project Structure Overview

This project is built using **NestJS** and is designed for managing weather update subscriptions with email confirmation and notifications.

```
├── config.ts                     # Centralized configuration (env variables, etc.)
├── docker-compose.yml            # Docker setup for local development (PostgreSQL, etc.)
├── Dockerfile                    # Docker configuration for the app itself
├── eslint.config.mjs             # ESLint config for code linting
├── nest-cli.json                 # NestJS CLI configuration
├── package.json                  # Project dependencies and scripts
├── README.md                     # Project documentation
├── tsconfig*.json                # TypeScript compiler settings
├── yarn.lock                     # Dependency lockfile
```

---

## 📦 `shared/`

Shared functionality and cross-cutting concerns.

- **`db/`**

  - `data-sources/` – Common TypeORM configuration.
  - `postgres/` – PostgreSQL-specific configuration.

- **`utils/`**
  - `email/` – Email service logic (sending confirmation and notification emails).
  - `index.ts` – Utility exports.

---

## 📁 `src/` – Main Application Code

### 🔹 `app.module.ts`

Root module that imports all other feature modules.

### 🔹 `main.ts`

Entry point of the NestJS application.

---

### 📂 `common/`

- **`dto/`** – Data Transfer Objects shared across the application.
- **`entities/`** – TypeORM entities like `SubscriptionEntity`.
- **`enums/`** – Shared enumerations, e.g. `SubscriptionFrequency`.
- **`migrations/`** – Database schema migrations.
- **`types/`** – Custom types and interfaces.

---

### 📂 `subscriptions/`

Handles all subscription-related logic.

- **Controller** – Handles subscription endpoints (subscribe, confirm, unsubscribe).
- **Service** – Contains business logic for managing subscriptions.
- **Module** – Declares and wires up this feature in NestJS.

---

### 📂 `notification/`

Responsible for sending email notifications.

- **Service** – Contains the logic for sending weather update and confirmation emails.
- **Module** – Registers the notification service.

---

### 📂 `users/`

Responsible for managing users (currently might just be a stub).

- **Service** – User-related operations.
- **Module** – Declares the users feature.

---

### 📂 `weather/`

Handles weather data retrieval and exposure through an API.

- **Controller** – Defines endpoints to fetch weather information.
- **Service** – Calls external APIs and processes weather data.
- **Module** – Registers the weather service and controller.
