FROM node:16

WORKDIR /user/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5555
CMD [ "npm", "run", "production" ]