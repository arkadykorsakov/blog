# Node.js Блог

## Описание

Это проект блога, разработанный на Node.js с использованием Express.js. Приложение поддерживает функционал для отображения постов, аутентификации пользователей и управления контентом через маршруты.

## Основные функции

- Главная страница с аутентификацией пользователя.
- Управление постами блога.
- Аутентификация и авторизация.

## Требования

- Node.js >= 16.x
- npm >= 8.x
- База данных (MySQL, PostgreSQL или MongoDB).

## Установка

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-репозиторий/blog.git
   ```

2. Перейдите в директорию проекта:
   ```bash
   cd blog
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

4. Создайте файл окружения и настройте его:
   ```bash
   cp .env.example .env
   ```
   Отредактируйте `.env` файл, указав настройки базы данных и другие параметры.

5. Запустите сервер разработки:
   ```bash
   npm start
   ```

## Маршруты

### Главная страница

- **GET** `/` - Главная страница блога.

### Посты

- **GET** `/posts` - Список всех постов.
- **GET** `/posts/:id` - Просмотр конкретного поста.
- **POST** `/posts` - Создание нового поста (требуется авторизация).
- **PATCH** `/posts/:id` - Обновление поста (требуется авторизация).
- **DELETE** `/posts/:id` - Удаление поста (требуется авторизация).

### Аутентификация

- **POST** `/auth/register` - Регистрация нового пользователя.
- **POST** `/auth/login` - Вход пользователя.
- **POST** `/auth/logout` - Выход пользователя.

## Тестирование

Для запуска тестов используйте команду:
```bash
npm test
