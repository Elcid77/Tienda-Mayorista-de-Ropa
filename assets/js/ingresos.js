document.getElementById('formularioPrenda').addEventListener('submit', function (event) {
   
    event.preventDefault();

    
    const id = parseInt(document.getElementById('idPrenda').value);

    const tipoPrenda = document.getElementById('tipoPrenda').value.trim();

    const cantidad = parseInt(document.getElementById('cantidadPrenda').value);

    const costoProducto = parseFloat(document.getElementById('costoPrenda').value);

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


    const fileReader = new FileReader();

   
    fileReader.readAsDataURL(imagenInput.files[0]);

    
    fileReader.onload = function () {
        
        const imagen = fileReader.result;

        let stock = JSON.parse(localStorage.getItem('stock')) || [];

      
        stock.push({ id, tipoPrenda, cantidad, costoProducto, imagen });

     
        localStorage.setItem('stock', JSON.stringify(stock));

       
        alert("Prenda agregada exitosamente.");

      
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
