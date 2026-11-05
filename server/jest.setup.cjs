// Configuracion exclusiva para pruebas, ANTES de cargar app y db.js.
// En Actions las variables del job prevalecen sobre .env.test.
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.test'), quiet: true });
if (process.env.DB_NAME !== 'crud_sqa_test') {
  throw new Error('Seguridad: las pruebas deben usar DB_NAME=crud_sqa_test');
}
