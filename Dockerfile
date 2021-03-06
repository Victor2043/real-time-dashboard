FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/real-time-dashboard /usr/share/nginx/html

EXPOSE 80

RUN chmod 777 /etc/nginx/nginx.conf