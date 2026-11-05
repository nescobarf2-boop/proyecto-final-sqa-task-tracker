# Plan de Aseguramiento de Calidad (SQA)
## Propósito y alcance
Evaluar y mejorar la calidad de un CRUD existente de tareas (React, Express y MySQL), sin crear una app desde cero.
## Objetivos medibles
- Cobertura de líneas del backend >=60% según Jest.
- 100% de pruebas automáticas aprobadas antes del merge.
- Sin errores bloqueantes del linter.
- Quality Gate de SonarQube Cloud aprobado (condiciones propias del servicio).
## Actividades y herramientas
- Pruebas unitarias: Jest, `validarTarea`.
- Pruebas de integración: Jest + Supertest + MySQL de pruebas, CRUD HTTP real.
- Regresión: rechazo de títulos vacíos y detección de registros inexistentes.
- Frontend: Vitest + React Testing Library.
- Análisis estático: ESLint, Prettier, SonarQube Cloud.
- Integración continua: GitHub Actions (build, test, analyze y report).
## Riesgos y respuestas
- Acceso incorrecto a MySQL: usar base separada `crud_sqa_test`.
- Secretos expuestos: ignorar `.env` y usar GitHub Secrets.
- Pruebas fallidas: bloquear merge con revisiones obligatorias.
- Alertas de Sonar: evaluar su causa y documentar la corrección.
## Responsable y mantenimiento
Estudiante a cargo; revisar en cada cambio de código y actualizar métricas en cada entrega.
