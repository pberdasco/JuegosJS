


// Crear Ruta: agrega en el html una grilla con tantas TR como lineas de transito se requieran y
//  tantas TD como se defina en ancho.
// Además de agregarlo en el html, devuelve un array[][] que contiene todos los elementos td que se crearon.
function crearRuta(lineasTransito, ancho){
    const ruta = document.querySelector("#rutaFrogger");
    ruta.textContent = "";
    const celdas = [];

    for(let i= 0; i <= lineasTransito; i++){
        const linea = CreateTR(ruta);
        celdas.push([]); 
        for(let j= 0; j <= ancho; j++){
            const column = CreateTD(linea,celdas[i]);
            celdas[i].push(column);          
        }
    } 
    return celdas;
}

function CreateTR(ruta){
    const element = document.createElement("tr");
    element.classList.add("celdaFrogger")
    return ruta.appendChild(element);
}

function CreateTD(linea){
    const element = document.createElement("td");
    element.classList.add("celdaFrogger")
    return linea.appendChild(element);
}