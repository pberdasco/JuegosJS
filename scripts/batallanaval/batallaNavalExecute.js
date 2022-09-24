// probarFunciones();


DefinirTiposBarco();  // Setea Los tipos de barcos que se usaran y que cantidad de cada uno de ellos

T_Jugador_Propio = new Tablero(0,0);
T_Jugador_Disparos = new Tablero(1,1);
T_Maquina_Propio = new Tablero(2,-1);
T_Maquina_Disparos = new Tablero(3,-1);

let barcoSeleccionado;
IngresoBarcos();
//const BarcosM = CrearBarcosMaquina(T_Maquina_Propio); 

//Esto no sería necesario pues IngresoBarcos va dibujando.
//BarcosJ.forEach((e) => {e.Dibujar(T_Jugador_Propio.Grafico)});


function IngresoBarcos(){
    const mensaje = document.querySelector(".bn_mensajeIngreso");
    const jugarBtn = document.querySelector(".bn_jugar"); 

    T_Jugador_Propio.Grafico[0][0].addEventListener("click", IngresoEvent)
    jugarBtn.addEventListener("click", CrearBarcoEvent);


    mensaje.innerHTML = `Por favor, ingrese el barco <span class ="bn_resaltar">#${IngresoBarcoEnv.barcoNumero}</span> de tipo <span class ="bn_resaltar">${TiposBarco[IngresoBarcoEnv.tipoNumero].tipo} - ${TiposBarco[IngresoBarcoEnv.tipoNumero].longitud}</span`;

}

function IngresoEvent(e){
    const ubEvento = UbicacionEvento(e);
    if (!ubEvento) return;
    direccion = (e.ctrlKey) ? 0 : 1; // 0 = verticla - 1 = horizontal
    
    desde = new Posicion(ubEvento.f, ubEvento.c);
    hasta = CalculaPosicionHasta(ubEvento, direccion);
    
    if (barcoSeleccionado) PropuestaUbicacion(barcoSeleccionado.Ubicacion, false); // reubicando barco
    barcoSeleccionado = new Barco(TiposBarco[IngresoBarcoEnv.tipoNumero].id,new Ubicacion(desde, hasta),T_Jugador_Propio.Logico,0);
    if (barcoSeleccionado.id >=0){
        PropuestaUbicacion(barcoSeleccionado.Ubicacion, true);
    }
    else{
        console.log(barcoSeleccionado.Error);
        barcoSeleccionado = null;
    }
     
}

function PropuestaUbicacion(ubicacion, muestra){
    for (let x = ubicacion.Posicion1.x; x <= ubicacion.Posicion2.x; x++){
        for(let y = ubicacion.Posicion1.y; y <= ubicacion.Posicion2.y; y++){
            T_Jugador_Propio.Grafico[x][y].style.backgroundColor = (muestra) ? "yellow" : "white";
        }
    }
}

function CrearBarcoEvent(e){
    CrearBarco(T_Jugador_Propio);
    if (!ProximoBarco(IngresoBarcoEnv)){
        console.log("ya se cargaron todos los barcos");
        const jugarBtn = document.querySelector(".bn_jugar");
        jugarBtn.textContent = "Jugar";
        jugarBtn.removeEventListener("click", CrearBarco);
        T_Jugador_Propio.Grafico[0][0].removeEventListener("click", IngresoEvent)
        jugarBtn.addEventListener("click", JuegoBN);
    } 
    else{
        const mensaje = document.querySelector(".bn_mensajeIngreso");
        mensaje.innerHTML = `Por favor, ingrese el barco <span class ="bn_resaltar">#${IngresoBarcoEnv.barcoNumero}</span> de tipo <span class ="bn_resaltar">${TiposBarco[IngresoBarcoEnv.tipoNumero].tipo} - ${TiposBarco[IngresoBarcoEnv.tipoNumero].longitud}</span`;
    }
}

function CrearBarco(tablero){
    BarcosJ.push(barcoSeleccionado);
    barcoSeleccionado.AsignarATableroLogico(tablero.Logico);
    barcoSeleccionado.Dibujar(tablero.Grafico);
    barcoSeleccionado = null;
}

function CalculaPosicionHasta(ubEvento, direccion){
    let hastafila = ubEvento.f + ((1 - direccion) * (TiposBarco[IngresoBarcoEnv.tipoNumero].longitud - 1));
    let hastacolumna = ubEvento.c + ((direccion) * (TiposBarco[IngresoBarcoEnv.tipoNumero].longitud -1));
    return new Posicion(hastafila,hastacolumna)
}

function ProximoBarco(ibe){
    ibe.barcoNumero++;
    if (ibe.barcosTipo < TiposBarco[ibe.tipoNumero].cantidadAdmitida){
        ibe.barcosTipo++;
    }else{
        ibe.barcosTipo = 1;
        ibe.tipoNumero++;
    }
    return ibe.tipoNumero < TiposBarco.length;
}

function UbicacionEvento(e){
    if (!e.target.closest("td")) return;
    let fila;
    let columna;  
    // TODO: esto se puede hacer mas lindo con "atributos data-"" y "dataset"
    //       (HTML) data-fila="10" data-columna="07"
    //       (JS)   fila = el.dataset.fila
    //              columna = el.dataset.columna
    //       o mejor desescructurando con:
    //              { fila, columna} = el.dataset
    //       sin ponerlo en las clases y tener que iterar adentro para buscar
    //       Eventualmente los atributos data se pueden usar en CSS:
    //              [data-fila="09"]{color: blue} -> pinta todos los elementos que tengan
    //                                               el atributo data-fila en "09" 
    e.target.classList.forEach((valor) => {
        if(valor.startsWith("tfc")){
            fila = parseInt(valor.substring(4,6));
            columna = parseInt(valor.substring(7,9));
        }
    } );
    return {f: fila, c: columna};
}

function JuegoBN(e){
    console.log("continuar el juego");

}


