FROM node:22.14 AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:22.14 AS production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]
