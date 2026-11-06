# Proyecto Final SQA — Pipeline CI/CD con Aseguramiento de Calidad

[![Calidad SQA](https://github.com/nescobarf2-boop/proyecto-final-sqa-task-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/nescobarf2-boop/proyecto-final-sqa-task-tracker/actions/workflows/ci.yml)

## Descripción

Este proyecto consiste en la implementación de un pipeline de integración continua con controles automatizados de aseguramiento de la calidad del software, utilizando como base una aplicación CRUD de gestión de tareas.

La aplicación está desarrollada con React, Express y MySQL. Como parte del proyecto académico, se incorporaron pruebas unitarias, de integración, de regresión y de frontend, además de análisis estático, medición de cobertura y verificaciones automáticas mediante GitHub Actions y SonarQube Cloud.

El objetivo principal es detectar problemas antes de aceptar cambios en la rama principal y demostrar la mejora de calidad mediante resultados medibles.

## Funcionalidades de la aplicación

El sistema permite:

- Crear tareas con título y descripción.
- Consultar el listado de tareas.
- Consultar los datos de una tarea.
- Actualizar tareas existentes.
- Eliminar tareas.
- Validar información y responder adecuadamente ante errores.

## Tecnologías utilizadas

| Área | Herramientas |
|---|---|
| Frontend | React, Vite y Axios |
| Backend | Node.js y Express |
| Base de datos | MySQL 8 |
| Contenedores | Docker Compose y phpMyAdmin |
| Pruebas backend | Jest y Supertest |
| Pruebas frontend | Vitest y React Testing Library |
| Calidad de código | ESLint, Prettier y SonarQube Cloud |
| Control de versiones | Git y GitHub |
| CI | GitHub Actions |

## Arquitectura

La aplicación sigue una estructura cliente-servidor:

Usuario → React → API Express → MySQL

React presenta la interfaz, Express procesa las peticiones y MySQL conserva los datos.

## Instalación

### Requisitos

- Node.js 22.
- Git.
- Docker Desktop.
- Un navegador web.

### Obtener el proyecto

`git clone https://github.com/nescobarf2-boop/proyecto-final-sqa-task-tracker.git`

`cd proyecto-final-sqa-task-tracker`

### Instalar dependencias

`npm ci`

`npm ci --prefix server`

`npm ci --prefix client`

### Configurar el entorno

Crear estos archivos locales a partir de sus ejemplos:

- `.env` desde `.env.example`.
- `server/.env` desde `server/.env.example`.
- `server/.env.test` desde `server/.env.test.example`.

Configurar contraseñas propias y conservarlas fuera del repositorio.

La aplicación utiliza `crud_app` y las pruebas utilizan `crud_sqa_test`.

### Iniciar MySQL

`docker compose up -d`

Comprobar el estado:

`docker compose ps`

MySQL se encuentra disponible localmente en el puerto `3308` y phpMyAdmin en:

http://localhost:8081

### Iniciar la aplicación

En una terminal:

`npm start --prefix server`

En otra terminal:

`npm run dev --prefix client`

Abrir la dirección local indicada por Vite.

## Pruebas automatizadas

Ejecutar las pruebas del backend:

`npm test --prefix server`

Ejecutar las pruebas del frontend con cobertura:

`npm run test:coverage --prefix client`

Verificar el análisis estático:

`npm run lint`

`npm run format:check`

Comprobar la compilación:

`npm run build --prefix client`

## Pipeline de integración continua

El archivo `.github/workflows/ci.yml` contiene cuatro etapas:

1. **build:** instalación, compilación y análisis de formato.
2. **test:** pruebas automatizadas y generación de cobertura.
3. **analyze:** análisis con SonarQube Cloud y evaluación del Quality Gate.
4. **report:** resumen de resultados y rechazo de ejecuciones no aprobadas.

El pipeline se ejecuta cuando se abre o actualiza un Pull Request dirigido a `main`, así como cuando se realiza un cambio en `main`.

## Resultados de calidad

Resultados documentados el 4 de noviembre de 2026:

| Indicador | Resultado |
|---|---:|
| Pruebas del backend | 19 aprobadas |
| Pruebas del frontend | 8 aprobadas |
| Total de pruebas | 27 aprobadas |
| Cobertura de líneas del backend | 96.82% |
| Cobertura de líneas del frontend | 84.09% |
| Cobertura del código nuevo en Sonar | 88.12% |
| Quality Gate | Passed |
| Duplicación de código nuevo | 0.0% |
| Nuevos problemas en Sonar | 0 |
| Etapas del pipeline | 4 aprobadas |

La cobertura del código nuevo registrada en Sonar aumentó de 58.02% a 88.12% entre las dos ejecuciones comparadas, una mejora de 30.10 puntos porcentuales.

Las mediciones de cobertura del backend, frontend y Sonar se presentan por separado porque evalúan alcances diferentes.

## Documentación

- [Plan de Aseguramiento de Calidad](docs/SQA-Plan.md)
- [Matriz de Pruebas](docs/Matriz-Pruebas.md)
- [Línea Base de Calidad](docs/Linea-Base-Calidad.md)
- [Reporte de Mejora](docs/Reporte-Mejora.md)
- [Manual Técnico](docs/Manual-Tecnico.md)

## Seguridad y consideraciones

Las credenciales de MySQL y los tokens de SonarQube no deben almacenarse directamente en el código.

El proyecto utiliza variables de entorno, una base de pruebas separada y GitHub Secrets.

El Quality Gate aprobado representa el estado de una ejecución concreta; no elimina la necesidad de revisar futuras modificaciones ni los riesgos de dependencias detectados.

## Origen y adaptación del proyecto

Para el desarrollo se reutilizó como base un proyecto CRUD de gestión de tareas disponible en:

https://github.com/vgnaidukollu-lgtm/task-tracker-crud

La adaptación para el curso consistió en incorporar validaciones, pruebas automatizadas, cobertura, Docker, GitHub Actions, SonarQube Cloud y documentación SQA.

La reutilización de la aplicación permitió concentrar el trabajo en el aseguramiento de la calidad del software.

## Referencias

- GitHub Actions: https://docs.github.com/en/actions
- SonarQube Cloud: https://docs.sonarsource.com/sonarqube-cloud/
- Jest: https://jestjs.io/
- Vitest: https://vitest.dev/
- Docker: https://docs.docker.com/
- React: https://react.dev/

## Demostración práctica del pipeline

Esta modificación se realiza en una rama independiente para verificar que GitHub Actions ejecute las pruebas automatizadas y SonarQube analice los cambios antes de integrarlos a la rama principal.