rueda = 0;

function CargarPagina(pagina){
    location. href = pagina;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// Prueba de onwheel="MueveRueda(event)"
function MueveRueda(event){
    //console.log(event);
    if (event.wheelDelta > 0) rueda++;
    else rueda--;
    
    console.log(rueda, event.wheelDelta);
}