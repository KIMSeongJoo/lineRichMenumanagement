FROM node:lts-alpine3.16

# 変更
RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python3

WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV NODE_OPTIONS --openssl-legacy-provider

RUN yarn install

COPY . .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "dev" ]
