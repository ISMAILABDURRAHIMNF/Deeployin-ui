FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package.json.lock ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
