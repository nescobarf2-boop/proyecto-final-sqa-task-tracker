# Línea Base de Calidad del Software

**Proyecto:** Pipeline CI/CD con Aseguramiento de Calidad Integrado  
**Aplicación:** Sistema de gestión de tareas CRUD  
**Fecha de documentación:** 4 de noviembre de 2026

## 1. Objetivo

Establecer una referencia del estado de calidad de la aplicación antes de completar las actividades de aseguramiento del software, con el propósito de identificar problemas y comparar los resultados posteriores a la implementación del pipeline.

## 2. Descripción de la aplicación base

Para el desarrollo del proyecto se reutilizó una aplicación de gestión de tareas construida con React, Express y MySQL.

La aplicación permite crear, consultar, actualizar y eliminar tareas mediante una interfaz web y una API REST.

El repositorio original utilizado como referencia fue:

https://github.com/vgnaidukollu-lgtm/task-tracker-crud

La intervención realizada para el curso se enfocó en fortalecer la validación de datos, incorporar pruebas y establecer controles automatizados de calidad, sin desarrollar nuevamente toda la aplicación.

## 3. Estado inicial del aseguramiento de calidad

| Aspecto | Situación identificada |
|---|---|
| Aplicación CRUD | Existía una base funcional para gestionar tareas |
| Pruebas automatizadas | No se dispone de una medición inicial verificable |
| Cobertura de código | No medida en la línea base original |
| Pipeline de calidad | No formaba parte de la base reutilizada |
| Quality Gate | No configurado como control del proyecto original |
| Control de integración | Requería incorporar verificaciones automáticas |
| Análisis de calidad | Se incorporó durante la intervención |
| Gestión de credenciales | Se fortaleció mediante variables de entorno y secretos |

La ausencia de una medición inicial no equivale a afirmar que el valor fuera cero. Se utiliza la expresión "no medido" cuando no existe evidencia suficiente.

## 4. Problemas funcionales considerados

Durante la adaptación del CRUD se identificaron comportamientos que debían controlarse mediante pruebas de regresión:

- Rechazo de títulos vacíos durante la creación de tareas.
- Rechazo de títulos vacíos durante la actualización.
- Respuestas correctas cuando se consulta un registro inexistente.
- Respuestas HTTP 404 cuando se intenta actualizar o eliminar un registro que no existe.
- Manejo de fallas de conexión o consulta a la base de datos.

Estos comportamientos se incorporaron a los casos de prueba para que pudieran comprobarse automáticamente.

## 5. Primer diagnóstico automatizado con SonarQube

Durante las primeras ejecuciones del pipeline se identificaron problemas de cobertura y confiabilidad.

Posteriormente, una ejecución de SonarQube registró los siguientes indicadores:

| Indicador | Primer análisis documentado |
|---|---|
| Cobertura del código nuevo | 58.02% |
| Cobertura exigida por Sonar | 80% |
| Quality Gate | Failed |
| Duplicación de código nuevo | 0.0% |
| Situación principal | Cobertura inferior al umbral requerido |

En una evaluación anterior también se detectó un problema de confiabilidad relacionado con el tratamiento de una promesa en el frontend, que fue corregido posteriormente.

Este resultado de 58.02% representa la primera medición comparable conservada para el análisis de mejora, no necesariamente el estado del código original antes de cualquier intervención.

## 6. Interpretación de los hallazgos

El primer análisis evidenció que no era suficiente ejecutar pruebas automáticamente. También era necesario asegurar que sus reportes de cobertura llegaran a la herramienta de análisis.

Aunque las pruebas del backend presentaban una cobertura alta, SonarQube no estaba recibiendo inicialmente el reporte de cobertura del frontend. Esta diferencia afectaba el resultado global del análisis del código nuevo.

Por lo tanto, el problema no se resolvía únicamente agregando pruebas. También era indispensable integrar correctamente las herramientas de medición con GitHub Actions.

## 7. Evidencias

Las evidencias correspondientes a este diagnóstico son:

- Captura de SonarQube con Quality Gate rechazado y 58.02% de cobertura.
- Historial de GitHub Actions con ejecuciones anteriores rechazadas.
- Archivos de pruebas y configuración utilizados durante la implementación.

## 8. Conclusión

La línea base permitió establecer qué controles era necesario agregar al sistema y qué deficiencias se presentaron durante las primeras ejecuciones.

El principal aprendizaje es que la calidad del software necesita tanto pruebas bien diseñadas como mecanismos confiables para ejecutarlas, medirlas y utilizar sus resultados antes de aceptar cambios.