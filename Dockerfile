FROM node:13.2-slim
LABEL authors="zubar"

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY package*.json ./
RUN npm install
RUN npm i esm
# Для использования в продакшне
# RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]