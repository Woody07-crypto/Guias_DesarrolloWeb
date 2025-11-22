// por medio de arreglos asociativos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
const bodyModal = document.getElementById("idBodyModal");

// Función para validar email con expresión regular
const validarEmail = function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Función para validar que la fecha no supere la fecha actual
const validarFechaNacimiento = function(fecha) {
    const fechaNacimiento = new Date(fecha);
    const fechaActual = new Date();
    return fechaNacimiento <= fechaActual;
};

// Función principal de validación
const validarFormulario = function() {
    let errores = [];
    
    // a. Validar que los campos no estén vacíos
    const nombre = formulario.elements["idNombre"];
    const apellidos = formulario.elements["idApellidos"];
    const fechaNacimiento = formulario.elements["idFechaNac"];
    const correo = formulario.elements["idCorreo"];
    const password = formulario.elements["idPassword"];
    const passwordRepetir = formulario.elements["idPasswordRepetir"];
    
    if (nombre.value.trim() === "") {
        errores.push("El campo Nombre es obligatorio");
    }
    
    if (apellidos.value.trim() === "") {
        errores.push("El campo Apellidos es obligatorio");
    }
    
    if (fechaNacimiento.value.trim() === "") {
        errores.push("El campo Fecha de Nacimiento es obligatorio");
    }
    
    if (correo.value.trim() === "") {
        errores.push("El campo Correo Electrónico es obligatorio");
    }
    
    if (password.value.trim() === "") {
        errores.push("El campo Contraseña es obligatorio");
    }
    
    if (passwordRepetir.value.trim() === "") {
        errores.push("El campo Repetir Contraseña es obligatorio");
    }
    
    // b. Validar que la fecha de nacimiento no supere la fecha actual
    if (fechaNacimiento.value.trim() !== "") {
        if (!validarFechaNacimiento(fechaNacimiento.value)) {
            errores.push("La fecha de nacimiento no puede ser mayor a la fecha actual");
        }
    }
    
    // c. Validar correo electrónico con expresión regular
    if (correo.value.trim() !== "") {
        if (!validarEmail(correo.value)) {
            errores.push("El formato del correo electrónico no es válido");
        }
    }
    
    // d. Validar que las contraseñas sean iguales
    if (password.value !== "" && passwordRepetir.value !== "") {
        if (password.value !== passwordRepetir.value) {
            errores.push("Las contraseñas no coinciden");
        }
    }
    
    // e. Verificar que al menos un interés esté seleccionado
    const intereses = formulario.querySelectorAll('input[name="intereses"]:checked');
    if (intereses.length === 0) {
        errores.push("Debe seleccionar al menos un interés");
    }
    
    // f. Verificar que se seleccione una carrera
    const carrera = formulario.elements["idCarrera"];
    let carreraSeleccionada = false;
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            carreraSeleccionada = true;
            break;
        }
    }
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una carrera");
    }
    
    // g. Verificar que se seleccione un país
    const pais = formulario.elements["idPais"];
    if (pais.value === "" || pais.selectedIndex === 0) {
        errores.push("Debe seleccionar un país de origen");
    }
    
    // Si hay errores, mostrarlos
    if (errores.length > 0) {
        let mensajeError = "Se encontraron los siguientes errores:\n\n";
        for (let i = 0; i < errores.length; i++) {
            mensajeError += (i + 1) + ". " + errores[i] + "\n";
        }
        alert(mensajeError);
        return false;
    }
    
    // Si no hay errores, mostrar la información en el modal
    mostrarInformacionEnModal();
    return true;
};

// Función para crear la tabla con la información del formulario usando DOM
const mostrarInformacionEnModal = function() {
    // Limpiar contenido previo del modal
    bodyModal.innerHTML = "";
    
    // Crear tabla
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-bordered");
    
    // Crear thead
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    
    const thCampo = document.createElement("th");
    thCampo.textContent = "Campo";
    
    const thValor = document.createElement("th");
    thValor.textContent = "Valor";
    
    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
    // Crear tbody
    const tbody = document.createElement("tbody");
    
    // Función auxiliar para agregar fila
    const agregarFila = function(campo, valor) {
        const tr = document.createElement("tr");
        
        const tdCampo = document.createElement("td");
        tdCampo.textContent = campo;
        
        const tdValor = document.createElement("td");
        tdValor.textContent = valor;
        
        tr.appendChild(tdCampo);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    };
    
    // Agregar información del formulario
    agregarFila("Nombre", formulario.elements["idNombre"].value);
    agregarFila("Apellidos", formulario.elements["idApellidos"].value);
    agregarFila("Fecha de Nacimiento", formulario.elements["idFechaNac"].value);
    agregarFila("Correo Electrónico", formulario.elements["idCorreo"].value);
    
    // Obtener intereses seleccionados
    const intereses = formulario.querySelectorAll('input[name="intereses"]:checked');
    let interesesTexto = "";
    for (let i = 0; i < intereses.length; i++) {
        const label = document.querySelector(`label[for="${intereses[i].id}"]`);
        interesesTexto += label.textContent;
        if (i < intereses.length - 1) {
            interesesTexto += ", ";
        }
    }
    agregarFila("Intereses", interesesTexto);
    
    // Obtener carrera seleccionada
    const carrera = formulario.elements["idCarrera"];
    let carreraTexto = "";
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            const label = document.querySelector(`label[for="${carrera[i].id}"]`);
            carreraTexto = label.textContent;
            break;
        }
    }
    agregarFila("Carrera", carreraTexto);
    
    // Obtener país seleccionado
    const pais = formulario.elements["idPais"];
    const paisTexto = pais.options[pais.selectedIndex].text;
    agregarFila("País de Origen", paisTexto);
    
    // Agregar tbody a la tabla
    tabla.appendChild(tbody);
    
    // Agregar tabla al modal
    bodyModal.appendChild(tabla);
    
    // Mostrar el modal
    modal.show();
};

// Evento del botón
button.onclick = (e) => {
    e.preventDefault(); // Prevenir envío del formulario
    validarFormulario();
};