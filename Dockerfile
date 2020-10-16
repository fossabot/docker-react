FROM node:14.7.0-alpine3.11

ARG NODE_ENV=development
ARG REACT_APP_ENV=development
ARG WORKDIR=/opt/react
ARG NODE_MODULES=/opt/node_modules

ENV NODE_ENV=${NODE_ENV}
ENV REACT_APP_ENV=${REACT_APP_ENV}

WORKDIR ${WORKDIR}

COPY . .

RUN apk update \
 && mkdir -p ${NODE_MODULES} \
 && ln -sf ${NODE_MODULES} \
 && npm ci

USER node
EXPOSE 3000
