const LINEAS = 8;
const COLUMNAS = 100;
let NIVEL = 1;
let ticks = 0;
let speed = 50;
let timmerID;
let stopped = true;

const ganastePerdiste = document.getElementById("resultado");
const celdasElementos = crearRuta(LINEAS, COLUMNAS);
const elementoNivel = document.getElementById("nivel");
let listaVehiculos = [];
let rana;

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
    ganastePerdiste.textContent = "";
    LimpiarRuta();
    elementoNivel.textContent = `Nivel: ${NIVEL}`;
    rana = new Rana(LINEAS, COLUMNAS / 2);
    CrearVehiculos();

    document.addEventListener("keydown", moverRana);
   
    timmerID = setInterval(moverVehiculos, speed);
    stopped = false; 
}

function StartStopFrogger(){
    if (stopped) {
        ResetFrogger()
    }else{
        clearInterval(timmerID);
        stopped = true;
    }
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
            const column = CreateTD(linea,i);
            celdas[i].push(column);          
        }
    } 
    return celdas;
}

function CreateTR(ruta){
    const element = document.createElement("tr");
    element.classList.add("celdaFrogger");
    return ruta.appendChild(element);
}

function CreateTD(linea, i){
    const element = document.createElement("td");
    element.classList.add("celdaFrogger");
    if(i === 0 || i === LINEAS - 1){
        element.classList.add("celdaCasa");
    }
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
 
function LimpiarRuta(){
    for(let i = 0; i < listaVehiculos.length; i++){
        despintarCeldas(listaVehiculos[i].Clase, listaVehiculos[i].Fila, listaVehiculos[i].Columna, listaVehiculos[i].Largo);
    }

    if (rana){
        despintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
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
    evaluarVictoria(rana);
}
 


function moverVehiculos(){
    ticks++;
    for(let i = 0; i < listaVehiculos.length; i++){
        if(ticks % listaVehiculos[i].Velocidad === 0){
            despintarCeldas(listaVehiculos[i].Clase, listaVehiculos[i].Fila, listaVehiculos[i].Columna, listaVehiculos[i].Largo);
            if (listaVehiculos[i].Velocidad > 0){
                listaVehiculos[i].Columna--;
                if (listaVehiculos[i].Columna < 0){
                    listaVehiculos[i].Columna = COLUMNAS - listaVehiculos[i].Largo;
                }
            }else{
                listaVehiculos[i].Columna++;
                if (listaVehiculos[i].Columna > COLUMNAS - listaVehiculos[i].Largo){
                    listaVehiculos[i].Columna = 0;
                }
            }           
            pintarCeldas(listaVehiculos[i].Clase, listaVehiculos[i].Fila, listaVehiculos[i].Columna, listaVehiculos[i].Largo);
            evaluarColision(listaVehiculos[i]);

        }
    }    
}
   
                                    
function evaluarColision(vehiculo){
    if (vehiculo.Fila === rana.Fila && (vehiculo.Columna <= rana.Columna && vehiculo.Columna + vehiculo.Largo >= rana.Columna)){
        clearInterval(timmerID);
        document.removeEventListener("keydown", moverRana);
        ganastePerdiste.textContent = "Perdiste !!!";
        stopped = true;
    }
}

function evaluarVictoria(rana){
    if (rana.Fila === 1){
        clearInterval(timmerID);
        document.removeEventListener("keydown", moverRana);
        ganastePerdiste.textContent = "Ganaste !!!";
        stopped = true;
        NIVEL++;
    }
}

function CrearVehiculos(){
    listaVehiculos = [new Vehiculo(2,80,4,3,"colectivo"), 
    new Vehiculo(3,50,2,3,"auto"), 
    new Vehiculo(3,70,1,1,"moto"), 
    new Vehiculo(3,30,-1,1,"moto"),
    new Vehiculo(4,30,-1,2,"moto"), 
    new Vehiculo(5,80,1,1,"moto"), 
    new Vehiculo(5,20,-3,4,"colectivo"),
    new Vehiculo(6,20,-2,4,"colectivo"),
    new Vehiculo(6,50,1,1,"moto"),
    new Vehiculo(6,70,1,1,"moto"),
    new Vehiculo(7,70,-1,1,"moto")];
    if (NIVEL > 1){
        listaVehiculos.push(new Vehiculo(4,50,-1,1,"auto")); 
        listaVehiculos.push(new Vehiculo(4,20,2,5,"colectivo"));
        listaVehiculos.push(new Vehiculo(5,70,-1,2,"moto"));
    }
    if (NIVEL > 2 && NIVEL <= 5){
        speed = speed * .8;
    }
    
}