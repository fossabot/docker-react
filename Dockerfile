FROM FROM node:14.7.0-alpine3.11 as dev

ARG NODE_ENV
ARG REACT_APP_ENV
ARG WORKDIR=/opt/react
ARG NODE_MODULES=/opt/node_modules

ENV NODE_ENV=${NODE_ENV:-development}
ENV REACT_APP_ENV=${REACT_APP_ENV:-development}

WORKDIR ${WORKDIR}

COPY . .

RUN apk update \
 && mkdir -p ${NODE_MODULES} \
 && ln -sf ${NODE_MODULES} \

USER node
EXPOSE 3000
