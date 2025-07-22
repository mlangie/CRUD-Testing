import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Pruebas unitarias
describe('App - Pruebas Unitarias', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renderiza título principal', () => {
    render(<App />);
    expect(screen.getByText('👥 Gestión de Usuarios')).toBeInTheDocument();
  });

  test('muestra formulario de agregar usuario', () => {
    render(<App />);
    expect(screen.getByText('➕ Agregar Nuevo Usuario')).toBeInTheDocument();
  });

  test('valida campos obligatorios', () => {
    render(<App />);
    
    global.alert = jest.fn();
    const submitBtn = screen.getByText('➕ Agregar Usuario');
    fireEvent.click(submitBtn);
    
    expect(global.alert).toHaveBeenCalledWith('El nombre es obligatorio');
  });

  test('agrega usuario válido', () => {
    render(<App />);
    
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '25' } });
    
    const submitBtn = screen.getByText('➕ Agregar Usuario');
    fireEvent.click(submitBtn);
    
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });
});
