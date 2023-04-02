FROM node:16

COPY package.json .
COPY tsconfig.json .

COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]