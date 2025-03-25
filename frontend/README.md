### 📄 `README.md`

# 🗓️ Calendario de Eventos - React App

Aplicación de calendario interactivo construida con **React + Vite + TypeScript**, utilizando **shadcn/ui**, **TailwindCSS**, **TanStack Query**, y dockerizada para despliegue.

---

## 🚀 Funcionalidades

- Vista de calendario semanal o mensual
- Selección de fechas con eventos asociados
- Cards de eventos con scroll horizontal y estilo responsive
- Modal con detalles al hacer clic en un evento
- Carga de datos mediante TanStack Query
- Soporte para variables de entorno y despliegue vía Docker

---

## 🧱 Stack Técnico

- [React + Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [TanStack Query](https://tanstack.com/query)
- [date-fns](https://date-fns.org/)
- [Docker + Nginx](https://www.docker.com/)

---

## 📦 Instalación y ejecución local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/react-calendario-eventos.git
cd react-calendario-eventos

# Instalar dependencias
npm install

# Ejecutar la app
npm run dev
```

---

## 🔧 Variables de Entorno

Crear un archivo `.env` en la raíz con la siguiente variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🐳 Docker

### Crear imagen y levantar el contenedor:

```bash
docker build -t react-calendar-app .
docker run -d -p 3000:80 react-calendar-app
```

La app estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Scripts útiles

```bash
npm run dev       # Dev server
npm run build     # Build de producción
npm run preview   # Previsualizar build
```

---

## 📂 Estructura de carpetas

```
src/
├── api/             # Lógica de llamadas a la "API"
├── components/      # Componentes reutilizables
├── App.tsx
└── main.tsx
```