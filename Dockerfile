FROM node:9.4.0

COPY . /projects
WORKDIR /projects
RUN cd /projects  && yarn global add pm2 && yarn install

EXPOSE 3000

CMD ["node", "app.js"]
