FROM php:8.3.4-cli-alpine3.19 AS build

RUN apk update && \
  apk add --no-cache ca-certificates curl jo zip unzip

WORKDIR /usr/local/bin

RUN curl -L -o install-php-extensions https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
  chmod +x install-php-extensions && \
  install-php-extensions ds-1.5.0 intl

RUN curl -L -o phpunit-10.phar https://phar.phpunit.de/phpunit-10.phar && \
  chmod +x phpunit-10.phar

WORKDIR /usr/local/bin/junit-handler/
COPY --from=composer:2.7.2 /usr/bin/composer /usr/local/bin/composer
COPY junit-handler/ .
# We need PHPUnit from junit-handler/ to run test-runner tests in CI / locally
# composer warns about missing a "root version" to resolve dependencies. Fake to stop warning
RUN COMPOSER_ROOT_VERSION=1.0.0 composer install --no-interaction

FROM php:8.3.4-cli-alpine3.19 AS runtime

COPY --from=build /usr/bin/jo /usr/bin/jo
COPY --from=build /usr/local/lib/php/extensions /usr/local/lib/php/extensions
COPY --from=build /usr/local/bin/phpunit-10.phar /opt/test-runner/bin/phpunit-10.phar
COPY --from=build /usr/local/bin/junit-handler /opt/test-runner/junit-handler

# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
RUN apk add --no-cache bash
RUN adduser -Ds /bin/bash appuser

WORKDIR /opt/test-runner
COPY . .

USER appuser

ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
