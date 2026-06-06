# Базовый образ: LTS на Alpine — маленький и без лишнего.
FROM node:lts-alpine

# Рабочая директория внутри контейнера.
WORKDIR /app

# Сначала только манифесты — чтобы слой с зависимостями кешировался
# и не пересобирался при каждом изменении кода.
COPY package*.json ./

# Установка без выполнения postinstall-скриптов пакетов (главная защита
# от вредоносного кода в supply chain) и без dev-зависимостей.
# Когда появится package-lock.json — замени строку ниже на:
#   RUN npm ci --ignore-scripts --omit=dev
RUN npm install --ignore-scripts --omit=dev

# Теперь копируем исходники.
COPY . .

# Не работаем под root: образ node уже содержит непривилегированного
# пользователя node. Отдаём ему рабочую директорию.
RUN chown -R node:node /app
USER node

# Запуск таймера. Аргументы передаём при docker run, например: 5s, 1m.
ENTRYPOINT ["node", "7-timer-notifications/index.js"]
CMD ["5s"]
