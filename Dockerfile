FROM node:18.12.0 as build-stage
WORKDIR /app
COPY . .
RUN yarn install
#CMD ["yarn", "build"]
RUN yarn build
RUN ls build
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
