//Accediendo a los elementos
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCdePais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnBorrar");
const buttonAgregarPais = document.getElementById("idBtnAñadirPais");

const notificacion = document.getElementById("idnotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModalPais");

//Arreglo global de pacientes
let arrayPaciente = [];

// Variable para controlar si estamos editando
let indiceEditando = -1;

/*
Creando una función para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    
    // Resetear el modo edición
    indiceEditando = -1;
    buttonAgregarPaciente.textContent = "Agregar";
    buttonAgregarPaciente.classList.remove("btn-warning");
    buttonAgregarPaciente.classList.add("btn-primary");

    inputNombre.focus();
};

//Funcion para validar el ingreso del paciente
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        // Si estamos editando
        if (indiceEditando >= 0) {
            // Actualizar el paciente existente
            arrayPaciente[indiceEditando] = [
                nombre,
                apellido,
                fechaNacimiento,
                sexo,
                labelPais,
                direccion
            ];
            
            mensaje.innerHTML = "Paciente actualizado correctamente";
            toast.show();
            
            // Actualizar la tabla automáticamente
            imprimirPacientes();
        } else {
            // Agregando información al arreglo paciente
            arrayPaciente.push(
                new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
            );

            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
            toast.show();
        }

        //Limpiando formulario
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary btn-sm" title="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger btn-sm" title="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

// Función para editar paciente
const editarPaciente = (index) => {
    // Obtener los datos del paciente
    let paciente = arrayPaciente[index];
    
    // Cargar los datos en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    
    // Marcar el radio button correspondiente al sexo
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }
    
    // Seleccionar el país en el combo
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.selectedIndex = i;
            break;
        }
    }
    
    inputDireccion.value = paciente[5];
    
    // Guardar el índice que estamos editando
    indiceEditando = index;
    
    // Cambiar el texto del botón
    buttonAgregarPaciente.textContent = "Actualizar";
    buttonAgregarPaciente.classList.remove("btn-primary");
    buttonAgregarPaciente.classList.add("btn-warning");
    
    // Hacer scroll al formulario
    inputNombre.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    mensaje.innerHTML = "Modo edición activado";
    toast.show();
};

// Función para eliminar paciente
const eliminarPaciente = (index) => {
    // Confirmar antes de eliminar
    if (confirm("¿Está seguro que desea eliminar este paciente?")) {
        // Eliminar el paciente del arreglo
        arrayPaciente.splice(index, 1);
        
        // Actualizar la tabla
        imprimirPacientes();
        
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
    }
};

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th scope="col" class="text-center" style="width:5%">#</th>
                    <th scope="col" class="text-center" style="width:15%">Nombre</th>
                    <th scope="col" class="text-center" style="width:15%">Apellido</th>
                    <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                    <th scope="col" class="text-center" style="width:10%">Sexo</th>
                    <th scope="col" class="text-center" style="width:10%">País</th>
                    <th scope="col" class="text-center" style="width:25%">Dirección</th>
                    <th scope="col" class="text-center" style="width:10%">Opciones</th>
                </tr>
            </thead>
            <tbody>
                ${imprimirFilas()}
            </tbody>
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "País agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
        
        // Incrementar el contador
        contadorGlobalOption++;
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utlilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

//Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();