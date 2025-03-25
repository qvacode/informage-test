Aquí tienes un ejemplo de README.md para el proyecto backend:

---

# Backend - Sistema de Gestión de Sesiones Universitarias

Este proyecto es la parte backend de una aplicación para gestionar sesiones de clases en una universidad. Fue desarrollado utilizando **NestJS** como framework, **Prisma** como ORM para conectarse a una base de datos **PostgreSQL** y cuenta con validaciones mediante **class-validator** y transformaciones con **class-transformer**. La aplicación se encuentra dockerizada para facilitar su despliegue y ejecución.

## Características

- **API RESTful:** Endpoints para gestionar estudiantes, sesiones y asignaciones.
- **Validación y Transformación:** Uso de `class-validator` y `class-transformer` en los DTOs.
- **Relaciones de Datos:** Manejo de relaciones entre estudiantes, sesiones y asignaciones con Prisma.
- **Filtros de Sesiones:** Endpoints para filtrar sesiones por día, semana o mes.
- **Dockerizado:** Configuración con Docker y Docker Compose para facilitar la puesta en marcha del entorno.

## Requisitos

- Node.js v14 o superior (se recomienda v16)
- npm o yarn
- PostgreSQL
- Docker y Docker Compose (opcional, para entorno dockerizado)

## Instalación

### Clonación del Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### Instalación de Dependencias

```bash
npm install
```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración (ajusta según tu entorno):

```env
DATABASE_URL="postgres://user:password@localhost:5432/test_db"
PORT=3000
```

### Configuración de Prisma

Genera el cliente de Prisma y ejecuta la migración inicial:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Ejecución del Proyecto

### Modo Desarrollo

Inicia la aplicación en modo desarrollo:

```bash
npm run start:dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

Consulte la documentación de la API: [http://localhost:3000/api/v1/doc](http://localhost:3000/api/v1/doc).

### Modo Producción

Construye y levanta la aplicación en producción:

```bash
npm run build
npm run start:prod
```

### Uso con Docker

Si prefieres utilizar Docker, asegúrate de tener Docker y Docker Compose instalados. Luego, desde la raíz del proyecto (donde se encuentre el archivo `docker-compose.yml`), ejecuta:

```bash
docker-compose up -d
```

Esto levantará los contenedores para el backend, la base de datos PostgreSQL y el frontend en el puerto 4321.

## Endpoints Principales

- **Estudiantes**
  - `GET /student` - Obtener lista de estudiantes.
  - `POST /student` - Crear un nuevo estudiante.
  - `GET /student:id` - Obtiene un estudiante por id.
  - `PATCH /student:id` - Actualiza uno o varios valores de un estudiante.
  - `DELETE /student:id` - Elimina un estudiante.

- **Sesiones**
  - `GET /sesion` - Obtener lista de sesiones.
  - `GET /sesion/dia/:fecha` - Obtener sesiones de un día específico (formato `YYYY-MM-DD`).
  - `GET /sesion/calendar/YYYY-MM-DD?tipo=week` - Obtener sesiones de una semana.
  - `GET /sesion/calendar/YYYY-MM-DD?tipo=month` - Obtener sesiones de un mes.

- **Asignaciones**
  - `GET /assignment` - Obtener asignaciones (incluyendo datos de estudiante y sesión).
  - `POST /assignment` - Crear una asignación (inscribir un estudiante a una sesión).
  - `GET /assignment/:id` - Lista una asignacion por id.

## Estructura del Proyecto

```
/backend
  ├── src
  │   ├── modules/student
  │   │   ├── dto
  │   │   │   └── create-student.dto.ts
  │   │   ├── student.controller.ts
  │   │   └── student.service.ts
  │   │   └── student.module.ts
  │   ├── ,modules/sesion
  │   │   ├── dto
  │   │   │   └── create-sesion.dto.ts
  │   │   ├── sesion.controller.ts
  │   │   └── sesion.service.ts
  │   │   └── sesion.module.ts
  │   ├── modeules/assignment
  │   │   ├── dto
  │   │   │   └── create-assignment.dto.ts
  │   │   ├── assignment.controller.ts
  │   │   └── assignment.service.ts
  │   │   └── assignment.module.ts
  │   └── app.module.ts
  │   └── main.ts
  ├── prisma
  │   └── schema.prisma
  ├── .env
  ├── package.json
  ├── Dockerfile
  └── README.md
```