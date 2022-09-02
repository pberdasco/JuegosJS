const LINEAS = 8;
const COLUMNAS = 100;
let ticks = 0;
let speed = 50;
let timmerID;

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
    listaVehiculos = [new Vehiculo(1,95,2,2,"auto"), 
                      new Vehiculo(2,80,4,3,"colectivo"), 
                      new Vehiculo(3,50,2,3,"auto"), 
                      new Vehiculo(3,70,1,1,"moto"), 
                      new Vehiculo(4,30,-1,2,"moto"), 
                      new Vehiculo(5,80,1,1,"moto"), 
                      new Vehiculo(5,20,-3,4,"colectivo")];

    document.addEventListener("keydown", moverRana);
   
    timmerID = setInterval(moverVehiculos, speed);
    // ver donde poner:
    // clearInterval(timmerID);
    // quizas con un boton de parar / arrancar

 
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
    if (vehiculo.Fila === rana.Fila && (vehiculo.Columna >= rana.Columna && vehiculo.Columna + vehiculo.Largo <= rana.Columna)){
        clearInterval(timmerID);
        alert("Perdiste")
    }
    
}

/*
startPauseButton.addEventListener("click", () => {
    if (timmerID) {
        clearInterval(timmerID)
    }else{
        timmerID = setInterval(moverVehiculos, speed);
        document.addEventListener("keydown", moverRana);
    }
})
*/