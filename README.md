```
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
