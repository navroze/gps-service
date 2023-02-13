# Contents

- [Global Requisites](#global-requisites)
- [Sample Dot Env](#sample-dot-env)
- [Install, Configure & Run](#install-configure--run)
- [Testing the App](#testing-the-app)
- [Postman Collection](#postman-collection)
- [How to Insert a GPS record](#how-to-insert-a-gps-record)
- [Application Features](#application-features)
- [Future Implementation](#future-implementations)
- [How to Scale](#how-to-scale)
- [App Structure](#app-structure)

# Gloabl Requisites

- Install [Node.js 16.0.0+](http://nodejs.org)
- Install [Docker](https://docs.docker.com/get-docker/)
- Install [DockerCompose](https://docker-docs.netlify.app/compose/install/)
- Install [Mongo](https://www.mongodb.com/docs/manual/administration/install-community/)
- Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- Install [Nodemon](https://www.npmjs.com/package/nodemon)

# Sample Dot Env

Create a `.env` in the _root_ directory not under the src directory. If running on local no need to create
`.env` file just follow the steps [here](#install-configure--run)

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

# Install Configure & Run

Below mentioned are the steps to install & run your application locally. Make sure global requisites are installed from [here](#global-requisites).

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

> As we are using grpc we have a proto file in the protofolder under the src directory. In order to compile and convert the proto file into typescript we can run the command `npm run proto:gen`.Make sure executable rights are given to the .sh file by running `chmod 755 proto-gen.sh`.

## With Docker

> Create a .env file in the _root_ directory and not in src directory. Use `MONGOOSE_URL_DEV=mongodb://mongo:27017/gps` in the .env file for mongodb to start properly. Here `localhost` is replaced with `mongo` for docker-compose to work.

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

# Testing the app

> The app needs to be tested locally. Complete the setup [here](#install-configure--run) before running the command below.

Unit test and integration have been implemented in the application. Once your app is setup run the below command to run all the unit and integration test. The command will also generate a code coverage.

`npm run test`

# Postman collection

All the REST API routes are present in the postman collection. Import the collection usint the below link.

```
https://api.postman.com/collections/25813756-7c4139bc-4262-4d10-a814-fa4ce1d7b9b7?access_key=PMAT-01GS4PNKDKRSC26835B8QYA0FP
```

# How to Insert a GPS record

Since the app uses authentication we first have to create a user, login and then use a access token to create a record in the database. The following steps can be use for the creating a record.

## Step 1

### Register a user through the API

To register a new user through the API, send a `POST` request to `localhost:8080/api/register` with the following parameters:

### Request Body

The request body should be in `application/json` format with the following key-value pairs:

- `email`: The email address of the user being registered.
- `password`: The password for the user being registered.

_Example_:

```
curl --location --request POST 'localhost:8080/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "nav12@gmail.com",
    "password": "pass@1234"
}'
```

## Step 2

### Login to the API

To log in to the API, send a `POST` request to `localhost:8080/api/login` with the following parameters:

### Request Body

The request body should be in `application/json` format with the following key-value pairs:

- `email`: The email address of the user trying to log in.
- `password`: The password for the user trying to log in.

Example:

```
curl --location --request POST 'localhost:8080/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "nav@gmail.com",
    "password": "pass@1234"
}'
```

## Step 3

On receiving the response from Step 2 copy and paste the token as an authrization for creating a gps record in the database.

### Record GPS location through the API

To record a GPS location for a user through the API, send a `POST` request to `localhost:8080/api/gps-record` with the following parameters:

### Request Headers

- `Authorization`: A JSON Web Token (JWT) representing the user making the request.
- `Content-Type`: The format of the request body, in this case `application/json`.

### Request Body

The request body should be in `application/json` format with the following key-value pairs:

- `latitude`: The latitude of the GPS location.
- `longitude`: The longitude of the GPS location.
- `email`: The email address of the user being recorded.

Example:

```
curl --location --request POST 'localhost:8080/api/gps-record' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4ZTk5YTkzMzUyNjI2YjkyNTA5MjUiLCJuYW1lIjoibmF2QGdtYWlsLmNvbSIsImlhdCI6MTY3NjIwODU4OCwiZXhwIjoxNjc2NDY3Nzg4fQ.hJXKCgRJIGt3xMQunj3cqtnlYdtC7UIuiDO-_wTvJ70' \
--header 'Content-Type: application/json' \
--data-raw '{
    "latitude": "90",
    "longitude": "-180",
    "email": "nav@gmail.com"
}'
```

# Application features

1. Authentication and user management done using JWT.
2. Winston library for logging errors. The logs can be found in the root folder.
3. API logging using morgan
4. Unit Testing and Integration done testing using mocha and chai.
5. Code coverage using Istanbul.
6. Build and containerization using Docker and Docker Compose.
7. Code standardization using eslint.
8. Compilation of proto file in typescript using grpcs library.
9. Custom error Handling done via ts-results library.
10. Data management done using mongo.

# Future Implementations.

1. Implement swagger docs to expose api routes.
2. Implement a JWT authentication feature to pass token from grpc client to server as metadata.
3. Do performance testing on the API's using Apache Jmeter.
4. Use pm2 process manager for scaling application on prod.
5. Create a separate file for logging only errors and API's.

# How to Scale

Currently the API gateway and grpc server is tightly coupled in the same service. The idea is to separate the API gateway and grpcServer. The api gateway can be a standalone service that performs the following three main responsibilites

1. Authentication
2. Calling the grpc server.
3. Routing Gps Record request

Since it is a standalone service it can be scaled independently. Instead of building an express app server for carrying out the above responsibilities we can utilize Googles API [Gateway](https://cloud.google.com/api-gateway) for making gRPC calls, authentication and routing. Maintenance is reduced and we only have to worry about the grpc service.

### Docker and Kubernetes

Docker and Kubernetes can be used together to scale web applications by creating and managing multiple instances of the same application. This provides the following benefits:

Horizontal scaling: Docker and Kubernetes allow you to easily add more instances of your application to handle increased traffic. This is known as horizontal scaling and helps ensure that your application is able to handle large amounts of traffic.

Load balancing: Kubernetes can automatically balance the load between multiple instances of your application, ensuring that each instance is used efficiently and that no single instance becomes a bottleneck.

High availability: By running multiple instances of your application, Docker and Kubernetes make it possible to ensure that your application remains available even if one or more instances fail.

Automated deployment and management: Docker and Kubernetes provide a set of tools that make it easy to deploy and manage multiple instances of your application. This includes automated scaling, updates, and rollbacks.

To scale a web application using Docker and Kubernetes, you first need to create a Docker image of your application. This image can then be deployed to a Kubernetes cluster, where multiple instances of the application can be created and managed.

Kubernetes can also be used to automate the scaling of your application. For example, you can configure Kubernetes to automatically add more instances of your application when traffic increases, and remove instances when traffic decreases.

Overall, Docker and Kubernetes provide a powerful and flexible platform for scaling web applications, making it easier to ensure that your application can handle large amounts of traffic and remain available at all times.

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
