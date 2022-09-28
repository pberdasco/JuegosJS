

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

function CalculaPosicionHasta(ub, tipo){
    let hastafila = ub.f + ((1 - ub.dir) * (tipo.longitud - 1));
    let hastacolumna = ub.c + ((ub.dir) * (tipo.longitud -1));
    return new Posicion(hastafila,hastacolumna);
}

function CrearBarco(tablero, barcos, barco, dibujar=true){
    barcos.push(barco);
    barco.AsignarATableroLogico(tablero.Logico);
    if (dibujar) barco.Dibujar(tablero.Grafico);
    barco.id = -2;
}

function CrearBarcosMaquina(tablero){
    const ibm = {barcoNumero: 0, barcosTipo: 1, tipoNumero: 0};
    
    do{
        // let intentos = 0;
        do{
            ub = {f: getRndInteger(1, MAX_X), c: getRndInteger(1, MAX_Y), dir: getRndInteger(0,1)};
            desde = new Posicion(ub.f, ub.c);
            hasta = CalculaPosicionHasta(ub, TiposBarco[ibm.tipoNumero]);
            nuevoBarco = new Barco(TiposBarco[ibm.tipoNumero].id,new Ubicacion(desde, hasta),T_Maquina_Propio.Logico,1);    
            // intentos++;   
        }while(nuevoBarco.id === -1)
        // console.log("barco creado. intentos: ", intentos);
        CrearBarco(T_Maquina_Propio, BarcosM, nuevoBarco, false);
    }while(ProximoBarco(ibm));

    // console.log(T_Maquina_Propio.Logico);
    // console.log(BarcosM);

    BarcosM.forEach(e => {e.Dibujar(T_Jugador_Disparos.Grafico,"bn_celda_prueba")});
}





