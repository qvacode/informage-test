# Proyecto Full-Stack - Despliegue con Docker

Este repositorio contiene el proyecto completo que incluye el backend (NestJS) y el frontend (React) de la aplicación, además de la base de datos PostgreSQL. La aplicación se ha dockerizado para facilitar el despliegue y asegurar un entorno consistente en desarrollo, testing y producción.

## Requisitos Previos

- [Docker](https://www.docker.com/get-started) instalado en tu máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

## Estructura del Proyecto

```
/ (raíz del repositorio)
│
├── backend
│   ├── src/                  # Código fuente del backend (NestJS)
│   ├── prisma/               # Esquema y migraciones de Prisma
│   ├── .env                  # Variables de entorno para el backend
│   ├── Dockerfile            # Dockerfile del backend
│   └── ...
│
├── frontend
│   ├── src/                  # Código fuente del frontend (React/Next.js)
│   ├── public/               # Recursos públicos
│   ├── .env                  # Variables de entorno para el frontend (si aplica)
│   ├── Dockerfile            # Dockerfile del frontend
│   └── ...
│
└── docker-compose.yml        # Orquesta los contenedores (backend, frontend, db)
```

## Configuración de Variables de Entorno

Cada servicio cuenta con su propio archivo `.env`. Asegúrate de configurar correctamente las variables necesarias, por ejemplo:

### Backend (.env)
```env
DATABASE_URL=postgres://user:password@db:5432/test_db
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Archivo Docker Compose

El archivo `docker-compose.yml` orquesta los siguientes servicios:
- **db:** Contenedor de PostgreSQL.
- **backend:** Contenedor del API construido con NestJS.
- **frontend:** Contenedor de la aplicación web (React).

## Pasos para Levantar el Proyecto

1. **Clonar el Repositorio**
   ```bash
   git clone <git@github.com:qvacode/informage-test.git>
   cd <informage-test>
   ```

2. **Configurar Variables de Entorno**
   
   Revisa y, si es necesario, ajusta los archivos `.env` en las carpetas `backend` y `frontend`.

3. **Construir y Levantar los Contenedores**
   
   Desde la raíz del proyecto, ejecuta:
   ```bash
   docker-compose up --build
   ```
   Esto iniciará todos los servicios (base de datos, backend y frontend). La aplicación estará disponible en:
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: [http://localhost:4321](http://localhost:4321)

4. **Verificar el Funcionamiento**
   
   - Puedes revisar los logs de cada contenedor con:
     ```bash
     docker-compose logs -f backend
     docker-compose logs -f frontend
     ```
   - Utiliza herramientas como Postman o tu navegador para interactuar con la API y la aplicación web.

## Comandos Útiles

- **Detener los contenedores:**
  ```bash
  docker-compose down
  ```
- **Reconstruir la imagen sin usar cache:**
  ```bash
  docker-compose build --no-cache
  ```