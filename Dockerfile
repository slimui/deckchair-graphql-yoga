FROM node:9.7.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --pure-lockfile --frozen-lockfile

COPY src/ ./src

EXPOSE 80
CMD ["yarn", "start"]