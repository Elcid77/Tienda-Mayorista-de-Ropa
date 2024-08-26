// Función para mostrar el stock actual en la tabla
function mostrarStock() {
    // Selecciona el cuerpo de la tabla con id 'stockTable'
    const stockTableBody = document.querySelector("#stockTable tbody");

    // Limpia el contenido actual de la tabla
    stockTableBody.innerHTML = "";

    // Obtiene el stock almacenado en localStorage y lo convierte en un array de objetos
    // Si no hay nada en localStorage, se inicializa como un array vacío
    let stock = JSON.parse(localStorage.getItem('stock')) || [];

    // Recorre cada item del array de stock
    stock.forEach(item => {
        // Crea una nueva fila de tabla para cada item
        const row = document.createElement("tr");

        // Define el contenido de la fila con los datos del item
        row.innerHTML = `
            <td>${item.id}</td> <!-- Muestra el ID de la prenda -->
            <td>${item.tipoPrenda}</td> <!-- Muestra el tipo de prenda -->
            <td>${item.cantidad}</td> <!-- Muestra la cantidad de esa prenda -->
            <td>$${item.costoProducto}</td> <!-- Muestra el costo del producto -->
            <td><img src="${item.imagen}" alt="${item.tipoPrenda}" style="width: 50px; height: 50px;"></td> <!-- Muestra la imagen de la prenda -->
            <td>
                <!-- Botones para editar y eliminar la prenda -->
                <button onclick="editarPrenda(${item.id})">Editar</button>
                <button onclick="eliminarPrenda(${item.id})">Eliminar</button>
            </td>
        `;

        // Agrega la fila creada al cuerpo de la tabla
        stockTableBody.appendChild(row);
    });
}

// Función para editar una prenda específica
function editarPrenda(id) {
    // Obtiene el stock de localStorage y lo convierte en un array
    let stock = JSON.parse(localStorage.getItem('stock')) || [];

    // Busca la prenda con el id proporcionado
    const prenda = stock.find(item => item.id === id);

    // Si se encuentra la prenda
    if (prenda) {
        // Rellena el formulario del modal con los datos de la prenda
        document.getElementById('editId').value = prenda.id;
        document.getElementById('editTipoPrenda').value = prenda.tipoPrenda;
        document.getElementById('editCantidad').value = prenda.cantidad;
        document.getElementById('editCosto').value = prenda.costoProducto;

        // Muestra el modal de edición
        document.getElementById('modalEditar').style.display = 'block';
    }
}

// Función para cerrar el modal de edición
function cerrarModal() {
    // Oculta el modal de edición
    document.getElementById('modalEditar').style.display = 'none';
}

// Maneja el evento de envío del formulario de edición de prenda
document.getElementById('formEditarPrenda').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();

    // Obtiene los valores del formulario
    const id = parseInt(document.getElementById('editId').value);
    const tipoPrenda = document.getElementById('editTipoPrenda').value;
    const cantidad = parseInt(document.getElementById('editCantidad').value);
    const costoProducto = parseFloat(document.getElementById('editCosto').value);
    const imagenInput = document.getElementById('editImagen');

    // Obtiene el stock de localStorage y lo convierte en un array
    let stock = JSON.parse(localStorage.getItem('stock')) || [];

    // Encuentra la prenda a editar por su id
    const prenda = stock.find(item => item.id === id);

    // Si se encuentra la prenda
    if (prenda) {
        // Actualiza los datos de la prenda con los valores del formulario
        prenda.tipoPrenda = tipoPrenda;
        prenda.cantidad = cantidad;
        prenda.costoProducto = costoProducto;

        // Si hay una nueva imagen seleccionada
        if (imagenInput.files.length > 0) {
            const imagen = imagenInput.files[0];
            const reader = new FileReader();

            // Evento cuando se carga la nueva imagen
            reader.onload = function (event) {
                // Actualiza la imagen de la prenda con la nueva imagen en base64
                prenda.imagen = event.target.result;

                // Guarda el stock actualizado en localStorage
                localStorage.setItem('stock', JSON.stringify(stock));

                // Muestra el stock actualizado en la tabla
                mostrarStock();

                // Cierra el modal de edición
                cerrarModal();

                // Muestra un mensaje de confirmación
                alert("Prenda actualizada exitosamente.");
            };

            // Lee la nueva imagen como una URL de datos (base64)
            reader.readAsDataURL(imagen);
        } else {
            // Si no hay una nueva imagen, solo guarda los demás cambios
            localStorage.setItem('stock', JSON.stringify(stock));
            mostrarStock();
            cerrarModal();
            alert("Prenda actualizada exitosamente.");
        }
    }
});

// Función para eliminar una prenda
function eliminarPrenda(id) {
    // Obtiene el stock de localStorage y lo convierte en un array
    let stock = JSON.parse(localStorage.getItem('stock')) || [];

    // Encuentra el índice de la prenda a eliminar por su id
    const indice = stock.findIndex(item => item.id === id);

    // Si se encuentra la prenda
    if (indice !== -1) {
        // Solicita confirmación al usuario antes de eliminar
        let confirmar = confirm("¿Estás seguro de que quieres eliminar la prenda?");

        // Si el usuario confirma la eliminación
        if (confirmar) {
            // Elimina la prenda del array de stock
            stock.splice(indice, 1);

            // Guarda el stock actualizado en localStorage
            localStorage.setItem('stock', JSON.stringify(stock));

            // Muestra el stock actualizado en la tabla
            mostrarStock();

            // Muestra un mensaje de confirmación
            alert("Prenda eliminada exitosamente.");
        }
    } else {
        // Si la prenda no se encuentra, muestra un mensaje de error
        alert("Prenda no encontrada.");
    }
}

// Cuando el documento se carga completamente, se llama a la función mostrarStock para mostrar el stock en la tabla
document.addEventListener('DOMContentLoaded', mostrarStock);
