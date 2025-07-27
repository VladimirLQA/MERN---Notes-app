FROM node:22-alpine

ENV EXECUTOR_FOLDER 'app'

WORKDIR /$EXECUTOR_FOLDER
COPY . /$EXECUTOR_FOLDER
RUN npm install && npm run build

ENTRYPOINT [ "npm", "run", "start" ]

EXPOSE 3000