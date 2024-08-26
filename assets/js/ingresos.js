// Agrega un evento de escucha para el evento 'submit' del formulario con el id 'formularioPrenda'
document.getElementById('formularioPrenda').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();

    // Obtiene y convierte el valor del campo de entrada 'idPrenda' a un número entero
    const id = parseInt(document.getElementById('idPrenda').value);

    // Obtiene el valor del campo de entrada 'tipoPrenda'
    const tipoPrenda = document.getElementById('tipoPrenda').value;

    // Obtiene y convierte el valor del campo de entrada 'cantidadPrenda' a un número entero
    const cantidad = parseInt(document.getElementById('cantidadPrenda').value);

    // Obtiene y convierte el valor del campo de entrada 'costoPrenda' a un número decimal
    const costoProducto = parseFloat(document.getElementById('costoPrenda').value);

    // Obtiene el elemento de entrada de archivo 'imagenPrenda'
    const imagenInput = document.getElementById('imagenPrenda');

    // Verifica si no se ha seleccionado ninguna imagen
    if (imagenInput.files.length === 0) {
        alert("Por favor, seleccione una imagen."); // Muestra una alerta solicitando la selección de una imagen
        return; // Sale de la función si no se seleccionó ninguna imagen
    }

    // Crea un nuevo objeto FileReader para leer el contenido de la imagen seleccionada
    const fileReader = new FileReader();

    // Lee el archivo de imagen seleccionado como una URL de datos (base64)
    fileReader.readAsDataURL(imagenInput.files[0]);

    // Evento que se activa cuando se ha leído la imagen
    fileReader.onload = function () {
        // Almacena el resultado de la lectura (imagen en formato base64) en una variable
        const imagen = fileReader.result;

        // Verifica que todos los campos requeridos tengan valores válidos
        if (!isNaN(id) && tipoPrenda && !isNaN(cantidad) && !isNaN(costoProducto)) {
            // Obtiene el stock almacenado en localStorage y lo convierte en un array de objetos
            // Si no hay stock en localStorage, se inicializa como un array vacío
            let stock = JSON.parse(localStorage.getItem('stock')) || [];

            // Agrega un nuevo objeto de prenda al array de stock
            stock.push({ id, tipoPrenda, cantidad, costoProducto, imagen });

            // Actualiza el localStorage con el nuevo array de stock
            localStorage.setItem('stock', JSON.stringify(stock));

            // Muestra una alerta confirmando que la prenda fue agregada con éxito
            alert("Prenda agregada exitosamente.");

            // Reinicia el formulario para que quede vacío
            document.getElementById('formularioPrenda').reset();
        } else {
            // Muestra una alerta solicitando al usuario que complete todos los campos correctamente
            alert("Por favor, complete todos los campos correctamente.");
        }
    };
});
