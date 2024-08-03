// Array de objetos para representar el stock de la tienda de ropas
let stock = [
    { id: 1, tipoPrenda: 'pantalon', cantidad: 50, costoProducto: 25 },
    { id: 2, tipoPrenda: 'camisa', cantidad: 30, costoProducto: 15 },
    { id: 3, tipoPrenda: 'chaqueta', cantidad: 20, costoProducto: 50 }
];

// Función para mostrar el stock actual
function mostrarStock() {
    console.log("Stock actual:");
    stock.forEach(item => {
        console.log(`ID: ${item.id}, Tipo: ${item.tipoPrenda}, Cantidad: ${item.cantidad}, Costo: $${item.costoProducto}`);
    });
}

// Función para agregar una nueva prenda al stock
function agregarPrenda() {
    let id = parseInt(prompt("Ingrese el ID de la prenda:"));
    let tipoPrenda = prompt("Ingrese el tipo de prenda (pantalon, camisa, chaqueta, etc.):");
    let cantidad = parseInt(prompt("Ingrese la cantidad de la prenda:"));
    let costoProducto = parseFloat(prompt("Ingrese el costo del producto:"));

    stock.push({ id, tipoPrenda, cantidad, costoProducto });
    alert("Prenda agregada exitosamente.");
}

// Función para actualizar la cantidad de una prenda existente
function actualizarCantidad() {
    let id = parseInt(prompt("Ingrese el ID de la prenda a actualizar:"));
    let nuevaCantidad = parseInt(prompt("Ingrese la nueva cantidad:"));

    let prenda = stock.find(item => item.id === id);
    if (prenda) {
        prenda.cantidad = nuevaCantidad;
        alert("Cantidad actualizada exitosamente.");
    } else {
        alert("Prenda no encontrada.");
    }
}

// Función para eliminar una prenda del stock
function eliminarPrenda() {
    let id = parseInt(prompt("Ingrese el ID de la prenda a eliminar:"));

    let indice = stock.findIndex(item => item.id === id);
    if (indice !== -1) {
        let confirmar = confirm("¿Estás seguro de que quieres eliminar la prenda?")
        if (confirmar) {
            stock.splice(indice, 1);
            alert("Prenda eliminada exitosamente.");
        }
    } else {
        alert("Prenda no encontrada.");
    }
}

// Menú principal para manejar el stock
function menuPrincipal() {
    while (true) {
        let opcion = prompt(
            "Seleccione una opción:\n" +
            "1. Mostrar stock\n" +
            "2. Agregar prenda\n" +
            "3. Actualizar cantidad\n" +
            "4. Eliminar prenda\n" +
            "5. Salir"
        );

        switch (opcion) {
            case '1':
                mostrarStock();
                break;
            case '2':
                agregarPrenda();
                break;
            case '3':
                actualizarCantidad();
                break;
            case '4':
                eliminarPrenda();
                break;
            case '5':
                alert("Saliendo del programa.");
                return;
            default:
                alert("Opción inválida. Intente nuevamente.");
        }
    }
}

// Iniciar el menú principal cuando el archivo JS esté cargado
window.onload = menuPrincipal;
