FROM node:19
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV PORT=3003
CMD ["npm", "run", "dev"]