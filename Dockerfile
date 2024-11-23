# Dockerfile

FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk update && apk add \
    python3 py3-pip make g++ \
    postgresql-client \
    bash curl

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD ["sh", "-c", " \
    while ! pg_isready -h postgres_quiz -U quiz; do \
    sleep 1; \
    done; \
    yarn start:dev; \
"]

