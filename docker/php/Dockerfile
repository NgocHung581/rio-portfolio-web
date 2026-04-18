FROM php:8.4-fpm-bullseye

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /etc/apt/
RUN touch /etc/apt/apt.conf
RUN echo 'Acquire::http::proxy "'${HTTP_PROXY}'";' > /etc/apt/apt.conf
RUN echo 'Acquire::https::proxy "'${HTTP_PROXY}'";' >> /etc/apt/apt.conf
RUN pear config-set http_proxy ${HTTP_PROXY}
RUN echo ${HTTP_PROXY}
ENV TZ Asia/Ho_Chi_Minh
RUN echo "${TZ}" > /etc/timezone \
   && dpkg-reconfigure -f noninteractive tzdata

RUN apt-get clean
RUN apt-get update
RUN apt-get upgrade -y --allow-unauthenticated

RUN apt-get update && apt-get install --no-install-recommends -y \
    cmake \
    curl \
    git \
    less \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmemcached-dev \
    libpng-dev  \
    libzip-dev \
    memcached \
    default-mysql-client \
    unzip \
    vim \
    wget \
    zlib1g-dev \
  && apt-get clean
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install gd
RUN docker-php-ext-install opcache
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install zip
RUN apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl
RUN pecl channel-update pecl.php.net
RUN apt-get install -y libmemcached-dev \
    && pecl install memcached \
    && docker-php-ext-enable memcached

# Setting memcache.
RUN pecl install memcache

# Setting xdebug.
RUN pecl install xdebug-3.4.1

# Setting composer.
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1

ENV APACHE_DOCUMENT_ROOT /var/www
ENV APP_USER_NAME rio_collective

#Setting user and access permission.
RUN useradd -m ${APP_USER_NAME}
RUN usermod -u 1000 -o ${APP_USER_NAME}

RUN mkdir -p ${APACHE_DOCUMENT_ROOT}/storage/framework \
  && mkdir -p ${APACHE_DOCUMENT_ROOT}/storage/framework/cache \
  && mkdir -p ${APACHE_DOCUMENT_ROOT}/storage/framework/sessions \
  && mkdir -p ${APACHE_DOCUMENT_ROOT}/storage/framework/testing \
  && mkdir -p ${APACHE_DOCUMENT_ROOT}/storage/framework/views \
  && chmod -R 0777 ${APACHE_DOCUMENT_ROOT} \
  && chown -R ${APP_USER_NAME}:${APP_USER_NAME} ${APACHE_DOCUMENT_ROOT}

WORKDIR ${APACHE_DOCUMENT_ROOT}
USER rio_collective
