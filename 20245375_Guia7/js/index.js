const buttonSpan = document.getElementById("idBtnSpan");
const buttonDiv = document.getElementById("idBtnDiv");
const buttonP = document.getElementById("idBtnP");
const buttonButton = document.getElementById("idBtnButton");
const imprimir = document.getElementById("idImprimirResultado");


const contarElementos = function(elemento){

    let arrayElement = document.getElementsByTagName(elemento);
    console.log(
        'Etiquetas buscadas: <${elemento}></${elemento}> / Total encontradas: ${arrayElement.length}'
    );
    for (const i of arrayElement) {
        console.log(i);
    }


    alert ("Revise la consola del navegador")
};

buttonSpan.onclick = () => {
    contarElementos ("span");
}

buttonDiv.onclick = () => {
    contarElementos ("div");
}

buttonP.onclick = () => {
    contarElementos ("p");
}

buttonButton.onclick = () => {
    contarElementos ("button");
}