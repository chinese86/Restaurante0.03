
Documentación de Cambios - Proyecto Camper Café
Introducción
En este documento se implementan las modificaciones realizadas en la aplicación web del Camper Café para implementar la persistencia remota de las categorías y productos, haciendo uso de la Api y su documentación. Antes de estos cambios, la aplicación solo guardaba los datos localmente en el navegador, perdiéndose al recargar la página. Ahora, todos los datos se almacenan en un servidor remoto.
Objetivos de los cambios
El objetivo principal ha sido conectar la aplicación con una API externa para poder:
•	Guardar las categorías del menú en un servidor
•	Modificar categorías existentes
•	Eliminar categorías
•	Recuperar todas las categorías al cargar la aplicación
De esta forma, los datos persisten entre sesiones y pueden ser accedidos desde diferentes dispositivos.
Métodos HTTP implementados
Para comunicarnos con el servidor, se han implementado los cuatro métodos HTTP principales:
GET: Obtener datos del servidor (cargar categorías) POST: Enviar datos nuevos al servidor (crear categoría) PUT: Actualizar datos existentes (modificar categoría) DELETE: Eliminar datos del servidor (borrar categoría)
Cambios en el archivo Category.jsx
Este archivo contiene el componente que muestra cada categoría individual con sus botones de modificar y borrar. Se han realizado dos mejoras principales:
Implementación del borrado de categorías
Anteriormente, la función borrarCategoria() solo eliminaba la categoría de la vista local, pero no del servidor. Ahora realiza los siguientes pasos:
1.	Hace una petición DELETE a la API con el ID de la categoría a eliminar
2.	Espera la confirmación del servidor
3.	Si la eliminación es exitosa, actualiza la vista eliminando la categoría del listado
4.	Si hay algún error, muestra un mensaje al usuario
El código utiliza una estructura try-catch para manejar posibles errores de conexión o del servidor.
Implementación de la modificación de categorías
La función modificarCategoria() ahora tiene dos modos de funcionamiento:
Modo edición: Cuando el usuario pulsa "Modificar", se activa un campo de texto donde puede cambiar el nombre de la categoría.
Modo guardado: Cuando el usuario pulsa "Guardar", la función:
•	Envía el nuevo nombre al servidor mediante una petición PUT
•	Espera la confirmación
•	Actualiza la vista con el nuevo nombre
•	Vuelve al modo de solo lectura

Igual que con el borrado, se incluye manejo de errores para informar al usuario si algo falla.

 

Mejora en la visualización
Se ha modificado el componente CategoriaLectura para que siempre muestre el nombre actualizado de la categoría, utilizando la variable nuevaCategoria en lugar de name, que solo contiene el valor inicial.
Cambios en el archivo EntradaCategoria.jsx
Este componente gestiona el formulario para añadir nuevas categorías. Las mejoras implementadas son:
Validación de entrada
Antes de enviar datos al servidor, se verifica que el usuario haya escrito algo en el campo. Si está vacío, se muestra un mensaje de alerta.
Limpieza del formulario
Después de crear exitosamente una categoría, el campo de texto se limpia automáticamente, quedando listo para añadir otra categoría.
Control del valor del input
Se ha añadido la propiedad value al campo de texto, vinculándola con el estado nuevaCategoria. Esto permite limpiar el campo programáticamente y mantener sincronizado el estado con lo que ve el usuario.
Manejo de errores mejorado
Se incluye un bloque try-catch que captura cualquier error durante la creación y muestra un mensaje al usuario, evitando que la aplicación se rompa si hay problemas de conexión.

 


 
Funcionamiento general del flujo de datos
Al cargar la aplicación
1.	El componente App.jsx hace una petición GET a la API
2.	Recibe todas las categorías del usuario
3.	Actualiza el estado con estos datos
4.	Los componentes hijos se renderizan mostrando las categorías
Al crear una categoría
1.	El usuario escribe el nombre y pulsa "Añadir categoría"
2.	Se valida que el campo no esté vacío
3.	Se envía una petición POST al servidor con el nombre
4.	El servidor responde con el ID de la categoría creada
5.	Se añade la categoría al estado local con su ID
6.	La vista se actualiza mostrando la nueva categoría
Al modificar una categoría
1.	El usuario pulsa "Modificar" en una categoría
2.	Aparece un campo de texto con el nombre actual
3.	El usuario modifica el texto y pulsa "Guardar"
4.	Se envía una petición PUT al servidor con el nuevo nombre
5.	El servidor actualiza la categoría
6.	Se actualiza el estado local con el nuevo nombre
7.	La vista vuelve al modo de solo lectura mostrando el cambio

Al borrar una categoría
1.	El usuario pulsa "Borrar" en una categoría
2.	Se envía una petición DELETE al servidor con el ID de la categoría
3.	El servidor elimina la categoría de la base de datos
4.	Se elimina la categoría del estado local
5.	La vista se actualiza ocultando la categoría eliminada
Configuración del usuario_id
Todas las peticiones a la API incluyen un parámetro usuario_id que identifica al usuario que realiza la operación. Este valor debe ser los últimos cuatro dígitos del DNI o NIE del usuario, en mi caso 5396.
En el código actual aparece en los siguientes lugares:
•	En EntradaCategoria.jsx, dentro de la función incluirCategoria
•	En Category.jsx, dentro de la función modificarCategoria
•	En Category.jsx, dentro de la función borrarCategoria
También aparece en la URL del GET en App.jsx al cargar las categorías iniciales.
Consideraciones técnicas
Manejo de errores
Cada operación está envuelta en un bloque try-catch que captura posibles fallos y los gestiona de forma apropiada, mostrando mensajes al usuario cuando es necesario.
Actualización del estado
Después de cada operación exitosa en el servidor, se actualiza el estado local de React para mantener sincronizada la vista con los datos del servidor. Esto se hace creando copias del estado actual, modificándolas y actualizando el estado con las copias modificadas.
Conclusiones
Los cambios implementados transforman la aplicación de un gestor local a uno conectado con un backend real, permitiendo que los datos se mantengan entre sesiones y acceso desde múltiples dispositivos. La estructura del código mantiene una separación clara entre la lógica de comunicación con la API y la lógica de presentación, facilitando futuras modificaciones y mantenimiento.


