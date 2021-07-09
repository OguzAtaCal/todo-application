FROM node:14
WORKDIR /app
COPY ./ /app

RUN npm install


CMD sleep 3; npx knex migrate:latest --knexfile database/knexfile.js; sleep 3; npx knex seed:run --knexfile database/knexfile.js; sleep 3; node server.js

EXPOSE 3030