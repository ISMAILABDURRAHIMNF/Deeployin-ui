FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
