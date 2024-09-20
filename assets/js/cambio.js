async function obtenerTasasDeCambio() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
            throw new Error('Error al obtener las tasas de cambio');
        }
        const data = await response.json();

        // Extraer tasas específicas
        const tasaDolar = data.rates.USD;
        const tasaPesoUruguayo = data.rates.UYU;
        const tasaReal = data.rates.BRL;
        const tasaPesoArgentino = data.rates.ARS;

        console.log(`Tasa del dólar: ${tasaDolar}`);
        console.log(`Tasa del peso uruguayo: ${tasaPesoUruguayo}`);
        console.log(`Tasa del real brasileño: ${tasaReal}`);
        console.log(`Tasa del peso argentino: ${tasaPesoArgentino}`);

        // Puedes actualizar el DOM o usar los datos como necesites
        document.getElementById('tasa-dolar').textContent = `Dólar: ${tasaDolar}`;
        document.getElementById('tasa-peso-uruguayo').textContent = `Peso Uruguayo: ${tasaPesoUruguayo}`;
        document.getElementById('tasa-real').textContent = `Real: ${tasaReal}`;
        document.getElementById('tasa-peso-argentino').textContent = `Peso Argentino: ${tasaPesoArgentino}`;

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

// Llama a la función cuando se carga el documento
document.addEventListener('DOMContentLoaded', obtenerTasasDeCambio);
