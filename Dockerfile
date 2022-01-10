FROM node:latest
COPY . /product-overview-api
RUN make /product-overview-api
WORKDIR /product-overview-api
RUN npm install

EXPOSE 3001
CMD ["node", "server/server.js"]