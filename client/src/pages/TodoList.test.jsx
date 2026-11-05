import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect, vi, beforeEach } from 'vitest';
import API from '../api';
import TodoList from './TodoList';

vi.mock('../api', () => ({ default: { get: vi.fn(), delete: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

test('muestra una tarea recibida de la API', async () => {
  API.get.mockResolvedValue({
    data: [{ id: 1, title: 'Documentar pruebas', description: 'Curso SQA' }],
  });
  render(
    <MemoryRouter>
      <TodoList />
    </MemoryRouter>,
  );
  expect(await screen.findByText('Documentar pruebas')).toBeTruthy();
  expect(screen.getByText('Curso SQA')).toBeTruthy();
});

test('muestra aviso cuando no hay tareas', async () => {
  API.get.mockResolvedValue({ data: [] });
  render(
    <MemoryRouter>
      <TodoList />
    </MemoryRouter>,
  );
  expect(await screen.findByText('No todos yet.')).toBeTruthy();
});
