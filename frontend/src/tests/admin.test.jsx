// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { AdminPage } from '../pages/admin/AdminPage';

describe('Pruebas Unitarias - Módulo Administración (Compañera)', () => {

  it('6. Renderizar productos en una tabla administrativa', () => {
    render(<AdminPage />);
    const filas = screen.getAllByTestId('fila-producto');
    expect(filas.length).toBeGreaterThan(0);
  });

  it('7. Crear un producto desde un formulario', () => {
    render(<AdminPage />);

    const inputNombre = screen.getByPlaceholderText('Nombre del producto');
    const inputPrecio = screen.getByPlaceholderText('Precio');
    const botonGuardar = screen.getByText('Crear Producto');

    fireEvent.change(inputNombre, { target: { value: 'Nuevo Monitor' } });
    fireEvent.change(inputPrecio, { target: { value: '120000' } });
    fireEvent.click(botonGuardar);

    expect(screen.getByText('Nuevo Monitor')).toBeInTheDocument();
  });

  it('8. Modificar un producto y actualizar el estado', () => {
    render(<AdminPage />);

    const botonesEditar = screen.getAllByText('Editar');
    fireEvent.click(botonesEditar[0]);

    const inputNombre = screen.getByPlaceholderText('Nombre del producto');
    fireEvent.change(inputNombre, { target: { value: 'Producto Editado Test' } });

    const botonGuardar = screen.getByText('Guardar Cambios');
    fireEvent.click(botonGuardar);

    expect(screen.getByText('Producto Editado Test')).toBeInTheDocument();
  });

  it('9. Eliminar un producto mediante un evento', () => {
    render(<AdminPage />);

    const filasAntes = screen.getAllByTestId('fila-producto').length;
    const botonesEliminar = screen.getAllByText('Eliminar');
    
    fireEvent.click(botonesEliminar[0]);

    const filasDespues = screen.getAllByTestId('fila-producto').length;
    expect(filasDespues).toBe(filasAntes - 1);
  });

  it('10. Mostrar condicionalmente un mensaje de error', () => {
    render(<AdminPage />);

    const inputNombre = screen.getByPlaceholderText('Nombre del producto');
    fireEvent.change(inputNombre, { target: { value: '' } });

    const botonGuardar = screen.getByText('Crear Producto');
    fireEvent.click(botonGuardar);

    expect(screen.getByRole('alert')).toHaveTextContent('Todos los campos son obligatorios');
  });

});