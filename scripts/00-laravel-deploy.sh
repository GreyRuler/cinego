#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

#echo "Migrate..."
#php artisan migrate

echo "Key generate..."
php artisan key:generate --show
