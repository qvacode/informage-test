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

### Modo Producción

Construye y levanta la aplicación en producción:

```bash
npm run build
npm run start:prod
```

### Uso con Docker

Si prefieres utilizar Docker, asegúrate de tener Docker y Docker Compose instalados. Luego, desde la raíz del proyecto (donde se encuentre el archivo `docker-compose.yml`), ejecuta:

```bash
docker-compose up --build
```

Esto levantará los contenedores para el backend y la base de datos PostgreSQL.

## Endpoints Principales

- **Estudiantes**
  - `GET /estudiantes` - Obtener lista de estudiantes.
  - `POST /estudiantes` - Crear un nuevo estudiante.

- **Sesiones**
  - `GET /sesiones` - Obtener lista de sesiones.
  - `GET /sesiones/dia/:fecha` - Obtener sesiones de un día específico (formato `YYYY-MM-DD`).
  - `GET /sesiones/calendar?tipo=week&fecha=YYYY-MM-DD` - Obtener sesiones de una semana.
  - `GET /sesiones/calendar?tipo=month&fecha=YYYY-MM-DD` - Obtener sesiones de un mes.

- **Asignaciones**
  - `GET /asignaciones` - Obtener asignaciones (incluyendo datos de estudiante y sesión).
  - `POST /asignaciones` - Crear una asignación (inscribir un estudiante a una sesión).

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