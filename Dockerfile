# Development stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

CMD ["yarn", "run", "start:dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --chown=node:node . .

RUN yarn run build

CMD ["yarn", "run", "start:prod"]