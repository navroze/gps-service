FROM node:16.7.0

WORKDIR /usr/src/app

RUN npm install -g ts-node typescript nodemon

COPY . .

RUN npm install

EXPOSE 4040 5550

#Build to project
RUN npm run build

# Run node server
CMD npm run dev
