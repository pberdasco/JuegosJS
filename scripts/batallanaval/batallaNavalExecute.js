// probarFunciones();


DefinirTiposBarco();  // Setea Los tipos de barcos que se usaran y que cantidad de cada uno de ellos

T_Jugador_Propio = new Tablero(0,0);
T_Jugador_Disparos = new Tablero(1,1);
T_Maquina_Propio = new Tablero(2,-1);
T_Maquina_Disparos = new Tablero(3,-1);

let barcoSeleccionado;
CrearBarcosMaquina(T_Maquina_Propio);  // Carga BarcosM y T_Maquina_Propio
IngresoBarcos();  // Carga BarcosJ y T_Jugadpr_Propio
 

function IngresoBarcos(){
    const jugarBtn = document.querySelector(".bn_jugar"); 
    jugarBtn.addEventListener("click", CrearBarcoEvent);
    T_Jugador_Propio.Grafico[0][0].addEventListener("click", IngresoEvent)
    
    MostrarMensaje("Ingrese", IngresoBarcoEnv);    
}

function IngresoEvent(e){
    const ubEvento = UbicacionEvento(e);
    if (!ubEvento) return;
    
    desde = new Posicion(ubEvento.f, ubEvento.c);
    hasta = CalculaPosicionHasta(ubEvento, TiposBarco[IngresoBarcoEnv.tipoNumero]);
    if (barcoSeleccionado?.id >= 0){
        barcoSeleccionado.Dibujar(T_Jugador_Propio.Grafico,"bn_celda_blanco"); // reubicando barco
    }
    barcoSeleccionado = new Barco(TiposBarco[IngresoBarcoEnv.tipoNumero].id,new Ubicacion(desde, hasta),T_Jugador_Propio.Logico,0);
    if (barcoSeleccionado.id >= 0){
        barcoSeleccionado.Dibujar(T_Jugador_Propio.Grafico,"bn_celda_prueba");
    }
    else{
        MostrarMensaje("Error", barcoSeleccionado.Error);
        barcoSeleccionado = null;
    }
     
}


function CrearBarcoEvent(e){
    CrearBarco(T_Jugador_Propio, BarcosJ, barcoSeleccionado);
    if (!ProximoBarco(IngresoBarcoEnv)){
        FinCreacionBarcos();
    } 
    else{
        MostrarMensaje("Ingrese", IngresoBarcoEnv);
    }
}

function FinCreacionBarcos(){
    MostrarMensaje("Cargados", IngresoBarcoEnv)
    const jugarBtn = document.querySelector(".bn_jugar");
    
    jugarBtn.removeEventListener("click", CrearBarco);
    T_Jugador_Propio.Grafico[0][0].removeEventListener("click", IngresoEvent)
    
    jugarBtn.textContent = "Jugar";
    jugarBtn.addEventListener("click", JuegoBN);
}

function MostrarMensaje(t, dm){
    const m = document.querySelector(".bn_mensajeIngreso");
    const mAdic = document.querySelector(".bn_mensajeIngreso2");
    const r = `<span class ="bn_resaltar">`;
    const fr = `</span>`;
    if (t === "Ingrese"){
        m.innerHTML = `${r}#${dm.barcoNumero}${fr} - Ingrese un ${r}${TiposBarco[dm.tipoNumero].tipo}${fr} de ${r}${TiposBarco[dm.tipoNumero].longitud}${fr} casilleros`;    
        mAdic.textContent = `(Click = barco horizontal)  (Ctrl-Click = barco vertical)  (<Próximo> = confirmar y siguiente)`;
    }else if(t === "Cargados"){
        m.textContent = `Ingreso finalizado. Se cargaron ${dm.barcoNumero} barcos`;
        mAdic.textContent = `Presione Jugar para comenzar la accion!!!`;
    }else if(t === "Error"){
        m.textContent = dm;
    }
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
    let direccion = (e.ctrlKey) ? 0 : 1; // (0 = vertical) - (1 = horizontal)
    return {f: fila, c: columna, dir: direccion};
}


function JuegoBN(e){
    console.log("continuar el juego");

}


