const express = require('express');
const router = express.Router();
const pool = require('../db');
const { validarTarea } = require('../utils/validarTarea');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  const validacion = validarTarea(req.body);
  if (!validacion.ok) return res.status(400).json({ error: validacion.error });
  try {
    const [result] = await pool.query('INSERT INTO todos (title, description) VALUES (?, ?)', [
      validacion.title,
      validacion.description,
    ]);
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

router.put('/:id', async (req, res) => {
  const validacion = validarTarea(req.body);
  if (!validacion.ok) return res.status(400).json({ error: validacion.error });
  try {
    const [result] = await pool.query('UPDATE todos SET title = ?, description = ? WHERE id = ?', [
      validacion.title,
      validacion.description,
      req.params.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});
module.exports = router;
