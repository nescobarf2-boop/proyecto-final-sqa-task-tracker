const { validarTarea } = require('../utils/validarTarea');

describe('Pruebas unitarias de validacion', () => {
  test('acepta titulo valido y elimina espacios', () => {
    expect(validarTarea({ title: '  Preparar informe  ', description: '  SQA  ' })).toEqual({
      ok: true,
      title: 'Preparar informe',
      description: 'SQA',
    });
  });
  test('rechaza titulo vacio', () => {
    expect(validarTarea({ title: '   ' }).ok).toBe(false);
  });
  test('rechaza un titulo que supera los 255 caracteres', () => {
    expect(validarTarea({ title: 'x'.repeat(256) }).ok).toBe(false);
  });
  test('rechaza datos sin titulo', () => {
    expect(validarTarea({}).ok).toBe(false);
  });
  test('descripcion opcional devuelve null', () => {
    expect(validarTarea({ title: 'Tarea' }).description).toBeNull();
  });
});
