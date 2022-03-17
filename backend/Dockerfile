FROM node:14.16.0-alpine


WORKDIR /usr/src/app

COPY package*.json ./

RUN export PATH=/usr/bin

RUN npm i

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "node", "./bin/ds-install" ]
