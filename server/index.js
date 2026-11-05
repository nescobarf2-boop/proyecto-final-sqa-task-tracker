require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todosRouter);

// Exportar app para Supertest evita abrir un puerto durante las pruebas.
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
module.exports = app;
