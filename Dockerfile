FROM nginx:alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY index.html /usr/share/nginx/html/index.html
COPY memos.css /usr/share/nginx/html/memos.css
COPY memos.js /usr/share/nginx/html/memos.js
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY service-worker.js /usr/share/nginx/html/service-worker.js
COPY icon-192.png /usr/share/nginx/html/icon-192.png
COPY icon-512.png /usr/share/nginx/html/icon-512.png

EXPOSE 8080
