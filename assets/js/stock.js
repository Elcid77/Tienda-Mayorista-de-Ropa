// Función para mostrar el stock actual en la tabla
function mostrarStock() {
    // Selecciona el cuerpo de la tabla con id 'stockTable'
    const stockTableBody = document.querySelector("#stockTable tbody");

 
    stockTableBody.innerHTML = "";

   
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
            <td>$${item.costoProducto.toFixed(2)}</td> <!-- Muestra el costo del producto -->
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
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    const prenda = stock.find(item => item.id === id);

    if (prenda) {
        document.getElementById('editId').value = prenda.id;
        document.getElementById('editTipoPrenda').value = prenda.tipoPrenda;
        document.getElementById('editCantidad').value = prenda.cantidad;
        document.getElementById('editCosto').value = prenda.costoProducto;

        // Muestra el modal de edición
        abrirModal();
    }
}


function abrirModal() {
    const modal = document.getElementById('modalEditar');
    modal.style.display = 'block'; // Muestra el modal
}


function cerrarModal() {
    const modal = document.getElementById('modalEditar');
    modal.style.display = 'none'; // Oculta el modal
}

// Maneja el evento de envío del formulario de edición de prenda
document.getElementById('formEditarPrenda').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const tipoPrenda = document.getElementById('editTipoPrenda').value;
    const cantidad = parseInt(document.getElementById('editCantidad').value);
    const costoProducto = parseFloat(document.getElementById('editCosto').value);
    const imagenInput = document.getElementById('editImagen');

    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    const prenda = stock.find(item => item.id === id);

    if (prenda) {
        prenda.tipoPrenda = tipoPrenda;
        prenda.cantidad = cantidad;
        prenda.costoProducto = costoProducto;

        if (imagenInput.files.length > 0) {
            const imagen = imagenInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                prenda.imagen = event.target.result;
                localStorage.setItem('stock', JSON.stringify(stock));
                mostrarStock();
                cerrarModal(); // Cierra el modal
                alert("Prenda actualizada exitosamente.");
            };

            reader.readAsDataURL(imagen);
        } else {
            localStorage.setItem('stock', JSON.stringify(stock));
            mostrarStock();
            cerrarModal(); // Cierra el modal
            alert("Prenda actualizada exitosamente.");
        }
    }
});

// Función para eliminar una prenda
function eliminarPrenda(id) {
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    const indice = stock.findIndex(item => item.id === id);

    if (indice !== -1) {
        let confirmar = confirm("¿Estás seguro de que quieres eliminar la prenda?");

        if (confirmar) {
            stock.splice(indice, 1);
            localStorage.setItem('stock', JSON.stringify(stock));
            mostrarStock();
            alert("Prenda eliminada exitosamente.");
        }
    } else {
        alert("Prenda no encontrada.");
    }
}

// Cuando el documento se carga completamente, se llama a la función mostrarStock para mostrar el stock en la tabla
document.addEventListener('DOMContentLoaded', mostrarStock);
