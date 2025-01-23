# Usa una imagen base oficial de Python
FROM python:3.13-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de requirements.txt al directorio de trabajo
COPY requirements.txt .

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get clean

# Copia el resto del código de la aplicación
COPY . .

# Ejecuta el comando de Django para recolectar archivos estáticos
RUN python manage.py collectstatic --noinput

# Expone el puerto que Gunicorn usará para tu aplicación Django
EXPOSE 8080

# Configura el comando de inicio de Gunicorn
CMD ["gunicorn", "Core.wsgi:application", "--bind", "0.0.0.0:8080"]
