FROM node:19-alpine3.15 AS builder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --force

COPY . .

RUN npm run build


FROM node:19-alpine3.15

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [  "npm", "run", "start:migrate:prod" ]

