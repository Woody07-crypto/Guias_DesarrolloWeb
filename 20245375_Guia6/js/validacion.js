// Referencias a elementos del formulario
const formulario = document.getElementById('formulario-estudiantil');
const inputs = {
    nombre: document.getElementById('nombre'),
    carnet: document.getElementById('carnet'),
    dui: document.getElementById('dui'),
    nit: document.getElementById('nit'),
    fechaNacimiento: document.getElementById('fechaNacimiento'),
    correo: document.getElementById('correo'),
    edad: document.getElementById('edad')
};

// Expresiones regulares
const regex = {
    // Carnet: 2 letras mayúsculas y 3 números (AB001)
    carnet: /^[A-Z]{2}\d{3}$/,
    
    // Nombre: solo letras y espacios, sin números ni caracteres especiales
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    
    // DUI: 8 dígitos, guión, 1 dígito (########-#)
    dui: /^\d{8}-\d$/,
    
    // NIT: formato ####-######-###-#
    nit: /^\d{4}-\d{6}-\d{3}-\d$/,
    
    // Email: formato estándar de correo
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Edad: solo números
    edad: /^\d+$/
};

// Función para mostrar error
function mostrarError(campo, mensaje) {
    const input = inputs[campo];
    const errorSpan = document.getElementById(`error-${campo}`);
    
    input.classList.add('error');
    input.classList.remove('success');
    errorSpan.textContent = mensaje;
    errorSpan.classList.add('show');
}

// Función para mostrar éxito
function mostrarExito(campo) {
    const input = inputs[campo];
    const errorSpan = document.getElementById(`error-${campo}`);
    
    input.classList.add('success');
    input.classList.remove('error');
    errorSpan.classList.remove('show');
}

// Función para limpiar validación
function limpiarValidacion(campo) {
    const input = inputs[campo];
    const errorSpan = document.getElementById(`error-${campo}`);
    
    input.classList.remove('error', 'success');
    errorSpan.classList.remove('show');
}

// Validar nombre
function validarNombre() {
    const valor = inputs.nombre.value.trim();
    
    if (valor === '') {
        mostrarError('nombre', 'El nombre es obligatorio');
        return false;
    }
    
    if (!regex.nombre.test(valor)) {
        mostrarError('nombre', 'El nombre solo puede contener letras y espacios');
        return false;
    }
    
    mostrarExito('nombre');
    return true;
}

// Validar carnet
function validarCarnet() {
    const valor = inputs.carnet.value.trim();
    
    if (valor === '') {
        mostrarError('carnet', 'El carnet es obligatorio');
        return false;
    }
    
    if (!regex.carnet.test(valor)) {
        mostrarError('carnet', 'Formato incorrecto. Use: AB001 (2 letras mayúsculas y 3 números)');
        return false;
    }
    
    mostrarExito('carnet');
    return true;
}

// Validar DUI
function validarDUI() {
    const valor = inputs.dui.value.trim();
    
    if (valor === '') {
        mostrarError('dui', 'El DUI es obligatorio');
        return false;
    }
    
    if (!regex.dui.test(valor)) {
        mostrarError('dui', 'Formato incorrecto. Use: 12345678-9');
        return false;
    }
    
    mostrarExito('dui');
    return true;
}

// Validar NIT
function validarNIT() {
    const valor = inputs.nit.value.trim();
    
    if (valor === '') {
        mostrarError('nit', 'El NIT es obligatorio');
        return false;
    }
    
    if (!regex.nit.test(valor)) {
        mostrarError('nit', 'Formato incorrecto. Use: 1234-567890-123-4');
        return false;
    }
    
    mostrarExito('nit');
    return true;
}

// Validar fecha de nacimiento
function validarFecha() {
    const valor = inputs.fechaNacimiento.value;
    
    if (valor === '') {
        mostrarError('fecha', 'La fecha de nacimiento es obligatoria');
        return false;
    }
    
    const fechaNacimiento = new Date(valor);
    const fechaActual = new Date();
    
    if (fechaNacimiento > fechaActual) {
        mostrarError('fecha', 'La fecha de nacimiento no puede ser mayor a la fecha actual');
        return false;
    }
    
    mostrarExito('fechaNacimiento');
    return true;
}

