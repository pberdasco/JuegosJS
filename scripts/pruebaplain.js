const aside = document.querySelector("aside");
const h3 = document.querySelector("h3");
const number = document.querySelector("#number");
const proximo = document.querySelector("#proximo");

let cantidadCambios = 0;

aside.classList.add("azul");
h3.classList.add("rojo");

h3.addEventListener("click", manejaEvento);
proximo.addEventListener("click", continuar);




function manejaEvento(e)  {
    h3.classList.toggle("azul");
    cantidadCambios++;
}

function continuar(e){
    if (cantidadCambios > 10)
        h3.textContent = "fin de la prueba";
}
