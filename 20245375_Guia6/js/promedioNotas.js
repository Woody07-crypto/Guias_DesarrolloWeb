//Accedemos al contenedor donde se mostraran los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

//Accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizara la operación
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    //utilizaremos un arreglo para guardar la informacion del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.getElementById("inputNumeroEstudiantes").value;
    
    // Validar que se haya ingresado un número válido
    if (totalEstudiantes == "" || isNaN(totalEstudiantes) || totalEstudiantes <= 0) {
        alert("Por favor ingrese un número válido de estudiantes");
        return;
    }
    
    let contador = 1;

    // Utilizaremos un while para recorrer el total de estudiantes
    let estudiante, calificacion, convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        //Verificamos que el estudiante sea un texto valido
        do {
            //y que no se encuentre en el rango de 0 - 10
            calificacion = prompt(
                `Ingrese la calificacion del estudiante ${contador}`
            );

            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        //Asignando los valores al arreglo
        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion).toFixed(2)
        );

        contador++;
    }

    //Recorriendo el arreglo con for..of
    //Verificaremos cual es el promedio de las calificaciones
    // y cual de los estudiantes posee la calificacion mas alta
    let promedio = 0;
    let posicion = arrayEstudiante[0]; // Inicializar con el primer estudiante
    let calificacionAlta = parseFloat(arrayEstudiante[0][1]); // Primera calificación

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = parseFloat(indice[1]);

        //imprimiendo lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        //verificacion de calificacion mas alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = indice;
        }

        //Calculando el promedio
        promedio += nota;
    }

    listado += "</ol>";
    promedio = (promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;

    //Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}