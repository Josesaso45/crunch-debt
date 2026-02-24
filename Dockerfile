FROM node:18-slim
WORKDIR /app
COPY package*.json ./
# Instalación forzada debido a conflictos de versiones mencionadas anteriormente
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
