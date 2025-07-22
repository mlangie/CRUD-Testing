#  CRUD de Usuarios - React

Una aplicación web sencilla y moderna para gestionar usuarios con funcionalidades completas de CRUD (Crear, Leer, Actualizar, Eliminar).

##  Características

-  **Crear**: Agregar nuevos usuarios con validación de formulario
-  **Leer**: Visualizar lista completa de usuarios en tabla responsive
-  **Actualizar**: Editar información de usuarios existentes
-  **Eliminar**: Remover usuarios con confirmación
-  **Búsqueda**: Filtrar usuarios por nombre, email, ciudad o profesión
-  **Persistencia**: Datos guardados en localStorage del navegador
-  **Responsive**: Diseño adaptable a dispositivos móviles
-  **UI Moderna**: Interfaz amigable con gradientes y animaciones

##  Campos del Usuario

### Campos Obligatorios (*)
- **Nombre**: Nombre completo del usuario
- **Email**: Dirección de correo electrónico (con validación)
- **Teléfono**: Número de contacto
- **Edad**: Entre 1 y 120 años

### Campos Opcionales
- **Ciudad**: Ciudad de residencia
- **Profesión**: Ocupación o profesión

##  Instalación y Uso

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

### Comandos Disponibles
```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo

# Producción
npm run build      # Construye la aplicación para producción

# Testing
npm test           # Ejecuta las pruebas

# Avanzado
npm run eject      # Expone configuración avanzada (¡irreversible!)
```

##  Cómo Usar

### Agregar Usuario
1. Completa el formulario con los datos del usuario
2. Los campos marcados con * son obligatorios
3. Haz clic en " Agregar Usuario"

### Editar Usuario
1. Haz clic en el botón  en la fila del usuario
2. Modifica los datos en el formulario
3. Haz clic en  Actualizar Usuario"

### Eliminar Usuario
1. Haz clic en el botón  en la fila del usuario
2. Confirma la eliminación en el diálogo

### Buscar Usuario
1. Usa la barra de búsqueda para filtrar usuarios
2. Busca por nombre, email, ciudad o profesión
3. Los resultados se actualizan en tiempo real

##  Tecnologías Utilizadas

- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Hooks**: useState, useEffect para manejo de estado
- **CSS3**: Estilos modernos con gradientes y animaciones
- **localStorage**: Persistencia de datos en el navegador
- **Responsive Design**: Diseño adaptable con CSS Grid y Flexbox

##  Estructura del Proyecto

```
crud-usuarios/
├── public/
│   └── index.html          # Archivo HTML principal
├── src/
│   ├── App.js              # Componente principal con lógica CRUD
│   ├── index.js            # Punto de entrada de React
│   └── index.css           # Estilos globales
├── package.json            # Configuración y dependencias
└── README.md              # Documentación
```

##  Características de Diseño

- **Colores**: Gradiente violeta-azul (#667eea a #764ba2)
- **Tipografía**: System fonts para mejor rendimiento
- **Animaciones**: Transiciones suaves en hover y focus
- **Iconos**: Emojis para mejor UX
- **Sombras**: Box-shadows sutiles para profundidad
- **Responsive**: Breakpoints para móviles y tablets

##  Personalización

Para personalizar los estilos, edita el archivo `src/index.css`:
- Cambia los colores modificando las variables de gradiente
- Ajusta el responsive design en las media queries
- Modifica animaciones y transiciones

##  Validaciones Implementadas

- **Nombre**: No puede estar vacío
- **Email**: Formato válido requerido
- **Teléfono**: Campo obligatorio
- **Edad**: Número entre 1 y 120
- **Duplicados**: Prevención de emails duplicados (opcional)

##  Mejoras Futuras

- [ ] Conexión con API backend
- [ ] Autenticación de usuarios
- [ ] Exportación de datos (PDF, Excel)
- [ ] Importación masiva de usuarios
- [ ] Filtros avanzados
- [ ] Paginación para grandes datasets
- [ ] Temas dark/light
- [ ] Notificaciones toast

##  Solución de Problemas

### La aplicación no inicia
- Verifica que Node.js esté instalado
- Ejecuta `npm install` para instalar dependencias
- Revisa que el puerto 3000 esté disponible

### Los datos no se guardan
- Verifica que el navegador tenga localStorage habilitado
- Revisa la consola del navegador para errores

### Errores de validación
- Asegúrate de completar todos los campos obligatorios (*)
- Verifica que el email tenga formato válido
- Confirma que la edad esté entre 1 y 120

##  Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.


