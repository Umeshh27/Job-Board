FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install curl for healthcheck
RUN apk --no-cache add curl

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
