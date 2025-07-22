import React, { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    ciudad: '',
    profesion: ''
  });

  // Cargar datos iniciales desde localStorage
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    }
  }, []);

  // Guardar en localStorage cada vez que cambie la lista de usuarios
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  // Validar formulario
  const validarFormulario = () => {
    const { nombre, email, telefono, edad } = formulario;
    
    if (!nombre.trim()) {
      alert('El nombre es obligatorio');
      return false;
    }
    
    if (!email.trim()) {
      alert('El email es obligatorio');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('El email no tiene un formato válido');
      return false;
    }
    
    if (!telefono.trim()) {
      alert('El teléfono es obligatorio');
      return false;
    }
    
    if (!edad || edad < 1 || edad > 120) {
      alert('La edad debe ser un número entre 1 y 120');
      return false;
    }
    
    return true;
  };

  // Crear o actualizar usuario
  const guardarUsuario = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    if (usuarioEditando) {
      // Actualizar usuario existente
      setUsuarios(usuarios.map(usuario => 
        usuario.id === usuarioEditando ? { ...formulario, id: usuarioEditando } : usuario
      ));
      setUsuarioEditando(null);
    } else {
      // Crear nuevo usuario
      const nuevoUsuario = {
        ...formulario,
        id: Date.now() // ID simple basado en timestamp
      };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    // Limpiar formulario
    setFormulario({
      nombre: '',
      email: '',
      telefono: '',
      edad: '',
      ciudad: '',
      profesion: ''
    });
  };

  // Editar usuario
  const editarUsuario = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setFormulario(usuario);
      setUsuarioEditando(id);
    }
  };

  // Eliminar usuario
  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setUsuarioEditando(null);
    setFormulario({
      nombre: '',
      email: '',
      telefono: '',
      edad: '',
      ciudad: '',
      profesion: ''
    });
  };

  // Filtrar usuarios basado en la búsqueda
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.profesion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>👥 Gestión de Usuarios</h1>
      
      {/* Formulario de usuario */}
      <form onSubmit={guardarUsuario} className="user-form">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>
          {usuarioEditando ? '✏️ Editar Usuario' : '➕ Agregar Nuevo Usuario'}
        </h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ingresa el nombre completo"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formulario.email}
              onChange={manejarCambio}
              placeholder="usuario@ejemplo.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              placeholder="123-456-7890"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edad">Edad *</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formulario.edad}
              onChange={manejarCambio}
              placeholder="25"
              min="1"
              max="120"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formulario.ciudad}
              onChange={manejarCambio}
              placeholder="Ciudad de residencia"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profesion">Profesión</label>
            <input
              type="text"
              id="profesion"
              name="profesion"
              value={formulario.profesion}
              onChange={manejarCambio}
              placeholder="Desarrollador, Diseñador, etc."
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary">
            {usuarioEditando ? '💾 Actualizar' : '➕ Agregar'} Usuario
          </button>
          
          {usuarioEditando && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={cancelarEdicion}
            >
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Contador y búsqueda */}
      <div className="user-count">
        📊 Total de usuarios: {usuarios.length}
      </div>

      {usuarios.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar usuarios por nombre, email, ciudad o profesión..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      )}

      {/* Lista de usuarios */}
      {usuariosFiltrados.length === 0 ? (
        <div className="no-users">
          {usuarios.length === 0 
            ? "No hay usuarios registrados. ¡Agrega el primero!" 
            : "No se encontraron usuarios que coincidan con la búsqueda."}
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Ciudad</th>
              <th>Profesión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id}>
                <td><strong>{usuario.nombre}</strong></td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.edad} años</td>
                <td>{usuario.ciudad || 'No especificada'}</td>
                <td>{usuario.profesion || 'No especificada'}</td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => editarUsuario(usuario.id)}
                      title="Editar usuario"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => eliminarUsuario(usuario.id)}
                      title="Eliminar usuario"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
