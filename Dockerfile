# First build
FROM node:16 as build

ARG NPM_TOKEN

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    yarn install && \
    rm -f .npmrc

COPY . .

# Second build
FROM node:16

WORKDIR /app

COPY --from=build /app /app

RUN yarn build

CMD yarn start
