# ☕ Camper Café: Documentación de Cambios (Persistencia Remota)

En este documento se detallan las modificaciones realizadas en la aplicación web de Camper Café para implementar la **persistencia remota** de las categorías y productos, haciendo uso de una API externa.

**Antes de estos cambios,** la aplicación solo guardaba los datos localmente en el navegador, perdiéndose al recargar la página. **Ahora,** todos los datos se almacenan y se gestionan a través de un servidor remoto.

---

## ✨ Objetivos Principales de la Implementación

El objetivo principal ha sido conectar la aplicación con una API externa para asegurar que los datos persisten entre sesiones y pueden ser accedidos desde diferentes dispositivos.

Las funcionalidades añadidas incluyen:

* **Guardar** las categorías del menú en un servidor.
* **Modificar** categorías existentes.
* **Eliminar** categorías.
* **Recuperar** todas las categorías al cargar la aplicación.

## 🌐 Métodos HTTP Implementados

Para la comunicación con el servidor, se han implementado los cuatro métodos HTTP principales, asegurando el ciclo completo de un CRUD (Create, Read, Update, Delete):

| Método HTTP | Propósito | Operación |
| :--- | :--- | :--- |
| **GET** | Obtener datos del servidor | Cargar categorías iniciales |
| **POST** | Enviar datos nuevos al servidor | Crear nueva categoría |
| **PUT** | Actualizar datos existentes | Modificar nombre de categoría |
| **DELETE** | Eliminar datos del servidor | Borrar categoría |

---

## 💻 Cambios por Componente

### 📂 `Category.jsx` (Componente de Categoría Individual)

Se realizaron mejoras clave para manejar la persistencia de las operaciones de borrado y modificación:

#### 1. Implementación del Borrado de Categorías (`borrarCategoria()`)

La función ahora realiza los siguientes pasos para eliminar la categoría del servidor:
* Realiza una petición **`DELETE`** a la API utilizando el ID de la categoría.
* Utiliza una estructura `try-catch` para manejar errores de conexión.
* Si la eliminación es exitosa, actualiza el estado local de React para eliminar la categoría de la vista.

#### 2. Implementación de la Modificación de Categorías (`modificarCategoria()`)

La función ahora alterna entre dos modos con la lógica de persistencia incluida:
* **Modo Edición:** Activa un campo de texto al pulsar "Modificar".
* **Modo Guardado:**
    * Envía el nuevo nombre al servidor mediante una petición **`PUT`**.
    * Actualiza el estado local con el nuevo nombre.
    * Vuelve al modo de solo lectura.
* Incluye manejo de errores (`try-catch`) para informar al usuario sobre cualquier fallo en la actualización.

#### 3. Mejora en la Visualización
Se modificó el componente para usar la variable `nuevaCategoria` en lugar de `name`, garantizando que siempre se muestre el nombre **actualizado** de la categoría.

---

### 📂 `EntradaCategoria.jsx` (Formulario de Creación de Categorías)

Se mejoró la experiencia de usuario y la robustez del formulario:

* **Validación de Entrada:** Se verifica que el campo de texto no esté vacío antes de enviar la petición `POST`. Si lo está, se muestra un mensaje de alerta.
* **Limpieza del Formulario:** Tras crear una categoría con éxito, el campo de texto se limpia automáticamente (`value` vinculado con el estado `nuevaCategoria`).
* **Manejo de Errores Mejorado:** Se incluye un bloque `try-catch` para capturar errores durante la creación y notificar al usuario, evitando fallos en la aplicación.

---

## 📈 Funcionamiento General del Flujo de Datos

| Evento | Descripción del Flujo |
| :--- | :--- |
| **Al cargar la aplicación** | `App.jsx` ejecuta una petición **`GET`** a la API, recibe todas las categorías del usuario, actualiza el estado local y los componentes hijos se renderizan. |
| **Al crear una categoría** | Se valida el campo, se envía una petición **`POST`** a la API, y tras recibir el ID de la respuesta, se actualiza el estado local con la nueva categoría. |
| **Al modificar una categoría** | Se edita el nombre y se envía una petición **`PUT`** al servidor. Tras la confirmación, se actualiza el estado local y la vista vuelve a solo lectura. |
| **Al borrar una categoría** | Se envía una petición **`DELETE`** a la API con el ID. Tras la eliminación en el servidor, se elimina del estado local y se oculta de la vista. |

---

## 🔑 Configuración del `usuario_id`

Todas las peticiones a la API incluyen el parámetro `usuario_id` para identificar al usuario que realiza la operación.

> **Mi `usuario_id` es:** `5396` (los últimos cuatro dígitos del DNI/NIE).

Este valor aparece configurado en:
* `EntradaCategoria.jsx` (dentro de `incluirCategoria`).
* `Category.jsx` (dentro de `modificarCategoria` y `borrarCategoria`).
* La URL de la petición `GET` en `App.jsx` al cargar las categorías iniciales.

---

## ⚙️ Consideraciones Técnicas

* **Manejo de Errores:** Cada operación de la API está envuelta en un bloque **`try-catch`** para gestionar fallos de red o del servidor, manteniendo la robustez de la aplicación.
* **Actualización del Estado:** Después de cada operación exitosa, el estado local de React se actualiza de forma inmutable (creando copias, modificándolas y actualizando) para sincronizar la vista con los datos persistentes del servidor.

## ✅ Conclusiones

Los cambios implementados han transformado la aplicación de un gestor de datos temporal a una herramienta conectada con un *backend* real. La estructura del código mantiene la **separación de responsabilidades** entre la lógica de comunicación con la API y la lógica de presentación, facilitando el mantenimiento y las futuras expansiones del proyecto.


