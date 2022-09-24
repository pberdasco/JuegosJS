class Tablero{
    Logico = [];
    Grafico = [];
    Id = 0;
    // dibuja debe ser (-1 = no dibuja, 0 = tablero propio, 1 = tablero disparos)
    constructor(id, dibuja){
        this.Id = id;
        for(let i= 0; i < MAX_Y; i++){
            this.Logico.push([]); 
            for(let j= 0; j < MAX_X; j++){
                this.Logico[i].push(CELDA_VACIA);          
            }
        }
        if (dibuja >= 0) this.Grafico = dibujarTablero(dibuja,MAX_X,MAX_Y);
    }
}


function dibujarTablero(lado, maxX, maxY){
    const tableros = ["#bn_tableroJujadorPropio", "#bn_tableroJugadorDisparos"]
    const tablero = document.querySelector(tableros[lado]);
    tablero.textContent = "";
    const celdas = [];

    for(let i= 0; i <= maxY; i++){
        const linea = CreateTR(tablero);
        celdas.push([]); 
        for(let j= 0; j <= maxX; j++){
            const column = CreateTD(linea, i, j);
            celdas[i].push(column);          
        }
    }
    celdas[0][0] = tablero;
    PintarCoordenadas(celdas, maxX, maxY); 
    return celdas;
}

function CreateTR(tablero){
    const element = document.createElement("tr");
    element.classList.add("bn_celda")
    return tablero.appendChild(element);
}

function CreateTD(linea, i, j){
    const f_c_class = "tfc-" + String(i).padStart(2,"0") + "-" + String(j).padStart(2,"0");
    const element = document.createElement("td");
    element.classList.add("bn_celda", f_c_class)
    return linea.appendChild(element);
}