FROM node:22-alpine

ENV EXECUTOR_FOLDER 'app'

WORKDIR /$EXECUTOR_FOLDER
COPY . /$EXECUTOR_FOLDER
RUN npm install

ENTRYPOINT [ "npm", "run", "start:prod" ]

EXPOSE 5001
