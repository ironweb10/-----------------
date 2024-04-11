# Usa la imagen oficial de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos de tu aplicación al directorio de trabajo del contenedor
COPY . .

# Exponer el puerto en el que tu aplicación Node.js está escuchando
EXPOSE 3000

# Comando para ejecutar tu aplicación cuando el contenedor se inicie
CMD ["node", "index.js"]
