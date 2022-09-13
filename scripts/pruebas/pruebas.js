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


// Prueba de onwheel="MueveRueda(event)"
function MueveRueda(event){
    //console.log(event);
    if (event.wheelDelta > 0) rueda++;
    else rueda--;
    
    console.log(rueda, event.wheelDelta);
}