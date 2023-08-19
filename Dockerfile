FROM alpine:latest
#RUN apk --update add ca-certificates \
#                     mailcap \
#                     curl \
#                     jq

RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.18/main" > /etc/apk/repositories \
    && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.18/community" >> /etc/apk/repositories

RUN apk update && apk add --no-cache docker

VOLUME /srv
EXPOSE 3000

COPY config/env.json /etc/docker-box-web/env.json

RUN make ...
