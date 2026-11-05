# Manual técnico del pipeline
## Arquitectura
Cliente React -> API Express -> MySQL.
GitHub push/PR -> build -> test (MySQL aislado) -> analyze (SonarQube Cloud) -> report.
## Instalación local
1. Instalar Node.js 22+ y XAMPP/MySQL.
2. Crear `crud_app` y la tabla `todos` según `server/schema.sql`.
3. Crear `server/.env` con credenciales locales (no publicar).
4. Ejecutar `npm install` en raíz, `server` y `client`.
5. Arrancar `npm start` en `server`, `npm run dev` en `client`.
6. Crear `crud_sqa_test` y ejecutar pruebas; esta base se usa únicamente para tests.
## Diagnóstico
- Puerto 4000 ocupado: ajustar `PORT` y `client/src/api.js`.
- Error MySQL: revisar servicio, nombre BD y credenciales.
- Acciones en rojo: ingresar en Actions > run > job > paso con error.
- Sonar en rojo: revisar token, claves y análisis automático desactivado.
## Seguridad
Usar `.gitignore`, GitHub Secrets y base de datos de pruebas separada.
