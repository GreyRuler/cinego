## О CineGO

Этот проект представляет собой веб-приложение для бронирования онлайн билетов в кинотеатр и информационную систему для администрирования залов, сеансов и билетов.

[Демонстрация](https://cinego.onrender.com)

## Установка

1. Клонируйте репозиторий: `git clone https://github.com/GreyRuler/cinego.git`
2. Перейдите в каталог проекта: `cd cinego`
3. Установите необходимые зависимости:
```
composer install
npm install
```
4. Настройте файл окружения:

```
Создайте файл `.env` из `.env.example` и настройте базу данных и другие параметры.
```
5. Выполните миграции для создания базы данных: `php artisan migrate`
6. Запустите приложение: `php artisan serve`

После выполнения этих шагов, вы можете открыть приложение в браузере по адресу `http://localhost:8000`.

## Добавление учетной записи администратора

Чтобы добавить учетную запись администратора, вы можете воспользоваться сидером. Сидер - это специальный механизм в Laravel, который позволяет заполнять базу данных начальными данными. В данном случае, мы будем использовать сидер для создания учетной записи администратора.

1. Откройте терминал и перейдите в корневой каталог проекта.
2. Запустите следующую команду для запуска сидера: `php artisan create:admin`

Эта команда добавит учетную запись администратора в базу данных.

3. Теперь вы можете войти в административную панель, используя следующие учетные данные:
- Логин: admin@admin.ru
- Пароль: admin

## Использование

### Администратор

Администратор может:
- Создавать/редактировать/удалять залы и их параметры.
- Создавать/редактировать/удалять список фильмов.
- Настроить цены на билеты.
- Создавать или редактировать расписание сеансов.

### Гость

Гости могут:
- Просматривать расписание сеансов.
- Просматривать список фильмов.
- Выбирать места в кинозале.
- Бронировать билеты на конкретные сеансы.

## Технические особенности

- PHP версия: 8.1
  - Необходимые расширения
    - php_imagick
    - pdo_pgsql
- Фреймворк: Laravel 10.10
- База данных: PostgreSQL
- Фронтенд: React
