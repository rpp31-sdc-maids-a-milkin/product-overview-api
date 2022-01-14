FROM node
COPY . /sdc
WORKDIR /sdc
RUN npm install

EXPOSE 3001
CMD ["node", "server/server.js"]