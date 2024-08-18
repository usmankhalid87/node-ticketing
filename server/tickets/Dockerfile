FROM node:alpine

WORKDIR /app
COPY package.json .
ARG NPM_TOKEN
# Use the argument
ENV NPM_TOKEN=$NPM_TOKEN
COPY .npmrc .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]