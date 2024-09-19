document.getElementById('formularioPrenda').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();

    // Obtiene y convierte el valor del campo de entrada 'idPrenda' a un número entero
    const id = parseInt(document.getElementById('idPrenda').value);

    // Obtiene el valor del campo de entrada 'tipoPrenda' y elimina espacios innecesarios
    const tipoPrenda = document.getElementById('tipoPrenda').value.trim();

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

    // Verifica que todos los campos requeridos tengan valores válidos
    if (isNaN(id) || id <= 0) {
        alert("El ID de la prenda debe ser un número entero positivo.");
        return;
    }
    if (typeof tipoPrenda !== 'string' || tipoPrenda.length === 0) {
        alert("El tipo de prenda no puede estar vacío y debe ser un texto."); // Validación para tipo de prenda
        return;
    }
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser un número entero positivo.");
        return;
    }
    if (isNaN(costoProducto) || costoProducto < 0) {
        alert("El costo debe ser un número decimal o entero no negativo.");
        return;
    }

    // Crea un nuevo objeto FileReader para leer el contenido de la imagen seleccionada
    const fileReader = new FileReader();

    // Lee el archivo de imagen seleccionado como una URL de datos (base64)
    fileReader.readAsDataURL(imagenInput.files[0]);

    // Evento que se activa cuando se ha leído la imagen
    fileReader.onload = function () {
        // Almacena el resultado de la lectura (imagen en formato base64) en una variable
        const imagen = fileReader.result;

        // Obtiene el stock almacenado en localStorage y lo convierte en un array de objetos
        let stock = JSON.parse(localStorage.getItem('stock')) || [];

        // Agrega un nuevo objeto de prenda al array de stock
        stock.push({ id, tipoPrenda, cantidad, costoProducto, imagen });

        // Actualiza el localStorage con el nuevo array de stock
        localStorage.setItem('stock', JSON.stringify(stock));

        // Muestra una alerta confirmando que la prenda fue agregada con éxito
        alert("Prenda agregada exitosamente.");

        // Reinicia el formulario para que quede vacío
        document.getElementById('formularioPrenda').reset();
    };
});

// Previsualización de imagen seleccionada
document.getElementById('imagenPrenda').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});
