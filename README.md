# Contents

-   [Global Requisites](#global-requisites)
-   [Install, Configure & Run](#install-configure--run)
-   [Sample Dot Env](#sample-dot-env)
-   [Postman Collection](#list-of-routes)
-   [App Structure](#app-structure)

# Prerequisites

-   Install [Node.js 16.17.0+](http://nodejs.org)
-   Install [Docker](https://docs.docker.com/get-docker/)
-   Install [DockerCompose](https://docker-docs.netlify.app/compose/install/)
-   Install [Mongo](https://www.mongodb.com/docs/manual/administration/install-community/)
-   Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
-   Install [Nodemon](https://www.npmjs.com/package/nodemon)

# Sample Dot Env

Create a `.env` in the _root_ directory not under the src directory.

```bash
MONGOOSE_URL_DEV=mongodb://localhost:27017/gps
MONGOOSE_URL_TEST=mongodb://localhost:27017/gps_test
JWT_EXPIRES_IN=3
APP_URL='0.0.0.0:4040'
PORT=4040
APP_NAME=gps_rpc_service
PROTO_FILE='./proto/gps.proto'
EXPRESS_SERVER=8080
JWT_SECRET=fuKkk0kHN4fPxVnjqrN1
```

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone git@github.com:navroze/gps-service.git

# Goto the cloned project folder.
cd gps-service

# Install NPM dependencies.
npm install

# Run the app
npm run dev
```

## With Docker

> Create a .env file in the _root_ directory and not in src directory. Use `MONGOOSE_URL_DEV=mongodb://mongo:27017/gps` and `MONGOOSE_URL_TEST=mongodb://mongo:27017/gps_test` in the .env file for mongodb to start properly. Here `localhost` is replaced with `mongo`for docker-compose to work.

```bash
# Note: It is assumed here that you have Docker running in the background.
# Clone the repo.
git clone git@github.com:navroze/gps-service.git

# Goto the cloned project folder.
cd gps-service

# Run the app in docker as a foreground process
sudo docker-compose up --build

# Run the app in docker as a background process
sudo docker-compose up -d
```

# App Structure

```bash
gps-service
├─ .dockerignore
├─ .eslintrc.json
├─ .git
├─ .gitignore
├─ Dockerfile
├─ docker-compose.yaml
├─ package-lock.json
├─ package.json
├─ proto-gen.sh
├─ src
│  ├─ client.ts
│  ├─ config
│  │  └─ config.ts
│  ├─ handlers
│  │  ├─ createGpsRecord.ts
│  │  ├─ gpsRecords.ts
│  │  └─ user.ts
│  ├─ index.ts
│  ├─ middleware
│  │  ├─ auth.ts
│  │  └─ request-middleware.ts
│  ├─ models
│  │  ├─ gps.ts
│  │  └─ user.ts
│  ├─ proto
│  │  ├─ generated
│  │  │  ├─ gps
│  │  │  │  ├─ GpsCoordinates.ts
│  │  │  │  ├─ GpsResponse.ts
│  │  │  │  └─ GpsService.ts
│  │  │  └─ gps.ts
│  │  └─ gps.proto
│  ├─ routes
│  │  └─ Api.ts
│  ├─ server.ts
│  ├─ services
│  │  ├─ gps.ts
│  │  └─ user.ts
│  ├─ setup
│  │  ├─ Database.ts
│  │  ├─ ExpressServer.ts
│  │  └─ Log.ts
│  ├─ test
│  │  ├─ integration
│  │  │  ├─ gps.api.spec.ts
│  │  │  ├─ integration.spec.ts
│  │  │  └─ user.api.spec.ts
│  │  └─ unit-test
│  │     └─ gpsService.spec.ts
│  ├─ types
│  │  └─ types.ts
│  └─ utils
│     └─ error.ts
└─ tsconfig.json

```
