// La base de PRUEBAS es independiente de la base con datos locales.
// Nunca apuntar estas pruebas a crud_app.
process.env.DB_NAME = 'crud_sqa_test';
const request = require('supertest');
const app = require('../index');
const pool = require('../db');

beforeAll(async () => {
  if (process.env.DB_NAME !== 'crud_sqa_test') {
    throw new Error('Las pruebas necesitan crud_sqa_test');
  }
  await pool.query(`CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

beforeEach(async () => {
  await pool.query('DELETE FROM todos');
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await pool.end();
});

describe('Pruebas de integracion HTTP + Express + MySQL', () => {
  test('GET devuelve lista inicialmente vacia', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST crea una tarea que puede consultarse', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Estudiar SQA', description: 'Prueba de integracion' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Estudiar SQA');
    const consulta = await request(app).get(`/api/todos/${res.body.id}`);
    expect(consulta.status).toBe(200);
    expect(consulta.body.title).toBe('Estudiar SQA');
  });

  test('PUT actualiza el registro almacenado', async () => {
    const creado = await request(app).post('/api/todos').send({ title: 'Original' });
    const res = await request(app)
      .put(`/api/todos/${creado.body.id}`)
      .send({ title: 'Actualizado' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Actualizado');
  });

  test('DELETE elimina la tarea', async () => {
    const creado = await request(app).post('/api/todos').send({ title: 'Borrar' });
    const eliminado = await request(app).delete(`/api/todos/${creado.body.id}`);
    expect(eliminado.status).toBe(200);
    const consulta = await request(app).get(`/api/todos/${creado.body.id}`);
    expect(consulta.status).toBe(404);
  });
});

describe('Regresion: errores encontrados en el CRUD original', () => {
  test('POST rechaza titulo vacio con HTTP 400', async () => {
    const res = await request(app).post('/api/todos').send({ title: ' ' });
    expect(res.status).toBe(400);
  });

  test('PUT rechaza titulo vacio con HTTP 400', async () => {
    const creado = await request(app).post('/api/todos').send({ title: 'Valido' });
    const res = await request(app).put(`/api/todos/${creado.body.id}`).send({ title: '' });
    expect(res.status).toBe(400);
  });

  test('GET retorna 404 para un registro inexistente', async () => {
    const res = await request(app).get('/api/todos/999999');
    expect(res.status).toBe(404);
  });

  test('PUT retorna 404 para un registro inexistente', async () => {
    const res = await request(app).put('/api/todos/999999').send({ title: 'No existe' });
    expect(res.status).toBe(404);
  });

  test('DELETE retorna 404 para un registro inexistente', async () => {
    const res = await request(app).delete('/api/todos/999999');
    expect(res.status).toBe(404);
  });
});

// Rutas de error: son indispensables para comprobar resiliencia y elevar cobertura.
describe('Errores de base de datos controlados', () => {
  test.each([
    ['GET listado', 'get', '/api/todos', null],
    ['GET detalle', 'get', '/api/todos/1', null],
    ['POST', 'post', '/api/todos', { title: 'Valida' }],
    ['PUT', 'put', '/api/todos/1', { title: 'Valida' }],
    ['DELETE', 'delete', '/api/todos/1', null],
  ])('%s devuelve HTTP 500 si falla MySQL', async (nombre, metodo, ruta, cuerpo) => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Fallo simulado'));
    const peticion = request(app)[metodo](ruta);
    const res = cuerpo ? await peticion.send(cuerpo) : await peticion;
    expect(res.status).toBe(500);
  });
});
