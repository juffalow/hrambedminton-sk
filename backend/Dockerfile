FROM node:14.15.1-alpine AS build

USER node
RUN mkdir /home/node/hrambedminton-sk-backend/ && chown -R node:node /home/node/hrambedminton-sk-backend
WORKDIR /home/node/hrambedminton-sk-backend

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:14.15.1-alpine

USER node
EXPOSE 3010

RUN mkdir /home/node/hrambedminton-sk-backend/ && chown -R node:node /home/node/hrambedminton-sk-backend
WORKDIR /home/node/hrambedminton-sk-backend

COPY --chown=node:node --from=build /home/node/hrambedminton-sk-backend/dist ./dist
COPY --chown=node:node --from=build /home/node/hrambedminton-sk-backend/package.json /home/node/hrambedminton-sk-backend/yarn.lock ./
RUN yarn install --frozen-lockfile --production

CMD [ "node", "dist/index.js" ]
