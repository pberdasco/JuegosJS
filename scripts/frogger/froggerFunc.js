const LINEAS = 8;
const COLUMNAS = 100;

const celdasElementos = crearRuta(LINEAS, COLUMNAS);
let rana;
let listaVehiculos;

class Vehiculo{
    Fila = 0;
    Columna = 0;
    Velocidad = 1;
    Largo = 1;
    Clase = "";
    constructor(fila, columna, velocidad, largo, clase){
        this.Fila = fila,
        this.Columna = columna,
        this.Velocidad = velocidad,
        this.Largo = largo,
        this.Clase = clase
        pintarCeldas(this.Clase, this.Fila, this.Columna, this.Largo)
    }
}

class Rana{
    Fila = 0;
    Columna = 0;
    Clase = "rana";
    constructor(fila, columna){
        this.Columna = columna;
        this.Fila = fila;
        pintarCeldas(this.Clase, this.Fila, this.Columna, 1)
    }
}


function ResetFrogger(){
    
    rana = new Rana(LINEAS, COLUMNAS / 2);
    listaVehiculos = [new Vehiculo(1,95,1,1,"auto"), new Vehiculo(3,80,1,3,"colectivo"), new Vehiculo(1,50,1,2,"auto")];

    document.addEventListener("keydown", moverRana);
    /*


    document.addEventListener("keydown", noverFrog);
    let timmerID = setInterval(moverObjetos, 1000);

    console.log(objetosRojos, objetosVerdes);  
    */
}






// Crear Ruta: agrega en el html una grilla con tantas TR como lineas de transito se requieran y
//  tantas TD como se defina en ancho.
// Además de agregarlo en el html, devuelve un array[][] que contiene todos los elementos td que se crearon.
function crearRuta(lineasTransito, ancho){
    const ruta = document.querySelector("#rutaFrogger");
    ruta.textContent = "";
    const celdas = [];

    for(let i= 0; i < lineasTransito; i++){
        const linea = CreateTR(ruta);
        celdas.push([]);     
        for(let j= 0; j < ancho; j++){
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


function pintarCeldas(clase, fila, columna, largo){
    for (let i= 0; i < largo; i++){
        if (fila-1 < LINEAS && fila-1 >= 0 && columna-1+i < COLUMNAS && columna-1+i >= 0){
            celdasElementos[fila-1][columna-1+i].classList.add(clase);
        }     
    }
}

function despintarCeldas(clase, fila, columna, largo){
    for (let i= 0; i < largo; i++){
        if (fila-1 < LINEAS && fila-1 >= 0 && columna-1+i < COLUMNAS && columna-1+i >= 0){
            celdasElementos[fila-1][columna-1+i].classList.remove(clase);
        }     
    }
}


function moverRana(e){
    despintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
    switch (e.key){
        case "ArrowLeft" :       
            if (rana.Columna > 1){
                rana.Columna--
            }
            break;
        case "ArrowRight" :
            if (rana.Columna < COLUMNAS){
                rana.Columna++
            } 
            break;
        case "ArrowUp" :
            if (rana.Fila > 1){
                rana.Fila--
            }
            break;
        case "ArrowDown" :
            if (rana.Fila < LINEAS){
                rana.Fila++
            }
            break;
        default : 
            break;
    }
    pintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
    console.log(rana);
}

/*

function evaluarColision(timmerID){
    if (true){
        clearInterval(timmerID);
        console.log("Perdiste")
    }
    
}

function eliminaClases(lineasTransito, columnas){
    for(let i= 0; i < lineasTransito; i++){
        for(let j= 0; j < columnas; j++){
            element.classList.remove("celdaVerde", "celdaRoja");          
        }
    }   
}

function moverObjetos(listaObjetos){
    for(i = 0; i < listaObjetos.length; i++ ){
        listaObjetos[i].c -= listaObjetos[i].v;
        if (listaObjetos[i].c < 0) {
            listaObjetos[i].c = 100;
        }
    }
}

function pintarCeldas(arrayElementos, listaObjetos, clase){
    for(i = 0; i < listaObjetos.length; i++ ){
        arrayElementos[listaObjetos[i].f][listaObjetos[i].c].classList.add(clase);
        console.log(clase, listaObjetos[i].f,listaObjetos[i].c)
    }        
}

function moverObjetos(){
    pintarCeldas(celdasElementos, objetosVerdes, "celdaVerde");
    pintarCeldas(celdasElementos, objetosRojos, "celdaRoja");
    moverObjetos(objetosVerdes);
    moverObjetos(objetosRojos);    
    eliminaClases(LINEAS,COLUMNAS);        
}
*/