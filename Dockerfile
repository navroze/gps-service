FROM node:16-alpine

WORKDIR /usr/src/app

RUN npm install -g ts-node typescript nodemon 

RUN apk update && apk add protobuf protobuf-dev

COPY . .

RUN npm install

RUN yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/proto/generated src/proto/*.proto

# Run node server
CMD npm run dev
