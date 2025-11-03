//Leyendo elementos del DOM

//Accedemos a cada boton por medio de la API DOM
const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
const inputCarnet = document.querySelector("#inputCarnet");
const inputNombre = document.querySelector("#inputNombre");
const inputApellidos = document.querySelector("#inputApellidos");

btnAddEstudiante.addEventListener("click", guardarEstudiante);

function guardarEstudiante(){
    const nombre= inputNombre.value.trim();
    const carnet= inputCarnet.value.trim();
    const apellidos= inputApellidos.value.trim();
    const errores= validarDatos(carnet, nombre,apellidos);
    if(errores.lenght>0){
        alert("Errores: \n" + errores.join(","));
        return;
    }
    
    const alumnos=recuperarEstudiantes();
    alumnos.push({carnet,nombre,apellidos});
    guardarEstudiantes(alumnos);


}

function guardarEstudiantes(estudiantes){
    localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
}

function recuperarEstudiantes(){
    const data =localStorage.getItem("estudiantes");
    return data ? JSON.parse(data) : [];
}

function validarDatos(carnet, nombre,apellidos){
    const errores=[];
    if(carnet.trim().lenght==0){
        errores.push("El carnet es requerido");
    }
    if(nombre.trim().lenght==0){
        errores.push("El nombre es requerido");
    }
    if(apellidos.trim().lenght==0){
        errores.push("Los apellidos son requeridos");
    }
    return errores;
};


