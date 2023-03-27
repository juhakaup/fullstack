FROM node:19
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
RUN npm install
ENV PORT=3003
CMD ["npm", "start"]