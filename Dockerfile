# Building the app
FROM node:18 as builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

# Sending to production
FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/.env .env

USER node

CMD ["npm", "start"]