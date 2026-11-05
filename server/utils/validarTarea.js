function validarTarea(datos) {
  const title = datos && datos.title;
  if (typeof title !== 'string' || title.trim().length === 0) {
    return { ok: false, error: 'El titulo es obligatorio' };
  }
  if (title.trim().length > 255) {
    return { ok: false, error: 'El titulo debe tener como maximo 255 caracteres' };
  }
  return {
    ok: true,
    title: title.trim(),
    description: typeof datos.description === 'string' ? datos.description.trim() : null,
  };
}
module.exports = { validarTarea };
