FROM node:alpine

WORKDIR /app
COPY package.json .

COPY .npmrc .

ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > ~/.npmrc
RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]