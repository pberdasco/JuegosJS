//=========================  Algo de DOM
let divs = document.getElementsByTagName("div");  // devuelve una lista de elementos
for ( const oneDiv of divs){
    console.log(oneDiv.innerHTML);
}

console.log("Menu NAV");
const menuIndex = document.getElementsByTagName("ul");
const nuevoBoton = document.createElement("li");
nuevoBoton.innerHTML = `<button class="botonNav" type="button" onclick="CargarPagina('./testGrid.html')" id="btnAgregado">Boton Nuevo grid</button>`
menuIndex[0].append(nuevoBoton);
nuevoBoton.style.backgroundColor = "red";


const ulTags = document.getElementsByTagName("ul");
const boton = ulTags[0].children[3];
boton.style.backgroundColor = "red";

console.log("ul-lis", ulTags[0].children);
console.log("li-3-children", ulTags[0].children[3]);
console.log("li-3-chnode", ulTags[0].childNodes[3]);


const h1Tag = document.getElementsByTagName("h1");
h1Tag[0].addEventListener("click", (ev) => alert(`Presionaron click sobre el h1. ${ev.target}`));

//h1Tag[0].onclick = function(){ClickSobreH1};

console.log(h1Tag[0].innerText);
h1Tag[0].innerText= `Nuevo 
                     Titulo`;


// Prueba de onwheel="MueveRueda(event)"
function MueveRueda(event){
    //console.log(event);
    if (event.wheelDelta > 0) rueda++;
    else rueda--;
    
    console.log(rueda, event.wheelDelta);
}