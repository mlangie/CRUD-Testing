import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Pruebas de integración
describe('App - Pruebas de Integración', () => {
  beforeEach(() => {
    localStorage.clear();
    global.confirm = jest.fn(() => true);
  });

  test('flujo completo: agregar, editar y eliminar usuario', async () => {
    render(<App />);
    
    // Agregar usuario
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '30' } });
    fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    
    // Editar usuario
    fireEvent.click(screen.getByTitle('Editar usuario'));
    expect(screen.getByText('✏️ Editar Usuario')).toBeInTheDocument();
    
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'Test User Editado' } });
    fireEvent.click(screen.getByText('💾 Actualizar Usuario'));
    
    expect(screen.getByText('Test User Editado')).toBeInTheDocument();
    
    // Eliminar usuario
    fireEvent.click(screen.getByTitle('Eliminar usuario'));
    expect(screen.queryByText('Test User Editado')).not.toBeInTheDocument();
  });

  test('búsqueda de usuarios funciona correctamente', () => {
    render(<App />);
    
    // Agregar dos usuarios
    const addUser = (name, email) => {
      fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: name } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: email } });
      fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '123456789' } });
      fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '30' } });
      fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    };
    
    addUser('Ana García', 'ana@test.com');
    addUser('Luis Pérez', 'luis@test.com');
    
    // Buscar por nombre
    const searchInput = screen.getByPlaceholderText(/Buscar usuarios/);
    fireEvent.change(searchInput, { target: { value: 'Ana' } });
    
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.queryByText('Luis Pérez')).not.toBeInTheDocument();
  });
});
