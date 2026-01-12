FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=optional --legacy-peer-deps

COPY . .
RUN npx ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
