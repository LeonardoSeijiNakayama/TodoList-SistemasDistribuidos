# Usa imagem oficial do Node.js
FROM node:18

# Define diretório de trabalho no container
WORKDIR /app

# Copia os arquivos para o container
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
