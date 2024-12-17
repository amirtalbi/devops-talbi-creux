# Build Stage
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production Stage
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copier les fichiers statiques générés par Vite dans le dossier nginx
COPY --from=build /usr/src/app/dist .

# Remplacer la configuration par défaut de Nginx si nécessaire
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]