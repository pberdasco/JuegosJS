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