# Matriz de pruebas
| ID | Tipo | Entrada | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| UT-01 | Unitaria | Título `  Informe  ` | Se normaliza a `Informe` | PENDIENTE DE EJECUTAR |
| UT-02 | Unitaria | Título vacío | Validación rechazada | PENDIENTE DE EJECUTAR |
| IN-01 | Integración | POST con título válido | HTTP 201, registro en MySQL | PENDIENTE DE EJECUTAR |
| IN-02 | Integración | PUT de registro válido | HTTP 200, datos actualizados | PENDIENTE DE EJECUTAR |
| IN-03 | Integración | DELETE de registro válido | HTTP 200; siguiente GET 404 | PENDIENTE DE EJECUTAR |
| RG-01 | Regresión | POST título vacío | HTTP 400 | PENDIENTE DE EJECUTAR |
| RG-02 | Regresión | DELETE ID inexistente | HTTP 404 | PENDIENTE DE EJECUTAR |
| FE-01 | Frontend | Respuesta API con una tarea | Renderiza el título | PENDIENTE DE EJECUTAR |
| FE-02 | Frontend | API devuelve lista vacía | Muestra mensaje sin tareas | PENDIENTE DE EJECUTAR |

**Nota:** Reemplazar "PENDIENTE DE EJECUTAR" por resultados reales y fecha tras correr las pruebas.
