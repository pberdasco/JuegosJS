function dibujarTablero(lado, maxX, maxY){
    const tableros = ["#tableroJujador", "#tableroMaquina"]
    const tablero = document.querySelector(tableros[lado]);
    tablero.textContent = "";
    const celdas = [];

    for(let i= 0; i <= maxY; i++){
        const linea = CreateTR(i, tablero);
        celdas.push([]); 
        for(let j= 0; j <= maxX; j++){
            const column = CreateTD(i,j,linea,celdas[i]);
            celdas[i].push(column);          
        }
    }
    PintarCoordenadas(celdas, maxX, maxY); 
    return celdas;
}

function CreateTR(i, tablero){
    const element = document.createElement("tr");
    element.classList.add("celda")
    return tablero.appendChild(element);
}

function CreateTD(i, j, linea){
    const element = document.createElement("td");
    element.classList.add("celda")
    return linea.appendChild(element);
}

function PintarCoordenadas(celdas, maxX, maxY){
    for(let i = 1; i <= maxX; i++){
        celdas[0][i].textContent = String.fromCharCode(i+64);
        celdas[0][i].style.backgroundColor = "black";
        celdas[0][i].style.color = "white";
    }
    for(let i = 1; i <= maxX; i++){
        celdas[i][0].textContent = i.toString();
        celdas[i][0].style.backgroundColor = "black";
        celdas[i][0].style.color = "white";
    }
    celdas[4][6].style.backgroundColor = "brown";
}