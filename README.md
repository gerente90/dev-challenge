# dev-challenge

# Proyecto "Desafía y Salva"

**Desafía y Salva** está bien estructurado y enfocado en promover desafíos ambientales para involucrar a las comunidades en prácticas sostenibles. A continuación, se detalla el análisis de los principales archivos:

## Archivos del Proyecto

### `index.html`
- **Propósito**: Actúa como la página principal, introduciendo el proyecto y mostrando una lista de desafíos con premios.
- **Elementos clave**:
  - Header con un logo y navegación clara.
  - Sección de desafíos ambientales organizados en tarjetas con imágenes y botones para obtener más información.
  - Pie de página para derechos de autor.

### `features.html`
- **Propósito**: Describe las características del proyecto, destacando sus objetivos relacionados con la educación ambiental, energías renovables y conservación.
- **Elementos clave**:
  - Sección "Características" con un mensaje claro y una imagen ilustrativa.
  - Mantiene la misma estructura de navegación y estilo que la página principal.

### `info.html`
- **Propósito**: Proporciona información de contacto para resolver dudas.
- **Elementos clave**:
  - Contiene una sección con correos electrónicos y números de contacto.
  - Diseño visual consistente con las otras páginas.

### `join.html`
- **Propósito**: Permitir a los usuarios unirse al proyecto llenando un formulario con su información personal.
- **Características principales**:
  - Formulario con campos para nombre, apellido, correo electrónico y cédula.
  - Botón de guardar con un evento manejado por `script.js`.
- **Observaciones**: El formulario está bien estructurado, pero falta agregar validación al `script.js` para manejar los datos enviados.

### `rewards.html`
- **Propósito**: Proporcionar información detallada sobre los desafíos ambientales e invitar a los usuarios a inscribirse.
- **Características principales**:
  - Descripción detallada de cada desafío con un botón "Inscríbete".
  - Diseño consistente con las otras páginas.
- **Observaciones**: Asegúrate de que los enlaces de inscripción apunten a una página o funcionalidad activa.

### `script.js`
- **Propósito**: Manejar la lógica interactiva de las páginas.
- **Función `saveUser`**:
  - Registra un evento al botón "Guardar".
  - Necesita un `mensaje` definido en el HTML o un manejo más robusto para evitar errores.

### `style.css`
- **Propósito**: Estilizar todas las páginas del proyecto.
- **Aspectos destacados**:
  - Diseño limpio y bien organizado.
  - Uso de colores y sombras para diferenciar secciones y destacar elementos.
- **Observaciones**: Considera usar variables CSS para los colores y elementos repetidos, lo que facilitará futuras modificaciones.

---

&copy; 2024 Desafía y Salva. Todos los derechos reservados.
