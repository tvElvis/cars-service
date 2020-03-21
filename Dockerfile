FROM node:alpine as dist
WORKDIR /tmp/

COPY package.json  package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


# RUN mkdir -p /src
# RUN mkdir -p /src/db
# RUN mkdir -p /src/db/migrations
# COPY src/db/ src/db/

FROM node:alpine as node_modules
WORKDIR /tmp/
COPY package.json package-lock.json ./
RUN npm install

FROM node:alpine
RUN apk add --no-cache bash
RUN mkdir -p /app
WORKDIR /app
COPY --from=node_modules /tmp/package.json ./
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/ormconfig.json ./
COPY --from=dist /tmp/.env ./
COPY --from=dist /tmp/dist ./dist
COPY ./wait-for-it.sh ./
