const LINEAS = 8;
const COLUMNAS = 100;
let nivel = 1;
let ticks = 0;
let speed = 50;
let timmerID;
let segundosID;
let segundos = 0;
let stopped = true;
let cambiaNivel = true;


const ganastePerdiste = document.getElementById("resultado");
const elementoNivel = document.getElementById("nivel");
const elementoVehiculos = document.getElementById("vehiculos");
const elementoTiempo = document.getElementById("tiempo");
const celdasElementos = CrearRuta(LINEAS, COLUMNAS);
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
        this.Clase = clase;
        PintarCeldas(this.Clase, this.Fila, this.Columna, this.Largo)
    }

    Avanzar = function(t){
        if(t % this.Velocidad === 0){
            this.Borrar();
            this.#Mover();
            PintarCeldas(this.Clase, this.Fila, this.Columna, this.Largo);
        }
    }

    Borrar = function(){
        DespintarCeldas(this.Clase, this.Fila, this.Columna, this.Largo);
    }

    #Mover = function(){
        if (this.Velocidad > 0){
            this.Columna--;
            if (this.Columna < 0) this.Columna = COLUMNAS - this.Largo;            
        }else{
            this.Columna++;
            if (this.Columna > COLUMNAS - this.Largo) this.Columna = 0;
        } 
    }
}

class Rana{
    Fila = 0;
    Columna = 0;
    Clase = "rana";
    constructor(fila, columna){
        this.Columna = columna;
        this.Fila = fila;
        PintarCeldas(this.Clase, this.Fila, this.Columna, 1)
    }
}


function ResetFrogger(){
    LimpiarHTMLnuevoNivel()

    rana = new Rana(LINEAS, COLUMNAS / 2);
    CrearVehiculos();
}

function StartStopFrogger(){
    if (stopped) {
        if (cambiaNivel){
            ResetFrogger();
            if (nivel === 1){
                segundos = 0;
                segundosID = setInterval(sumaUnSegundo, 1000);
            }
        }
        StartFrogger()
    }else{
        StopFrogger();
        cambiaNivel = false;
    }
}

function StartFrogger(){
    document.addEventListener("keydown", MoverRana);   
    timmerID = setInterval(MoverVehiculos, speed);
    stopped = false;
}

function StopFrogger(){
    clearInterval(timmerID);
    document.removeEventListener("keydown", MoverRana);
    stopped = true;
}

function sumaUnSegundo(){
    segundos++;
    elementoTiempo.textContent = `Tiempo: ${segundos}`;
}


// Crear Ruta: agrega en el html una grilla con tantas TR como lineas de transito se requieran y
//  tantas TD como se defina en ancho.
// Además de agregarlo en el html, devuelve un array[][] que contiene todos los elementos td que se crearon.
function CrearRuta(lineasTransito, ancho){
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


function PintarCeldas(clase, fila, columna, largo){
    for (let i= 0; i < largo; i++){
        if (fila-1 < LINEAS && fila-1 >= 0 && columna-1+i < COLUMNAS && columna-1+i >= 0){
            celdasElementos[fila-1][columna-1+i].classList.add(clase);
        }     
    }
}

function DespintarCeldas(clase, fila, columna, largo){
    for (let i= 0; i < largo; i++){
        if (fila-1 < LINEAS && fila-1 >= 0 && columna-1+i < COLUMNAS && columna-1+i >= 0){
            celdasElementos[fila-1][columna-1+i].classList.remove(clase);
        }     
    }
}
 
function LimpiarHTMLnuevoNivel(){
    ganastePerdiste.textContent = "";
    LimpiarRuta();
    elementoNivel.textContent = `Nivel: ${nivel}`;
}

function LimpiarRuta(){
    for(let i = 0; i < listaVehiculos.length; i++){
        listaVehiculos[i].Borrar();
    }
    if (rana){
        DespintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
    }  
}  


function MoverRana(e){
    DespintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
    switch (e.key){
        case "ArrowLeft" :       
            if (rana.Columna > 1) rana.Columna--;
            break;
        case "ArrowRight" :
            if (rana.Columna < COLUMNAS) rana.Columna++;
            break;
        case "ArrowUp" :
            if (rana.Fila > 1) rana.Fila--;
            break;
        case "ArrowDown" :
            if (rana.Fila < LINEAS) rana.Fila++;
            break;
        default : 
            break;
    }
    PintarCeldas(rana.Clase, rana.Fila, rana.Columna, 1);
    EvaluarVictoria(rana);
}


function MoverVehiculos(){
    ticks++;
    for(let i = 0; i < listaVehiculos.length; i++){
        listaVehiculos[i].Avanzar(ticks);          
        EvaluarColision(listaVehiculos[i]);
    }    
}
                                      
function EvaluarColision(vehiculo){
    if (vehiculo.Fila === rana.Fila && (vehiculo.Columna <= rana.Columna && vehiculo.Columna + vehiculo.Largo >= rana.Columna)){
        FinNivel("Perdiste !!!");
        StopFrogger();
        nivel = 1;
        speed = 50;
        clearInterval(segundosID);
    }
}

function EvaluarVictoria(rana){
    if (rana.Fila === 1){
        FinNivel("Ganaste !!!");
        nivel++;
    }
}

function FinNivel(mensaje){
    StopFrogger();
    ganastePerdiste.textContent = mensaje;
    cambiaNivel = true;
}

function CrearVehiculos(){
    listaVehiculos = [new Vehiculo(2,80,4,3,"colectivo"), 
    new Vehiculo(3,50,2,3,"auto"), 
    new Vehiculo(3,70,1,1,"moto"), 
    new Vehiculo(3,30,-1,1,"auto"),
    new Vehiculo(4,30,-1,2,"moto"), 
    new Vehiculo(5,80,1,1,"moto"), 
    new Vehiculo(5,20,-3,4,"colectivo"),
    new Vehiculo(6,20,-2,4,"colectivo"),
    new Vehiculo(6,50,1,1,"moto"),
    new Vehiculo(6,70,1,1,"auto"),
    new Vehiculo(7,70,-1,1,"moto")];
    if (nivel > 1){
        listaVehiculos.push(new Vehiculo(4,50,-1,1,"auto")); 
        listaVehiculos.push(new Vehiculo(4,20,2,5,"colectivo"));
        listaVehiculos.push(new Vehiculo(5,70,-1,2,"moto"));
    }
    if (nivel > 2 && nivel <= 5){
        speed = speed * .8;
    }   
    if (nivel > 5){
        listaVehiculos.push(new Vehiculo(7,40,1,2,"auto")); 
        listaVehiculos.push(new Vehiculo(4,80,2,5,"colectivo"));
        listaVehiculos.push(new Vehiculo(7,60,1,1,"moto"));
    }
    if (nivel > 7){
        listaVehiculos.push(new Vehiculo(getRndInteger(2,7),getRndInteger(1,80),1,getRndInteger(1,5),"auto")); 
        listaVehiculos.push(new Vehiculo(getRndInteger(2,7),getRndInteger(1,80),2,getRndInteger(1,5),"colectivo"));    
    }
    elementoVehiculos.textContent = `Vehiculos: ${listaVehiculos.length}`;
}