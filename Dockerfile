FROM node: 18 alpine AS development

ENV NODE_ENV development

WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY . .

CMD ["npm","start"]