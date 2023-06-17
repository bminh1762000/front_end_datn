FROM node:18.12.0 AS build-stage
WORKDIR /app
COPY . .
RUN yarn install --ignore-scripts
RUN yarn build
RUN ls build
FROM nginx:1.17-alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
