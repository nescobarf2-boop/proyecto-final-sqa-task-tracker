# Matriz de Pruebas del Sistema CRUD

**Proyecto:** Pipeline CI/CD con Aseguramiento de Calidad Integrado  
**Fecha de registro:** 4 de noviembre de 2026  
**Herramientas:** Jest, Supertest, Vitest y React Testing Library

## 1. Objetivo

Verificar que las operaciones principales del sistema de gestión de tareas funcionen correctamente y que los problemas detectados durante la adaptación del CRUD no vuelvan a presentarse.

Las pruebas se agrupan en validación unitaria, integración de la API, regresión, manejo de errores y funcionamiento del frontend.

## 2. Matriz de casos de prueba

| ID | Tipo | Entrada o condición | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| UT-01 | Unitaria | Título y descripción con espacios adicionales | Eliminar espacios al inicio y final | Aprobado: datos normalizados |
| UT-02 | Unitaria | Título formado únicamente por espacios | Rechazar el título | Aprobado: validación rechazada |
| UT-03 | Unitaria | Título con 256 caracteres | Rechazar por superar el máximo permitido | Aprobado: validación rechazada |
| UT-04 | Unitaria | Objeto sin título | Rechazar los datos | Aprobado: validación rechazada |
| UT-05 | Unitaria | Título válido sin descripción | Aceptar y devolver descripción nula | Aprobado: descripción `null` |
| IN-01 | Integración | GET al listado sin registros | Respuesta HTTP 200 y arreglo vacío | Aprobado: HTTP 200 |
| IN-02 | Integración | POST con título y descripción válidos | Crear tarea con HTTP 201 y permitir su consulta | Aprobado: creación y consulta |
| IN-03 | Integración | PUT a una tarea existente | Actualizar datos y responder HTTP 200 | Aprobado: actualización |
| IN-04 | Integración | DELETE de una tarea existente | Eliminar y responder 404 en una consulta posterior | Aprobado: eliminación |
| RG-01 | Regresión | POST con título vacío | Responder HTTP 400 | Aprobado: HTTP 400 |
| RG-02 | Regresión | PUT con título vacío | Responder HTTP 400 | Aprobado: HTTP 400 |
| RG-03 | Regresión | GET de un ID inexistente | Responder HTTP 404 | Aprobado: HTTP 404 |
| RG-04 | Regresión | PUT de un ID inexistente | Responder HTTP 404 | Aprobado: HTTP 404 |
| RG-05 | Regresión | DELETE de un ID inexistente | Responder HTTP 404 | Aprobado: HTTP 404 |
| DB-01 | Manejo de errores | Fallo simulado de MySQL al listar tareas | Responder HTTP 500 | Aprobado: HTTP 500 |
| DB-02 | Manejo de errores | Fallo simulado de MySQL al consultar detalle | Responder HTTP 500 | Aprobado: HTTP 500 |
| DB-03 | Manejo de errores | Fallo simulado de MySQL al crear | Responder HTTP 500 | Aprobado: HTTP 500 |
| DB-04 | Manejo de errores | Fallo simulado de MySQL al actualizar | Responder HTTP 500 | Aprobado: HTTP 500 |
| DB-05 | Manejo de errores | Fallo simulado de MySQL al eliminar | Responder HTTP 500 | Aprobado: HTTP 500 |
| FE-01 | Frontend | API devuelve una tarea con descripción | Mostrar título y descripción en el listado | Aprobado: ambos visibles |
| FE-02 | Frontend | API devuelve lista vacía | Mostrar mensaje sin tareas | Aprobado: mensaje visible |
| FE-03 | Frontend | Crear tarea con título y descripción | Enviar datos mediante POST y regresar al listado | Aprobado: solicitud y navegación |
| FE-04 | Frontend | Intentar crear sin título | Mostrar aviso y no ejecutar POST | Aprobado: validación |
| FE-05 | Frontend | Cancelar formulario de creación | Regresar al listado sin crear | Aprobado: cancelación |
| FE-06 | Frontend | Editar una tarea existente | Recuperar datos, ejecutar PUT y regresar al listado | Aprobado: actualización |
| FE-07 | Frontend | Fallo al cargar tarea para editar | Mostrar mensaje de error | Aprobado: aviso mostrado |
| FE-08 | Frontend | Fallo al guardar una tarea | Mostrar mensaje de error | Aprobado: aviso mostrado |

## 3. Resumen de ejecución

| Grupo | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Pruebas unitarias | 5 | 5 | 0 |
| Pruebas de integración CRUD | 4 | 4 | 0 |
| Pruebas de regresión | 5 | 5 | 0 |
| Manejo de errores de MySQL | 5 | 5 | 0 |
| Pruebas del frontend | 8 | 8 | 0 |
| **Total** | **27** | **27** | **0** |

## 4. Cobertura obtenida

| Herramienta | Cobertura de líneas |
|---|---:|
| Jest: backend | 96.82% |
| Vitest: frontend | 84.09% |
| SonarQube: código nuevo del Pull Request | 88.12% |

Los tres resultados se reportan por separado porque no corresponden exactamente al mismo conjunto de archivos ni a la misma forma de calcular cobertura.

## 5. Evidencia de ejecución

Los resultados se obtuvieron ejecutando:

- `npm test --prefix server`
- `npm run test:coverage --prefix client`

También se verificó una ejecución aprobada del pipeline en GitHub Actions, con las etapas `build`, `test`, `analyze` y `report` en estado satisfactorio.

Los archivos de prueba utilizados fueron:

- `server/tests/validarTarea.unit.test.js`
- `server/tests/todos.integration.test.js`
- `client/src/pages/TodoList.test.jsx`
- `client/src/pages/TodoForm.test.jsx`

## 6. Análisis y conclusión

Las pruebas permitieron revisar tanto los comportamientos correctos como las respuestas ante datos inválidos y fallas simuladas. Considero importante esta combinación porque una aplicación no debe evaluarse únicamente cuando recibe información correcta.

Los casos de regresión ayudan a evitar que reaparezcan problemas ya identificados, mientras que las pruebas de integración comprueban la comunicación entre la API y MySQL.

Los 27 casos finalizaron correctamente en la ejecución documentada. Sin embargo, el mantenimiento de las pruebas será necesario cada vez que se agreguen funcionalidades o se modifiquen las rutas y componentes del sistema.