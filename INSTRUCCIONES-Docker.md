# Kit SQA + Docker para Task Tracker CRUD

**Se copia sobre la app original** <https://github.com/vgnaidukollu-lgtm/task-tracker-crud>.
No contiene la app completa. No usar XAMPP al mismo tiempo para esta guia.

## Paso 1: version inicial

Guardar y publicar el codigo original antes de incorporar mejoras para conservar la linea base.

## Paso 2: Docker SIN pruebas (conservar las metricas iniciales)

Copiar solo `compose.yaml`, `.env.example`, `.gitignore`, `docker/`, `server/db.js` y `server/.env.example`.
En raiz crear `.env` copiando `.env.example` y en server crear `.env` copiando `server/.env.example`.
Arrancar `docker compose up -d`, luego `cd server && npm install && npm start`.
En una segunda terminal ejecutar `cd client && npm install && npm run dev`.
Abrir http://localhost:5173 y http://localhost:8081.

## Paso 3: pruebas y pipeline

Copiar todos los demás archivos del kit, **conservando** `server/.env`, `.env` y los datos Docker.
Crear `server/.env.test` copiando `server/.env.test.example`.
Instalar Jest, Supertest, Vitest y dependencias desde la guia completa.
En raiz crear package.json / instalar ESLint y Prettier.
Antes del primer Pull Request con pipeline, configurar en GitHub los secrets `CI_DB_PASSWORD` y `SONAR_TOKEN` y reemplazar las dos claves Sonar.

## Comprobaciones

- `docker compose ps` debe listar mysql y phpmyadmin activos.
- `http://localhost:4000/api/todos` debe devolver `[]` al comenzar.
- `http://localhost:5173` debe mostrar el CRUD.
- `npm test --prefix server` usa **solo** `crud_sqa_test`.
- El pipeline exige los jobs `build`, `test`, `analyze` y `report`.

## No hacer

- No subir `.env` ni `.env.test` a GitHub.
- No usar `docker compose down -v` a menos que se quieran destruir las bases.
- No afirmar que el pipeline paso sin verificar en GitHub.
- No reutilizar un repositorio de terceros sin comprobar sus condiciones de licencia y atribucion.
