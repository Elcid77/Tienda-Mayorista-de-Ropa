document.addEventListener('DOMContentLoaded', function () {
    try {
        const carritoBody = document.getElementById('carrito-body');
        const totalCompraElem = document.getElementById('total-compra');
        let totalCompra = 0;

        // Obtener el carrito del localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

       
        if (!Array.isArray(carrito)) {
            throw new Error('El carrito no es un array válido.');
        }

        if (carrito.length === 0) {
            carritoBody.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío</td></tr>';
            totalCompraElem.textContent = 'Total: $0.00';
            return;
        }

        // Bucle para generar las filas de la tabla del carrito
        carrito.forEach((prenda, index) => {
           
            if (!prenda.tipoPrenda || !prenda.cantidadCarrito || !prenda.costoProducto || !prenda.imagen) {
                console.warn(`Prenda con datos incompletos en el carrito en índice ${index}:`, prenda);
                return;
            }

            const fila = document.createElement('tr');

            // Crear la celda para la imagen
            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = prenda.imagen;
            img.alt = prenda.tipoPrenda;
            img.className = 'img-thumbnail';
            img.style.width = '100px';
            imgTd.appendChild(img);

         
            const nombreTd = document.createElement('td');
            nombreTd.textContent = prenda.tipoPrenda;

           
            const cantidadTd = document.createElement('td');
            cantidadTd.textContent = prenda.cantidadCarrito;

            const precioTd = document.createElement('td');
            precioTd.textContent = `$${prenda.costoProducto}`;

            const totalTd = document.createElement('td');
            const totalPorPrenda = prenda.cantidadCarrito * prenda.costoProducto;
            totalTd.textContent = `$${totalPorPrenda.toFixed(2)}`;

            totalCompra += totalPorPrenda;

         
            fila.appendChild(imgTd);
            fila.appendChild(nombreTd);
            fila.appendChild(cantidadTd);
            fila.appendChild(precioTd);
            fila.appendChild(totalTd);

         
            carritoBody.appendChild(fila);
        });

    
        totalCompraElem.textContent = `Total: $${totalCompra.toFixed(2)}`;

       
        document.getElementById('anular-compra').addEventListener('click', function () {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción vaciará el carrito y repondrá el stock.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, anular',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    reponerStock(); 
                    localStorage.removeItem('carrito'); 
                    location.reload();
                }
            });
        });

        
        document.getElementById('realizar-compra').addEventListener('click', finalizarCompra);

    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al cargar el carrito.',
        });
    }
});

// Función para finalizar la compra y actualizar el stock
function finalizarCompra() {
    try {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let stock = JSON.parse(localStorage.getItem('stock')) || [];

        carrito.forEach(itemCarrito => {
            const productoEnStock = stock.find(prenda => prenda.id === itemCarrito.id);
            if (productoEnStock) {
                productoEnStock.cantidad -= itemCarrito.cantidadCarrito;

                // Asegurar que el stock no sea negativo
                if (productoEnStock.cantidad < 0) {
                    productoEnStock.cantidad = 0;
                }
            }
        });

        localStorage.setItem('stock', JSON.stringify(stock)); // Actualiza el stock
        localStorage.removeItem('carrito'); // Vacía el carrito

        Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            text: 'La compra se ha realizado con éxito. El stock ha sido actualizado.',
        }).then(() => {
            window.location.href = 'stock.html'; // Redirigir o recargar
        });
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al finalizar la compra.',
        });
    }
}

// Función para reponer el stock al anular la compra
function reponerStock() {
    try {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let stock = JSON.parse(localStorage.getItem('stock')) || [];

        carrito.forEach(itemCarrito => {
            const productoEnStock = stock.find(prenda => prenda.id === itemCarrito.id);
            if (productoEnStock) {
               
                productoEnStock.cantidad += itemCarrito.cantidadCarrito;
            }
        });

     
        localStorage.setItem('stock', JSON.stringify(stock));

        Swal.fire({
            icon: 'success',
            title: 'Compra anulada',
            text: 'El stock ha sido repuesto correctamente.',
        });
    } catch (error) {
        console.error('Error al reponer el stock:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al reponer el stock.',
        });
    }
}
