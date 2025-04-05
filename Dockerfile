# ---------------------------------------------
# Etapa 1: Construir la aplicación con Node
# ---------------------------------------------
    FROM node:18-alpine AS build

    # Establecemos el directorio de trabajo
    WORKDIR /app
    
    # Copiamos los archivos de dependencias
    COPY package*.json ./
    
    # Instalamos dependencias
    RUN npm install
    
    # Copiamos el resto del código
    COPY . .
    
    # Construimos la aplicación en modo producción
    RUN npm run build
    
    # ---------------------------------------------
    # Etapa 2: Servir la aplicación con Nginx
    # ---------------------------------------------
    FROM nginx:alpine
    
    # Copiamos la build generada (ajusta la carpeta si tu build se genera en otro directorio, por ejemplo 'build' o 'dist')
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copiamos la configuración personalizada de Nginx
    COPY default.conf /etc/nginx/conf.d/default.conf
    
    # Exponemos el puerto 5173 (el que usará la aplicación)
    EXPOSE 5173
    
    # Inicia Nginx en primer plano
    CMD ["nginx", "-g", "daemon off;"]
    