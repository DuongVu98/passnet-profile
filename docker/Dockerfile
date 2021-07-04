FROM node:12.13-alpine As builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.13-alpine
WORKDIR /app
ADD ./src/proto /proto
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]