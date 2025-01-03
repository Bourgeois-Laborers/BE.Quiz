# Development stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

CMD ["yarn", "run", "start:dev"]