

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
}
