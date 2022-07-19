FROM node:alpine3.15
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install

CMD ["node","src/index.js"]
