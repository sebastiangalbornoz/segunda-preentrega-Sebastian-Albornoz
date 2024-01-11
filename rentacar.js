// rentacar.js
const preciosAutos = {
    sedan: 50,
    suv: 70,
    convertible: 100
};

const lugaresParaVisitar = [
    { nombre: 'Cerro Campanario', tipo: 'paisaje' },
    { nombre: 'Museo de la Patagonia', tipo: 'museo' },
    { nombre: 'Cerro Catedral', tipo: 'aventura' },
    // Agrega más lugares según sea necesario
];

// Obtener referencias a los elementos HTML
const autoSelect = document.getElementById('autoSelect');
const fechaInicioInput = document.getElementById('fechaInicio');
const fechaFinInput = document.getElementById('fechaFin');
const totalPagarElement = document.getElementById('totalPagar');
const tipoLugarSelect = document.getElementById('tipoLugar');
const resultadosLugaresElement = document.getElementById('resultadosLugares');

// Agregar event listener para actualizar el precio cuando se cambia el tipo de auto
autoSelect.addEventListener('change', actualizarPrecio);

// Agregar event listener para actualizar el precio cuando se cambia la fecha de inicio o fin
fechaInicioInput.addEventListener('change', actualizarPrecio);
fechaFinInput.addEventListener('change', actualizarPrecio);

// Agregar event listener para buscar lugares cuando se cambia el tipo de lugar
tipoLugarSelect.addEventListener('change', buscarLugar);

function actualizarPrecio() {
    const autoSeleccionado = autoSelect.value;
    const precioAuto = preciosAutos[autoSeleccionado];

    // Obtener la cantidad de días seleccionados
    const cantidadDias = obtenerCantidadDias();

    // Verificar si las fechas son válidas y los valores numéricos
    if (!isNaN(precioAuto) && !isNaN(cantidadDias) && cantidadDias >= 0) {
        // Calcular el total a pagar
        const totalPagar = precioAuto * cantidadDias;

        // Actualizar el contenido del elemento HTML
        totalPagarElement.textContent = `$${totalPagar}`;

        // Mostrar el resultado usando la función de salida
        mostrarResultado(`Total a Pagar: $${totalPagar}`);
    } else {
        // Si hay algún problema, mostrar un mensaje de error o manejar la situación según sea necesario
        totalPagarElement.textContent = 'Error en el cálculo';

        // Mostrar el mensaje de error usando la función de salida
        mostrarResultado('Error en el cálculo');
    }
}

function obtenerCantidadDias() {
    const fechaInicio = new Date(fechaInicioInput.value);
    const fechaFin = new Date(fechaFinInput.value);

    // Verificar si las fechas son válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        return 0;
    }

    // Calcular la diferencia de días solo si la fecha de inicio es anterior a la fecha de fin
    if (fechaInicio <= fechaFin) {
        const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
        return diferenciaDias;
    } else {
        return 0;
    }
}

function buscarLugar() {
    const tipoSeleccionado = tipoLugarSelect.value;
    const lugaresFiltrados = buscarLugarPorTipo(tipoSeleccionado);

    // Mostrar los resultados en el elemento HTML
    mostrarResultadosLugares(lugaresFiltrados);
}

function buscarLugarPorTipo(tipo) {
    return lugaresParaVisitar.filter(lugar => lugar.tipo === tipo);
}

function mostrarResultadosLugares(resultados) {
    // Limpiar resultados anteriores
    resultadosLugaresElement.innerHTML = '';

    // Mostrar los nuevos resultados
    resultados.forEach(lugar => {
        const lugarElement = document.createElement('p');
        lugarElement.textContent = lugar.nombre;
        resultadosLugaresElement.appendChild(lugarElement);
    });
}

// Función para mostrar el resultado usando alert()
function mostrarResultadoAlert(mensaje) {
    alert(mensaje);
}

// Función para mostrar el resultado usando console.log()
function mostrarResultadoConsola(mensaje) {
    console.log(mensaje);
}

// La función alquilarAuto permanece sin cambios
function alquilarAuto() {
    // ... (código existente para la función alquilarAuto)
    const mensaje = 'Mensaje de prueba'; // Reemplaza esto con el mensaje que deseas mostrar
    // Llamada a la función de salida
    mostrarResultadoConsola(mensaje);
}
