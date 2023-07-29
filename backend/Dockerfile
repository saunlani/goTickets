FROM node:18-alpine
RUN npm install nodemon -g
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm", "run", "start"]