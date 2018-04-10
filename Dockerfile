FROM node:9

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh && \
    apt-get update && \
    apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ && \
    apt-get install -y fonts-ipaexfont
RUN npm install express-generator -g && \
    npm install -g nodemon && \
    npm install -g gulp && \
    npm install canvas
RUN apt-get install -y imagemagick

COPY ./fonts /usr/share/fonts/
RUN fc-cache -fv
USER node

EXPOSE 3000

ENTRYPOINT ["/sbin/entrypoint.sh"]
