FROM node:19 AS build-stage
WORKDIR /usr/src/app

COPY ./todo-frontend .
ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm ci
RUN npm run build

FROM nginx:1.20.1
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html