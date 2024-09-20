document.addEventListener('DOMContentLoaded', function () {
    try {
        const prendasContainer = document.getElementById('prendasContainer');

        
        if (!prendasContainer) {
            throw new Error('El contenedor de prendas no existe en el DOM.');
        }

        
        let stock = JSON.parse(localStorage.getItem('stock')) || [];

        
        if (!Array.isArray(stock)) {
            throw new Error('El stock no es un array válido.');
        }

        console.log('Contenido del stock:', stock);

       
        if (stock.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Stock vacío',
                text: 'No hay prendas disponibles en el stock.',
            });
            return;
        }

        // Bucle para generar las tarjetas de las prendas
        stock.forEach((prenda, index) => {
           
            if (!prenda.tipoPrenda || !prenda.cantidad || !prenda.costoProducto || !prenda.imagen) {
                console.warn(`Prenda con datos incompletos en índice ${index}:`, prenda);
                return;
            }

            const col = document.createElement('div');
            col.className = 'col';

            const card = document.createElement('div');
            card.className = 'card h-100';

            const img = document.createElement('img');
            img.src = prenda.imagen;
            img.className = 'card-img-top';
            img.alt = prenda.tipoPrenda;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = prenda.tipoPrenda;

            const cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.id = `cantidad-${index}`;
            cardText.textContent = `Cantidad: ${prenda.cantidad}`;

            const cardPrice = document.createElement('p');
            cardPrice.className = 'card-text';
            cardPrice.textContent = `Precio: $${prenda.costoProducto}`;

            // Botón para agregar al carrito
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'btn btn-primary';
            addToCartBtn.textContent = 'Agregar al carrito';

            // Al hacer clic, agregar la prenda al carrito
            addToCartBtn.onclick = function () {
                agregarAlCarrito(prenda, index, stock);
            };

            // Añadir los elementos a la tarjeta
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(addToCartBtn);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            prendasContainer.appendChild(col);
        });
    } catch (error) {
        console.error('Error al cargar las prendas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al cargar las prendas.',
        });
    }
});

// Función para agregar prenda al carrito
function agregarAlCarrito(prenda, index, stock) {
    try {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Comprobar si la prenda está disponible
        if (prenda.cantidad <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'No Disponible',
                text: 'No está disponible por el momento.',
            });
            return;
        }

        const productoExistente = carrito.find(item => item.id === prenda.id);
        if (productoExistente) {
            // Solo aumentar en 1 la cantidad en el carrito
            if (prenda.cantidad > 0) {
                productoExistente.cantidadCarrito += 1;
                prenda.cantidad -= 1; 
                document.getElementById(`cantidad-${index}`).textContent = `Cantidad: ${prenda.cantidad}`;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No Disponible',
                    text: 'No está disponible por el momento.',
                });
                return;
            }
        } else {
            prenda.cantidadCarrito = 1; 
            carrito.push(prenda);
            prenda.cantidad -= 1; 
            document.getElementById(`cantidad-${index}`).textContent = `Cantidad: ${prenda.cantidad}`;
        }

        // Actualizar el stock en localStorage
        localStorage.setItem('stock', JSON.stringify(stock));

        // Guardar el carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: `${prenda.tipoPrenda} agregado al carrito`,
        });
    } catch (error) {
        console.error('Error al agregar la prenda al carrito:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al agregar la prenda al carrito.',
        });
    }
}
