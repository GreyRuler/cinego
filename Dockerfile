FROM node:20.8.0-alpine3.17 AS pre

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM richarvey/nginx-php-fpm:latest

COPY --from=pre /app .

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
 install-php-extensions imagick

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

#ENV DB_CONNECTION=pgsql
#ENV DB_HOST=127.0.0.1
#ENV DB_PORT=5432
#ENV DB_DATABASE=cinego
#ENV DB_USERNAME=postgres
#ENV DB_PASSWORD=qwerty

CMD ["/start.sh"]
