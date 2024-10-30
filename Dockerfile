FROM node:18-alpine
ENV NODE_ENV development
WORKDIR /react-app
COPY ./package*.json /react-app/
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm","start"]