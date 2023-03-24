FROM node:19
WORKDIR /usr/src/app

COPY . .
RUN npm ci

# Running tests
ENV CI=true
RUN npm run test

ENV REACT_APP_BACKEND_URL=http://localhost:3003/
CMD ["npm", "start"]