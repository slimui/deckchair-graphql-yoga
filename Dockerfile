FROM node:8.9.4-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --pure-lockfile --frozen-lockfile \
  && yarn cache clean

COPY src/ ./src

EXPOSE 80
CMD ["yarn", "start"]