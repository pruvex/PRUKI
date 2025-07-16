# Stage 1: Build the Electron app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm install --production=false

COPY . .
RUN npm run build
RUN npm run build:main
RUN npm run build:preload

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-main ./dist-main
COPY --from=builder /app/main ./main
COPY --from=builder /app/preload.js ./preload.js
COPY --from=builder /app/package.json ./package.json

RUN npm install --production

# Install xvfb for running Electron in headless environments
RUN apk add --no-cache xvfb

ENV DISPLAY=:99

CMD ["xvfb-run", "npm", "start"]