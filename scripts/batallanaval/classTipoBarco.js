class TipoBarco {
    static numero = 0;
    id = 0;
    tipo = "";
    longitud = 0;
    cantidadAdmitida = 0;
    constructor(tipo, longitud, cantidad){
        this.tipo = tipo;
        if(longitud > 0){
            this.longitud = longitud;
        }
        this.cantidadAdmitida = cantidad;
        this.id = TipoBarco.numero++;
    }

    // recibe una ubicacion y devuelve true si corresponde con la longitud de este tipo de barco
    // por ejemlo recibe {{3,4},{3,5}} y la longitud de este barco es 2 => true si la longitud no es 2 => false 
    LongitudValida = (ubicacion) => ubicacion.Largo() === this.longitud
}

function DefinirTiposBarco(){
    TiposBarco.push(new TipoBarco("Portaaviones", 5, 1));
    TiposBarco.push(new TipoBarco("Destructor", 4, 1));
    TiposBarco.push(new TipoBarco("Fragata", 3, 1));
    TiposBarco.push(new TipoBarco("Corbeta", 2, 2));
    TiposBarco.push(new TipoBarco("Submarino", 1, 3));
}

// Setea t que es un objeto del tipo:
//   { barcoNumero: 0,   
//     barcosTipo: 1,       // cuantos barcos lleva ingresados del tipo actual
//     tipoNumero: 0   };   // posicion del array de tipos que esta procesando
// de modo que va recorriendo TiposBarco
// devuelve ademas true si hay un nuevo barco para procesar, false si no.
function ProximoBarco(t){
    t.barcoNumero++;
    if (t.barcosTipo < TiposBarco[t.tipoNumero].cantidadAdmitida){
        t.barcosTipo++;
    }else{
        t.barcosTipo = 1;
        t.tipoNumero++;
    }
    return t.tipoNumero < TiposBarco.length;
}