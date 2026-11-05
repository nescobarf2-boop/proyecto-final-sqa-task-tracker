# Reporte de Mejora de Calidad del Software

**Proyecto:** Pipeline CI/CD con Aseguramiento de Calidad Integrado  
**Fecha de documentación:** 4 de noviembre de 2026

## 1. Introducción

El presente reporte analiza los resultados obtenidos mediante la implementación de controles de aseguramiento de calidad en una aplicación CRUD desarrollada con React, Express y MySQL.

El objetivo es determinar si las actividades realizadas permitieron mejorar la confiabilidad del proceso de desarrollo y establecer criterios objetivos para aceptar o rechazar modificaciones.

## 2. Situación identificada

Durante las primeras ejecuciones del pipeline se comprobó que las pruebas del backend funcionaban, pero el análisis de SonarQube presentaba dificultades para alcanzar el umbral de cobertura requerido.

Una ejecución registró 58.02% de cobertura del código nuevo, frente al 80% solicitado por el Quality Gate de Sonar. Como consecuencia, el resultado fue rechazado.

También se detectó un problema de confiabilidad en un componente de React relacionado con la llamada a una función asíncrona.

Estos resultados permitieron identificar que el aseguramiento de calidad no dependía únicamente de tener pruebas, sino también de integrarlas correctamente con las herramientas de análisis.

## 3. Acciones correctivas implementadas

### 3.1. Fortalecimiento de pruebas

Se implementaron pruebas unitarias, de integración y de regresión en el backend utilizando Jest y Supertest.

Se incorporaron pruebas de React utilizando Vitest y React Testing Library, incluyendo casos de creación, edición, validación y manejo de errores.

### 3.2. Integración de cobertura

Se habilitó el reporte de cobertura del frontend mediante Vitest y su proveedor V8.

Posteriormente, se modificó GitHub Actions para conservar los reportes LCOV del backend y frontend como artefactos de la ejecución.

Finalmente, se configuró SonarQube para importar ambos reportes:

- `server/coverage/lcov.info`
- `client/coverage/lcov.info`

### 3.3. Corrección de confiabilidad

Se corrigió una llamada asíncrona en el componente de listado de tareas, atendiendo el problema señalado por SonarQube.

### 3.4. Controles automatizados

El pipeline quedó organizado en cuatro etapas:

- **build:** compila React y ejecuta ESLint y Prettier.
- **test:** ejecuta pruebas automatizadas de backend y frontend.
- **analyze:** analiza el código con SonarQube Cloud y comprueba el Quality Gate.
- **report:** presenta un resumen y falla cuando alguna etapa necesaria no se aprueba.

## 4. Comparación de métricas

| Indicador | Primer análisis | Resultado final |
|---|---|---|
| Cobertura del código nuevo en Sonar | 58.02% | 88.12% |
| Cobertura mínima exigida por Sonar | 80% | 80% |
| Quality Gate | Failed | Passed |
| Duplicación de código nuevo | 0.0% | 0.0% |
| Nuevos problemas en el análisis final | No utilizado como indicador comparativo inicial | 0 |
| Cobertura de líneas del backend | Sin valor inicial comparable documentado | 96.82% |
| Cobertura de líneas del frontend | Sin valor inicial comparable documentado | 84.09% |
| Pruebas automatizadas | Sin recuento inicial comparable documentado | 27 aprobadas |
| Etapas del pipeline | Existieron ejecuciones rechazadas | 4 aprobadas |

**Mejora en cobertura de SonarQube:**

88.12% - 58.02% = **30.10 puntos porcentuales**.

Esta comparación se refiere a dos análisis del código nuevo realizados durante la intervención. No representa una comparación directa de cobertura total del código original y final.

## 5. Interpretación de los resultados

La mejora más significativa fue el aumento de cobertura reconocido por SonarQube, que permitió pasar de un Quality Gate rechazado a uno aprobado.

Considero que este resultado demuestra la importancia de revisar cómo se relacionan las herramientas. Inicialmente, las pruebas del frontend se ejecutaban correctamente, pero su cobertura no se incorporaba al análisis de Sonar. Por eso, aunque las pruebas eran satisfactorias, el indicador de calidad seguía siendo insuficiente.

Al integrar ambos reportes LCOV, se obtuvo una evaluación más completa del código nuevo y se alcanzó el 88.12% de cobertura.

También se comprobó que el pipeline puede ejecutar diferentes verificaciones y consolidar los resultados, evitando depender exclusivamente de una revisión manual.

## 6. Riesgos y aspectos pendientes

En el dashboard final de SonarQube aparecen nueve riesgos asociados con dependencias. Estos no provocaron el rechazo del Quality Gate mostrado, pero deben revisarse y clasificarse antes de adoptar decisiones de actualización.

No se consideran resueltos únicamente porque el Quality Gate haya sido aprobado.

Adicionalmente, las 26 advertencias de ESLint observadas en la ejecución local no constituyeron errores bloqueantes. Conviene revisarlas en futuras mejoras de configuración, particularmente las relacionadas con componentes JSX.

También es necesario mantener actualizadas las pruebas cuando se agreguen nuevas funcionalidades.

## 7. Evidencias del proyecto

Las principales evidencias son:

- Ejecución inicial de SonarQube con 58.02% y Quality Gate Failed.
- Ejecución final de SonarQube con 88.12% y Quality Gate Passed.
- Resultados de 19 pruebas del backend aprobadas.
- Resultados de 8 pruebas del frontend aprobadas.
- Cobertura backend de 96.82%.
- Cobertura frontend de 84.09%.
- GitHub Actions con cuatro etapas aprobadas.

Estas evidencias pueden consultarse en los registros de ejecución y capturas conservadas del proyecto.

## 8. Conclusiones

La implementación del pipeline permitió fortalecer el control de calidad de una aplicación existente mediante pruebas, análisis estático y medición de cobertura.

El cambio más relevante fue pasar de 58.02% a 88.12% de cobertura del código nuevo en SonarQube, superando el umbral requerido para aprobar el Quality Gate.

Desde mi punto de vista, el proyecto demuestra que no basta con ejecutar pruebas y comprobar que una aplicación funciona. Es necesario analizar sus resultados, detectar por qué fallan los controles y corregir las causas antes de integrar cambios.

Aunque los indicadores finales son satisfactorios, el aseguramiento de calidad debe mantenerse como una actividad continua, especialmente en la revisión de dependencias, actualización de pruebas y seguimiento de nuevas modificaciones.