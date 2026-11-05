# Reporte de mejora — antes vs. después
**Fecha:** PENDIENTE
| Indicador | Antes | Después | Evidencia |
|---|---|---|---|
| Pruebas que pasan | PENDIENTE | PENDIENTE | Captura Actions |
| Cobertura líneas backend | NO MEDIDA | PENDIENTE | Jest coverage |
| Fallos por validación | PENDIENTE | PENDIENTE | Pruebas HTTP |
| Bugs / Code smells | PENDIENTE | PENDIENTE | SonarQube Cloud |
| Quality Gate | NO CONFIGURADO | PENDIENTE | SonarQube Cloud |

## Hallazgos y acciones correctivas
- El CRUD original no validaba campos vacíos en el backend: agregar validación y prueba de regresión.
- El DELETE original reportaba éxito aun si no encontraba registro: responder HTTP 404.

## Conclusión
Completar después de observar la ejecución real del pipeline. No inventar métricas.
