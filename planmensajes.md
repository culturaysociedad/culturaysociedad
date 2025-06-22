# Análisis y plan de mejora para el componente de mensajes (ConversationsList)

## Análisis actual

### Fortalezas
- Permite buscar conversaciones y usuarios.
- Muestra sugerencias de usuarios con los que no hay conversación reciente.
- Modal para buscar usuarios y empezar nuevas conversaciones.
- Visualmente limpio y funcional en escritorio.

### Problemas y oportunidades de mejora en móvil
1. **Espacio y navegación:**
   - El header y la lista ocupan mucho espacio vertical, dificultando la navegación en pantallas pequeñas.
   - El botón para iniciar nueva conversación solo aparece cuando no hay conversaciones, lo que puede confundir al usuario.
2. **Accesibilidad y usabilidad:**
   - Los elementos interactivos pueden ser pequeños para tocar en móvil.
   - No hay feedback visual claro al seleccionar una conversación.
   - El modal de búsqueda puede ser difícil de cerrar o manipular en móvil.
3. **Carga y rendimiento:**
   - No hay paginación/infinite scroll en la lista de conversaciones.
   - Las imágenes de avatar no usan `loading="lazy"`.
4. **Consistencia visual:**
   - El diseño de los ítems de conversación y sugerencias puede no estar optimizado para pantallas pequeñas.
   - El modal puede tapar elementos importantes.
5. **Funcionalidad:**
   - No hay indicadores de mensajes no leídos.
   - No se muestra el estado en línea de los usuarios.
   - No hay opción rápida para archivar/eliminar conversaciones.

---

## Plan de mejora visual y funcional para móvil

### 1. Diseño y Layout
- Usar un layout tipo “bottom sheet” para el modal de búsqueda en móvil.
- Hacer sticky el input de búsqueda en la parte superior.
- Aumentar el tamaño de los ítems de conversación y sugerencias para facilitar el toque.
- Optimizar el espacio: mostrar solo los elementos esenciales y ocultar detalles secundarios bajo un “ver más”.

### 2. Navegación y accesibilidad
- Añadir un botón flotante (+) siempre visible para iniciar nueva conversación.
- Mejorar el feedback visual al seleccionar una conversación (resaltado claro).
- Asegurar que todos los botones tengan un tamaño mínimo táctil (48x48px).
- Permitir cerrar el modal deslizando hacia abajo o con un botón grande y visible.

### 3. Funcionalidad
- Añadir badges de mensajes no leídos en cada conversación.
- Mostrar el estado en línea/offline de los usuarios.
- Implementar paginación o infinite scroll en la lista de conversaciones.
- Permitir archivar/eliminar conversaciones con swipe o menú contextual.

### 4. Rendimiento y optimización
- Usar `loading="lazy"` en los avatares.
- Optimizar las consultas a la base de datos para cargar solo lo necesario.

### 5. Consistencia visual
- Unificar el estilo de los ítems de conversación y sugerencias.
- Usar colores y tipografía consistentes con el resto de la app.
- Asegurar contraste suficiente para accesibilidad.

---

**Siguiente paso sugerido:**
Priorizar la implementación del botón flotante para nueva conversación y la mejora del modal de búsqueda para móvil.
