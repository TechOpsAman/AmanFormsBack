FROM node:14.8-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm install && npm run build

FROM node:14.8-alpine AS prod
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm run install:prod
ENTRYPOINT [ "node", "/app/dist/index.js" ]
EXPOSE 3000