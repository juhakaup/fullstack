FROM node:19 AS build-stage
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
ENV BACKEND_URL=http://localhost:8080/api
RUN npm ci
RUN npm run build

FROM nginx:1.20.1
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html