// Validar correo
function validarCorreo() {
    const valor = inputs.correo.value.trim();
    
    if (valor === '') {
        mostrarError('correo', 'El correo electrónico es obligatorio');
        return false;
    }
    
    if (!regex.correo.test(valor)) {
        mostrarError('correo', 'Formato de correo inválido');
        return false;
    }
    
    mostrarExito('correo');
    return true;
}

// Validar edad
function validarEdad() {
    const valor = inputs.edad.value.trim();
    
    if (valor === '') {
        mostrarError('edad', 'La edad es obligatoria');
        return false;
    }
    
    if (!regex.edad.test(valor)) {
        mostrarError('edad', 'La edad solo puede contener números');
        return false;
    }
    
    const edad = parseInt(valor);
    if (edad < 1 || edad > 120) {
        mostrarError('edad', 'La edad debe estar entre 1 y 120');
        return false;
    }
    
    mostrarExito('edad');
    return true;
}

// Agregar validación en tiempo real
inputs.nombre.addEventListener('blur', validarNombre);
inputs.carnet.addEventListener('blur', validarCarnet);
inputs.dui.addEventListener('blur', validarDUI);
inputs.nit.addEventListener('blur', validarNIT);
inputs.fechaNacimiento.addEventListener('blur', validarFecha);
inputs.correo.addEventListener('blur', validarCorreo);
inputs.edad.addEventListener('blur', validarEdad);

// Auto-formatear DUI
inputs.dui.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 8) {
        valor = valor.substring(0, 8) + '-' + valor.substring(8, 9);
    }
    e.target.value = valor;
});

// Auto-formatear NIT
inputs.nit.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 4) {
        valor = valor.substring(0, 4) + '-' + valor.substring(4);
    }
    if (valor.length > 11) {
        valor = valor.substring(0, 11) + '-' + valor.substring(11);
    }
    if (valor.length > 15) {
        valor = valor.substring(0, 15) + '-' + valor.substring(15, 16);
    }
    e.target.value = valor;
});

// Convertir carnet a mayúsculas
inputs.carnet.addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
});

// Función para mostrar modal con información
function mostrarModal() {
    const modalContent = document.getElementById('modalContent');
    const tabla = document.createElement('table');
    
    const datos = [
        ['Nombre', inputs.nombre.value],
        ['Carnet', inputs.carnet.value],
        ['DUI', inputs.dui.value],
        ['NIT', inputs.nit.value],
        ['Fecha de Nacimiento', inputs.fechaNacimiento.value],
        ['Correo Electrónico', inputs.correo.value],
        ['Edad', inputs.edad.value + ' años']
    ];
    
    datos.forEach(([campo, valor]) => {
        const fila = document.createElement('tr');
        const celdaCampo = document.createElement('td');
        const celdaValor = document.createElement('td');
        
        celdaCampo.textContent = campo + ':';
        celdaValor.textContent = valor;
        
        fila.appendChild(celdaCampo);
        fila.appendChild(celdaValor);
        tabla.appendChild(fila);
    });
    
    modalContent.innerHTML = '';
    modalContent.appendChild(tabla);
    
    document.getElementById('modalOverlay').classList.add('show');
    document.getElementById('successModal').classList.add('show');
}

// Función para cerrar modal
function cerrarModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('successModal').classList.remove('show');
    formulario.reset();
    
    // Limpiar validaciones
    for (let campo in inputs) {
        limpiarValidacion(campo);
    }
}

// Evento de envío del formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar todos los campos
    const validaciones = [
        validarNombre(),
        validarCarnet(),
        validarDUI(),
        validarNIT(),
        validarFecha(),
        validarCorreo(),
        validarEdad()
    ];
    
    // Verificar si todas las validaciones pasaron
    if (validaciones.every(v => v === true)) {
        mostrarModal();
    } else {
        alert('Por favor, corrija los errores en el formulario antes de enviar');
    }
});

// Evento reset
formulario.addEventListener('reset', function() {
    setTimeout(() => {
        for (let campo in inputs) {
            limpiarValidacion(campo);
        }
    }, 10);
});