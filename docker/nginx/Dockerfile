FROM nginx:1.25-bullseye

RUN mkdir -p /etc/apt/
RUN touch /etc/apt/apt.conf
RUN echo 'Acquire::http::proxy "'${HTTP_PROXY}'";' > /etc/apt/apt.conf
RUN echo 'Acquire::https::proxy "'${HTTP_PROXY}'";' >> /etc/apt/apt.conf

RUN apt-get clean \
    && apt-get update \
    && apt-get upgrade -y --allow-unauthenticated \
    && apt-get install -y openssl ssl-cert \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ARG PHP_UPSTREAM_CONTAINER=php-fpm
ARG PHP_UPSTREAM_PORT=9000
RUN echo "upstream php-upstream { server ${PHP_UPSTREAM_CONTAINER}:${PHP_UPSTREAM_PORT}; }" > /etc/nginx/conf.d/upstream.conf

RUN mkdir /etc/nginx/ssl
RUN openssl genrsa -out "/etc/nginx/ssl/default.key" 2048
RUN openssl req -new -key "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.csr" -subj "/CN=default/O=default/C=UK"
RUN openssl x509 -req -days 365 -in "/etc/nginx/ssl/default.csr" -signkey "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.crt"
