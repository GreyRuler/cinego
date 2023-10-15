FROM tangramor/nginx-php8-fpm:php8.2.2_node19.6.0 AS pre

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM richarvey/nginx-php-fpm:latest

COPY --from=pre /app .

RUN apk update && apk add --no-cache postgresql-dev && docker-php-ext-install pdo pdo_pgsql php-imagick imagick
RUN pecl install imagick; \
        docker-php-ext-enable imagick


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
