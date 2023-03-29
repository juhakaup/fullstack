FROM node:19
WORKDIR /usr/src/app
COPY . .
RUN npm ci
CMD ["npm", "run", "start-dev"]