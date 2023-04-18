FROM node:18.12.0 as build-stage
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "build"]
# FROM nginx
# WORKDIR /app
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=shop-app /app/build/ .
# EXPOSE 80
# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
