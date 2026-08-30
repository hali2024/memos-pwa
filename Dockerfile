FROM nginx:alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY service-worker.js /usr/share/nginx/html/service-worker.js

EXPOSE 8080
