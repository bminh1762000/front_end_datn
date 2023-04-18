FROM node:18.12.0
WORKDIR /app

COPY . .

RUN yarn install

CMD ["npm", "start"]
# FROM nginx
# WORKDIR /app
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=shop-app /app/build/ .
# EXPOSE 80
