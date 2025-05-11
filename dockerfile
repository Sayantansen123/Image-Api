FROM node:18-bookworm-slim AS base

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libgtk-3-0 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libx11-6 \
  libnss3 \
  lsb-release \
  chromium \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY image.js ./

EXPOSE 3000

CMD [ "node","image.js" ]