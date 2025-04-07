# Usa uma imagem leve de servidor web
FROM nginx:alpine

# Remove config padrão e adiciona o nosso
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do front para o diretório servido pelo nginx
COPY . /usr/share/nginx/html

EXPOSE 80
