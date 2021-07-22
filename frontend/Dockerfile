FROM node:14.15.1-alpine as build

RUN mkdir /home/node/hrambedminton-sk-frontend/ && chown -R node:node /home/node/hrambedminton-sk-frontend
WORKDIR /home/node/hrambedminton-sk-frontend
COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM nginx:stable-alpine

COPY --from=build /home/node/hrambedminton-sk-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
