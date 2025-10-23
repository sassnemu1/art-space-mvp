# Базовый образ Node.js
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка Next.js
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
