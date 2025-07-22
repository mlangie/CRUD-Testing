import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Pruebas E2E (usando Testing Library como simulación)
describe('App - Pruebas End-to-End', () => {
  beforeEach(() => {
    localStorage.clear();
    global.alert = jest.fn();
    global.confirm = jest.fn(() => true);
  });

  test('escenario completo: usuario gestiona lista de contactos', () => {
    render(<App />);
    
    // 1. Verificar estado inicial
    expect(screen.getByText('No hay usuarios registrados. ¡Agrega el primero!')).toBeInTheDocument();
    
    // 2. Agregar primer usuario
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'juan@empresa.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '555-0123' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '28' } });
    fireEvent.change(screen.getByLabelText('Ciudad'), { target: { value: 'Madrid' } });
    fireEvent.change(screen.getByLabelText('Profesión'), { target: { value: 'Desarrollador' } });
    
    fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    
    // 3. Verificar que se agregó
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('📊 Total de usuarios: 1')).toBeInTheDocument();
    
    // 4. Agregar segundo usuario
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'María López' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'maria@empresa.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '555-0456' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText('Ciudad'), { target: { value: 'Barcelona' } });
    fireEvent.change(screen.getByLabelText('Profesión'), { target: { value: 'Diseñadora' } });
    
    fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    
    // 5. Verificar ambos usuarios
    expect(screen.getByText('📊 Total de usuarios: 2')).toBeInTheDocument();
    
    // 6. Probar búsqueda
    const searchInput = screen.getByPlaceholderText(/Buscar usuarios/);
    fireEvent.change(searchInput, { target: { value: 'María' } });
    
    expect(screen.getByText('María López')).toBeInTheDocument();
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    
    // 7. Limpiar búsqueda
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('María López')).toBeInTheDocument();
    
    // 8. Editar usuario
    const editButtons = screen.getAllByTitle('Editar usuario');
    fireEvent.click(editButtons[0]);
    
    expect(screen.getByText('✏️ Editar Usuario')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Profesión'), { target: { value: 'Senior Developer' } });
    fireEvent.click(screen.getByText('💾 Actualizar Usuario'));
    
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    
    // 9. Eliminar usuario
    const deleteButtons = screen.getAllByTitle('Eliminar usuario');
    fireEvent.click(deleteButtons[1]);
    
    expect(screen.getByText('📊 Total de usuarios: 1')).toBeInTheDocument();
    expect(screen.queryByText('María López')).not.toBeInTheDocument();
  });

  test('validación de formulario completa', () => {
    render(<App />);
    
    // Probar validación de email
    fireEvent.change(screen.getByLabelText('Nombre *'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'email-invalido' } });
    fireEvent.change(screen.getByLabelText('Teléfono *'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '25' } });
    
    fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    expect(global.alert).toHaveBeenCalledWith('El email no tiene un formato válido');
    
    // Probar validación de edad
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@valid.com' } });
    fireEvent.change(screen.getByLabelText('Edad *'), { target: { value: '150' } });
    
    fireEvent.click(screen.getByText('➕ Agregar Usuario'));
    expect(global.alert).toHaveBeenCalledWith('La edad debe ser un número entre 1 y 120');
  });
});
