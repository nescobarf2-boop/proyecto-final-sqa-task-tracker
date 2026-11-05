import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import API from '../api';
import TodoForm from './TodoForm';

vi.mock('../api', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn() },
}));

function mostrarFormulario(ruta = '/new') {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/new" element={<TodoForm />} />
        <Route path="/edit/:id" element={<TodoForm />} />
        <Route path="/" element={<p>Listado de tareas</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('alert', vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test('crea una tarea con título y descripción', async () => {
  API.post.mockResolvedValue({ data: { id: 1 } });
  mostrarFormulario();
  fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
    target: { value: 'Preparar informe' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Description' }), {
    target: { value: 'Proyecto SQA' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));
  await waitFor(() => {
    expect(API.post).toHaveBeenCalledWith('/todos', {
      title: 'Preparar informe',
      description: 'Proyecto SQA',
    });
  });
  expect(await screen.findByText('Listado de tareas')).toBeTruthy();
});

test('rechaza el envío sin título', () => {
  mostrarFormulario();
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));
  expect(globalThis.alert).toHaveBeenCalledWith('Title required');
  expect(API.post).not.toHaveBeenCalled();
});

test('cancela el formulario sin crear una tarea', async () => {
  mostrarFormulario();
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(await screen.findByText('Listado de tareas')).toBeTruthy();
  expect(API.post).not.toHaveBeenCalled();
});

test('recupera y actualiza una tarea existente', async () => {
  API.get.mockResolvedValue({ data: { title: 'Original', description: 'Anterior' } });
  API.put.mockResolvedValue({ data: { title: 'Actualizada' } });
  mostrarFormulario('/edit/5');
  expect(await screen.findByDisplayValue('Original')).toBeTruthy();
  fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
    target: { value: 'Actualizada' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Update' }));
  await waitFor(() => {
    expect(API.put).toHaveBeenCalledWith('/todos/5', {
      title: 'Actualizada',
      description: 'Anterior',
    });
  });
  expect(await screen.findByText('Listado de tareas')).toBeTruthy();
});

test('informa cuando no se puede cargar una tarea para editar', async () => {
  API.get.mockRejectedValue(new Error('Error simulado'));
  mostrarFormulario('/edit/5');
  await waitFor(() => expect(globalThis.alert).toHaveBeenCalledWith('Failed to load'));
  expect(await screen.findByRole('button', { name: 'Update' })).toBeTruthy();
});

test('informa cuando falla el guardado', async () => {
  API.post.mockRejectedValue(new Error('Error simulado'));
  mostrarFormulario();
  fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
    target: { value: 'Tarea válida' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));
  await waitFor(() => expect(globalThis.alert).toHaveBeenCalledWith('Save failed'));
});
