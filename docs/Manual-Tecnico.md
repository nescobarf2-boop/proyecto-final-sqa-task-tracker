# Manual Técnico del Sistema y Pipeline SQA

**Proyecto:** Pipeline CI/CD con Aseguramiento de Calidad Integrado  
**Aplicación:** Sistema de gestión de tareas CRUD  
**Fecha:** 4 de noviembre de 2026

## 1. Objetivo

Describir la arquitectura, instalación, ejecución, pruebas y mantenimiento de una aplicación CRUD a la que se incorporó un pipeline de aseguramiento de calidad.

Este documento permite comprender cómo se relacionan las herramientas del proyecto y qué procedimientos seguir para ejecutar el sistema y diagnosticar posibles problemas.

## 2. Arquitectura de la aplicación

El sistema se organiza en tres componentes:

- **Frontend:** React con Vite, encargado de presentar la interfaz y permitir la interacción del usuario.
- **Backend:** Node.js y Express, encargados de recibir las peticiones HTTP, validar información y ejecutar operaciones CRUD.
- **Base de datos:** MySQL, utilizada para almacenar las tareas.

Flujo de funcionamiento:

Usuario → React → API Express → MySQL

La comunicación entre React y Express se realiza mediante solicitudes HTTP. El backend utiliza MySQL para consultar y modificar los registros.

## 3. Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Repositorio | Git y GitHub |
| Frontend | React, Vite y Axios |
| Backend | Node.js y Express |
| Base de datos | MySQL 8 |
| Entorno local | Docker Compose |
| Administración de base de datos | phpMyAdmin |
| Pruebas backend | Jest y Supertest |
| Pruebas frontend | Vitest y React Testing Library |
| Análisis estático | ESLint y Prettier |
| Control de calidad | SonarQube Cloud |
| Integración continua | GitHub Actions |

## 4. Requisitos para instalación

Para ejecutar el sistema localmente se recomienda contar con:

- Node.js 22.
- Git.
- Docker Desktop.
- Visual Studio Code.
- Un navegador web.
- Acceso a internet para instalar dependencias.

## 5. Estructura general del proyecto

- `.github/workflows/ci.yml`: configuración del pipeline.
- `client/`: interfaz de React y pruebas del frontend.
- `server/`: API Express, validaciones y pruebas del backend.
- `docker/init/`: scripts de inicialización de MySQL.
- `docs/`: documentación del aseguramiento de calidad.
- `compose.yaml`: servicios Docker.
- `sonar-project.properties`: configuración de SonarQube.
- `README.md`: descripción y guía principal del proyecto.

## 6. Instalación local

### 6.1. Obtener el código

Clonar el repositorio mediante Git:

`git clone https://github.com/nescobarf2-boop/proyecto-final-sqa-task-tracker.git`

Ingresar a la carpeta:

`cd proyecto-final-sqa-task-tracker`

### 6.2. Instalar dependencias

Desde la carpeta principal, ejecutar:

`npm ci`

`npm ci --prefix server`

`npm ci --prefix client`

### 6.3. Configurar variables de entorno

Crear los archivos locales a partir de los ejemplos:

- Copiar `.env.example` a `.env` en la raíz.
- Copiar `server/.env.example` a `server/.env`.
- Copiar `server/.env.test.example` a `server/.env.test`.

Los archivos deben contener credenciales locales propias y no deben publicarse en GitHub.

La configuración utilizada por Docker expone MySQL en el puerto local `3308` y phpMyAdmin en el puerto `8081`.

La aplicación utiliza la base `crud_app`, mientras que las pruebas utilizan `crud_sqa_test`.

**Importante:** la contraseña de `sqa_user` configurada en los archivos del servidor debe coincidir con la contraseña de aplicación establecida en el archivo `.env` de la raíz.

### 6.4. Iniciar Docker

Desde la carpeta principal, ejecutar:

`docker compose up -d`

Para comprobar los servicios:

`docker compose ps`

MySQL debe encontrarse en funcionamiento. phpMyAdmin puede consultarse desde:

http://localhost:8081

El servicio de Docker ejecuta el script de inicialización al crear por primera vez el volumen de datos. Si el volumen ya existe, dicho script no vuelve a ejecutarse automáticamente.

### 6.5. Iniciar el backend

En una terminal, ejecutar:

`npm start --prefix server`

El backend utiliza normalmente el puerto `4000`, salvo que se cambie mediante la variable `PORT`.

### 6.6. Iniciar el frontend

Abrir una segunda terminal y ejecutar:

`npm run dev --prefix client`

Abrir en el navegador la dirección local que indique Vite.

## 7. Bases de datos

