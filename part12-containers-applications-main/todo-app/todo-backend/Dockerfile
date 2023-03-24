FROM node:19
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
CMD DEBUG=todo-backend:* 
USER node
CMD npm start