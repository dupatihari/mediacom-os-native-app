#!/bin/bash -e

for var in "${!WPP_TEMPLATE_@}"; do
  printf 'Replacing placeholder %s with %s \n' "$var" "${!var}"
  find /usr/share/nginx/html -type f -exec sed -i "s|\b$var\b|${!var}|g" {} +
done
