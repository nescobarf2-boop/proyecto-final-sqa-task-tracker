# Plan de Aseguramiento de la Calidad del Software (SQA)

**Proyecto:** Pipeline CI/CD con Aseguramiento de Calidad Integrado  
**Aplicación:** Sistema de gestión de tareas CRUD  
**Fecha de documentación:** 4 de noviembre de 2026

## 1. Propósito

El propósito de este plan es establecer las actividades y controles necesarios para evaluar y mejorar la calidad de una aplicación CRUD existente, desarrollada con React, Express y MySQL.

La propuesta consiste en integrar pruebas automatizadas, análisis estático y controles de cobertura dentro de un pipeline de GitHub Actions. Con ello se busca identificar errores antes de incorporar modificaciones a la rama principal, en lugar de depender únicamente de revisiones manuales.

## 2. Alcance

El aseguramiento de calidad contempla:

- Validación de datos recibidos por la API.
- Operaciones de creación, consulta, actualización y eliminación de tareas.
- Pruebas unitarias, de integración y de regresión.
- Pruebas de componentes de React.
- Medición de cobertura del backend y frontend.
- Análisis estático con ESLint, Prettier y SonarQube Cloud.
- Ejecución automática del pipeline mediante GitHub Actions.
- Revisión de los resultados antes de integrar cambios en `main`.

No se incluyen pruebas de carga, estrés ni un despliegue automático a producción, ya que no forman parte del alcance obligatorio definido para este proyecto.

## 3. Objetivos de calidad

1. Mantener una cobertura mínima de líneas del 60%, de acuerdo con el requisito académico y el umbral establecido en Jest.
2. Cumplir el mínimo de cobertura del código nuevo exigido por el Quality Gate de SonarQube, actualmente del 80%.
3. Conseguir que el 100% de las pruebas automatizadas finalice correctamente.
4. Evitar errores bloqueantes de análisis estático.
5. Mantener la duplicación de código nuevo dentro del límite establecido por SonarQube.
6. Impedir la integración de cambios cuando alguna verificación obligatoria falle.
7. Registrar evidencias que permitan comparar los resultados antes y después de las mejoras.

## 4. Referencias y criterios utilizados

Se toman como referencia los principios de aseguramiento de calidad del software, las características de calidad de ISO/IEC 25010 y las buenas prácticas de integración continua.

Estas referencias orientan la prevención de defectos, la mantenibilidad, la confiabilidad y la revisión sistemática de cambios. No se afirma que el proyecto cuente con una certificación ISO.

## 5. Herramientas

| Herramienta | Uso en el proyecto |
|---|---|
| Git y GitHub | Control de versiones y Pull Requests |
| GitHub Actions | Automatización del pipeline |
| Jest | Pruebas del backend y cobertura |
| Supertest | Pruebas HTTP de la API |
| Vitest | Pruebas y cobertura del frontend |
| React Testing Library | Verificación de componentes de React |
| ESLint | Detección de problemas de código |
| Prettier | Verificación de formato |
| SonarQube Cloud | Análisis estático y Quality Gate |
| Docker Compose | Entorno local de MySQL y phpMyAdmin |

## 6. Actividades de aseguramiento

**Pruebas unitarias:** se comprueba la función `validarTarea`, incluyendo títulos válidos, espacios innecesarios, valores vacíos, longitud máxima y descripción opcional.

**Pruebas de integración:** se realizan peticiones HTTP con Supertest a las rutas del CRUD, utilizando MySQL y una base de datos independiente de pruebas.

**Pruebas de regresión:** se verifica que las validaciones y las respuestas HTTP ante registros inexistentes continúen funcionando después de modificar el sistema.

**Pruebas del frontend:** se comprueba el listado de tareas, el formulario de creación, la actualización, la cancelación y los mensajes ante errores.

**Análisis estático:** ESLint, Prettier y SonarQube permiten revisar problemas de código, formato, cobertura y duplicación.

**Integración continua:** GitHub Actions ejecuta los controles de manera automática cuando se abre o actualiza un Pull Request dirigido a `main`, y cuando se realizan cambios en `main`.

## 7. Criterios de aceptación

| Indicador | Criterio |
|---|---|
| Pruebas automatizadas | Todas deben aprobar |
| Cobertura de líneas del backend | Mínimo 60% |
| Cobertura de código nuevo en Sonar | Mínimo 80%, según Quality Gate aplicado |
| Duplicación de código nuevo | Máximo 3%, según Quality Gate aplicado |
| ESLint | Sin errores bloqueantes |
| Prettier | Verificación aprobada |
| SonarQube | Quality Gate en estado Passed |
| GitHub Actions | `build`, `test`, `analyze` y `report` aprobados |
| Integración a `main` | Mediante Pull Request y verificaciones requeridas |

El cumplimiento de estos criterios debe verificarse en cada actualización relevante. Una ejecución aprobada no garantiza que todas las futuras modificaciones también lo estén.

## 8. Gestión de riesgos

| Riesgo | Consecuencia | Control propuesto |
|---|---|---|
| Fallo de conexión a MySQL | Pruebas de integración interrumpidas | Base `crud_sqa_test` y comprobación del servicio |
| Uso de datos reales en pruebas | Pérdida o alteración de información | Base exclusiva para pruebas |
| Cambios sin validar | Defectos incorporados al sistema | Pull Requests y verificaciones obligatorias |
| Cobertura incompleta | Resultados de calidad poco representativos | Importación de reportes LCOV de backend y frontend |
| Exposición de credenciales | Acceso no autorizado | Archivos `.env` ignorados y GitHub Secrets |
| Dependencias vulnerables | Riesgos de seguridad y mantenimiento | Revisión periódica de dependencias y actualizaciones controladas |

## 9. Resultados verificados

En la ejecución documentada del 4 de noviembre de 2026 se obtuvieron los siguientes resultados:

- Backend: 19 pruebas aprobadas y 96.82% de cobertura de líneas.
- Frontend: 8 pruebas aprobadas y 84.09% de cobertura de líneas.
- Total: 27 pruebas automatizadas aprobadas.
- SonarQube Cloud: 88.12% de cobertura de código nuevo.
- Quality Gate: Passed.
- Duplicación de código nuevo: 0.0%.
- Nuevos problemas reportados por Sonar: 0.
- GitHub Actions: cuatro etapas aprobadas.

Las mediciones de Jest, Vitest y Sonar tienen alcances diferentes y se presentan por separado para evitar interpretaciones incorrectas.

## 10. Responsabilidad y mantenimiento

La responsabilidad de ejecutar las verificaciones, revisar sus resultados y documentar los cambios corresponde al desarrollo del proyecto.

Cuando se agregue o modifique una funcionalidad, se deberán revisar las pruebas relacionadas, ejecutar el pipeline, analizar las observaciones de SonarQube y actualizar las evidencias de calidad si los resultados cambian.

## 11. Conclusión

La implementación del Plan SQA permitió pasar de una revisión principalmente manual a un proceso de validación automatizada y medible. El principal beneficio es que los cambios pueden evaluarse bajo criterios definidos antes de incorporarse a la rama principal.

Los resultados demuestran una mejora en la cobertura reportada y la aprobación del Quality Gate. No obstante, la calidad debe mantenerse mediante pruebas continuas, revisión de dependencias y seguimiento de los riesgos identificados.