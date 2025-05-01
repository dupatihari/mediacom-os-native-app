FROM nginx:stable-alpine

# Installing additional packages
RUN apk update && \
    apk add bash

# Adding nginx configuration files
COPY docker-specs/nginx.conf /etc/nginx/nginx.conf
COPY docker-specs/default.conf /etc/nginx/templates/default.conf.template
COPY docker-specs/proxy.conf /etc/nginx/proxy.conf

# Adding static files
COPY dist/ /usr/share/nginx/html/app/

COPY docker-specs/replace.sh /docker-entrypoint.d/

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
