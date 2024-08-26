Tienda Online Mayorista - Gestión de Stock
Descripción General
Esta aplicación es una tienda online mayorista diseñada para vender productos de ropa a minoristas. La aplicación permite a los usuarios (minoristas) gestionar el stock de productos disponibles, facilitando operaciones como la visualización del inventario, la adición de nuevos productos, la actualización de cantidades existentes y la eliminación de productos obsoletos.

PRIMERA VERSION

Funcionalidades Principales
Visualización del Stock Actual

Los usuarios pueden ver una lista detallada de todos los productos disponibles en el inventario, incluyendo información como ID del producto, tipo de prenda, cantidad disponible y costo por unidad.
Adición de Nuevos Productos

Permite a los usuarios agregar nuevos productos al inventario ingresando detalles como ID, tipo de prenda, cantidad y costo del producto.
Actualización de Cantidades

Los usuarios pueden actualizar la cantidad disponible de un producto existente en el inventario, asegurando que los datos reflejen con precisión la disponibilidad actual.
Eliminación de Productos

Permite eliminar productos del inventario que ya no están disponibles o que han sido descontinuados.
Uso de la Aplicación
Para interactuar con la aplicación, se utiliza la consola del navegador web. A continuación se describe cómo se puede utilizar cada funcionalidad:

Mostrar Stock: Selecciona la opción 1 en el menú principal para ver el inventario actual.
Agregar Prenda: Selecciona la opción 2 e ingresa los detalles solicitados para añadir un nuevo producto al inventario.
Actualizar Cantidad: Selecciona la opción 3 e ingresa el ID del producto y la nueva cantidad para actualizar el inventario.
Eliminar Prenda: Selecciona la opción 4 e ingresa el ID del producto que deseas eliminar del inventario.
Salir: Selecciona la opción 5 para salir de la aplicación.

SEGUNDA VERSIÓN 

Visualización de Stock: En la página stock.html, los usuarios pueden ver todos los artículos disponibles en el inventario. Utilizamos el DOM para actualizar dinámicamente la lista de productos, mostrando para cada prenda su imagen, tipo, cantidad en stock, y costo por unidad. Además, el sistema envía alertas a los usuarios directamente en la página cuando algún artículo está agotado (cantidad igual a 0).

Ingreso de Nuevas Prendas: La página ingresos.html permite a los usuarios agregar nuevas prendas al inventario mediante un formulario HTML. Este formulario interactúa con el DOM para capturar y validar los datos proporcionados por el usuario, como el nombre del producto, la cantidad, el costo y la imagen cargada.

Edición y Actualización de Stock: Los usuarios pueden modificar los detalles de cualquier prenda existente directamente desde la página stock.html. El DOM se utiliza para identificar el elemento seleccionado y permitir modificar sus detalles, incluida la imagen. Los cambios se reflejan de inmediato en la interfaz de usuario.

Gestión de Imágenes de Prendas: Las imágenes subidas por los usuarios se guardan en localStorage como URL en formato base64, ya que JavaScript en el navegador no puede guardar archivos directamente en el sistema de archivos del usuario. No obstante, estas imágenes son referenciadas para mostrarse en la página stock.html, y se pueden agregar o cambiar utilizando la función de edición.

Persistencia de Datos con Local Storage: Toda la información del inventario, incluidas las imágenes en formato base64, se almacena en localStorage del navegador, lo que garantiza que los datos persistan incluso después de cerrar el navegador. JavaScript se utiliza para manipular el DOM, leer los datos almacenados y mostrarlos cada vez que se carga la página.

Navegación Intuitiva: El sistema ofrece un menú de navegación accesible en todas las páginas (index.html, ingresos.html, stock.html, login.html, carrito.html). Este menú, diseñado utilizando el DOM, facilita el acceso a todas las funcionalidades del sistema, proporcionando una experiencia de usuario fluida y coherente.

Alertas y Notificaciones: El sistema incluye una función de alertas que notifica a los usuarios cuando una prenda tiene una cantidad de cero, mejorando la eficiencia en la gestión del inventario.

Funciones Administrativas: En futuras versiones, el sistema permitirá a los administradores visualizar el importe total invertido en el stock y calcular la posible ganancia, mejorando la gestión financiera del inventario. Además, las compras realizadas por los usuarios (minoristas) impactarán directamente en el stock, permitiendo calcular la ganancia real de las ventas.

Gracias. Esto es todo por el momento.