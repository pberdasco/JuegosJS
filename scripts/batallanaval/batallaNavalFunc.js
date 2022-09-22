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





function ValidarDisparo(arrayBarcos, posicionDisparo){
    // Revisa en todos los barcos de arrayBarcos si un disparo efectuado en posiccionDisparo le pega
    // si pega en un barco devuelve el numero de barco
    // si no, devolver -1 (agua)
    for (i= 0; i < arrayBarcos.length ; i++){
        const ubicacionBarco = arrayBarcos[i].Ubicacion;
        if(ubicacionBarco.Posicion1.x === ubicacionBarco.Posicion2.x && posicionDisparo.x === ubicacionBarco.Posicion1.x){
            if(ubicacionBarco.Posicion1.y <= posicionDisparo.y && posicionDisparo.y <= ubicacionBarco.Posicion2.y){
                return arrayBarcos[i].id;
            }
        }else if(ubicacionBarco.Posicion1.y === ubicacionBarco.Posicion2.y && posicionDisparo.y === ubicacionBarco.Posicion1.y){
            if(ubicacionBarco.Posicion1.x <= posicionDisparo.x && posicionDisparo.x <= ubicacionBarco.Posicion2.x){
                return arrayBarcos[i].id;
            }
        }
    }
    return -1;
}

function DefinirTiposBarco(){
    TiposBarco.push(new TipoBarco("Submarino", 1, 3));
    TiposBarco.push(new TipoBarco("Corbeta", 2, 2));
    TiposBarco.push(new TipoBarco("Fragata", 3, 1));
    TiposBarco.push(new TipoBarco("Destructor", 4, 1));
    TiposBarco.push(new TipoBarco("Portaaviones", 5, 1));   
}





