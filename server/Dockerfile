FROM node:18

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]


# docker build -t api .
# docker run --name api-container --rm -p 3001:3001 api