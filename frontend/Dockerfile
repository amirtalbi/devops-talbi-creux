# Build Stage
FROM node:20 AS build

WORKDIR /usr/src/app

ENV npm_config_optional=false

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production Stage
FROM node:20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4200

CMD ["npm", "start"]