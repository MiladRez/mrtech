# This Dockerfile builds the React client and Flask server together

# Build step #1: build the React front end
FROM node:20-alpine as build-step
WORKDIR /app/client
ENV PATH ./node_modules/.bin:$PATH
COPY ./client/src ./src
COPY ./client/public ./public
COPY ./client .
RUN npm install
RUN npm i -g serve
RUN npm run build
CMD ["serve", "-s", "dist"]

# Build step #2: build the server with the client as static files
FROM python:3.12
WORKDIR /app/server
COPY --from=build-step /app/client/dist ./build

COPY ./server/ .
RUN pip install -r ./requirements.txt
ENV FLASK_ENV production

EXPOSE 3000
CMD ["waitress-serve", "--host=localhost", "--port=3000", "server:app"]