El proyecto utiliza dos bases independientes:

**crud_app:** almacena los datos utilizados por la aplicación local.

**crud_sqa_test:** almacena datos utilizados durante las pruebas automatizadas.

La separación es necesaria para evitar que las pruebas alteren los registros utilizados por el usuario.

Las pruebas de integración preparan la tabla requerida y eliminan registros de la base de pruebas antes de ejecutar cada caso.

## 8. Ejecución de pruebas

### 8.1. Pruebas backend

Desde la carpeta principal:

`npm test --prefix server`

Este comando ejecuta Jest, genera cobertura y valida el mínimo de líneas configurado.

### 8.2. Pruebas frontend

Desde la carpeta principal:

`npm run test:coverage --prefix client`

Este comando ejecuta Vitest y genera la cobertura correspondiente a React.

### 8.3. Verificaciones adicionales

Análisis de ESLint:

`npm run lint`

Verificación de formato:

`npm run format:check`

Compilación:

`npm run build --prefix client`

## 9. Arquitectura del pipeline CI/CD

El pipeline se define en `.github/workflows/ci.yml`.

Se ejecuta ante Pull Requests dirigidos a `main` y cambios enviados a `main`.

Las etapas son:

**build:** instala dependencias, compila React y ejecuta las verificaciones de ESLint y Prettier.

**test:** utiliza un servicio temporal de MySQL, ejecuta Jest y Vitest, y genera los reportes de cobertura.

**analyze:** descarga los reportes de cobertura y ejecuta SonarQube Cloud.

**report:** presenta un resumen y devuelve un estado fallido cuando alguna etapa requerida no se aprobó.

Los trabajos `build` y `test` pueden ejecutarse en paralelo. `analyze` depende de ambos y `report` consolida los resultados.

## 10. Quality Gate

SonarQube analiza el código nuevo para verificar el cumplimiento de las condiciones de calidad configuradas.

En la ejecución final documentada se obtuvo:

- Quality Gate: Passed.
- Cobertura de código nuevo: 88.12%.
- Duplicación de código nuevo: 0.0%.
- Nuevos problemas: 0.

El archivo `sonar-project.properties` contiene la configuración necesaria para importar la cobertura de ambas partes del sistema.

La opción `sonar.qualitygate.wait=true` permite que el trabajo de análisis espere el resultado del Quality Gate y pueda fallar si se rechaza.

## 11. Seguridad

El sistema utiliza archivos de entorno para separar las credenciales del código.

En GitHub Actions se emplean secretos para almacenar los valores utilizados por los servicios de pruebas y por SonarQube.

No deben incluirse en commits:

- Contraseñas reales.
- Tokens de SonarQube.
- Archivos `.env` con información privada.
- Respaldos de bases de datos que contengan información sensible.

## 12. Solución de problemas comunes

| Problema | Qué revisar |
|---|---|
| MySQL no inicia | Docker Desktop, `docker compose ps` y registros del contenedor |
| Error de conexión a MySQL | Puerto 3308, usuario, contraseña y base configurada |
| Pruebas backend fallan | Servicio MySQL y variables de `server/.env.test` |
| El frontend no carga | Que Vite esté ejecutándose y el navegador utilice la URL correcta |
| Error de comunicación con la API | Que Express esté iniciado y que la URL de Axios sea correcta |
| ESLint muestra advertencias | Revisar las reglas y el uso de importaciones JSX |
| Prettier falla | Ejecutar la corrección de formato y volver a validar |
| Sonar no muestra cobertura | Confirmar la existencia de ambos archivos LCOV y su carga en Actions |
| Quality Gate rechazado | Revisar las condiciones incumplidas en Sonar |
| Pipeline en rojo | Abrir GitHub Actions y localizar el paso específico con error |

## 13. Mantenimiento

Cuando se modifique una funcionalidad, se deben actualizar o agregar las pruebas correspondientes.

También se recomienda revisar periódicamente las dependencias, los mensajes del análisis estático, las métricas del dashboard y el estado de las verificaciones obligatorias.

Las actualizaciones de dependencias deben realizarse de forma controlada y acompañarse de nuevas ejecuciones de las pruebas.

## 14. Conclusión

La arquitectura implementada permite mantener separadas las responsabilidades de la aplicación y del aseguramiento de calidad.

Docker facilita la reproducción del entorno local, mientras que GitHub Actions y SonarQube permiten comprobar automáticamente el estado del código.

El beneficio principal es contar con un procedimiento técnico que pueda repetirse cada vez que se realice una modificación, reduciendo el riesgo de integrar cambios que no cumplen los criterios establecidos.