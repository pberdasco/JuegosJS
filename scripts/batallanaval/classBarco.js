class Barco {
    static numeroHombre =0;
    static numeroMaquina =0;
    id = 0;
    TipoId = 0;
    Ubicacion = 0;
    Jugador = 0;
    Estado = [];
    constructor(tipoId, ubicacion, tableroLogico, jugador, tipoEnTexto=""){
        if (ubicacion.EsValida(tableroLogico)){
            if(tipoId >= 0){
                this.TipoId = tipoId;
            }else{
                this.TipoId = Barco.#BuscarTipoId(tipoEnTexto);
            }
            this.Ubicacion = ubicacion;
            for(let i = 0 ; i < ubicacion.Largo() ; i++){
                this.Estado.push(false);
            }
            this.Jugador = jugador;
            if (this.Jugador === 0){
                this.id = Barco.numeroHombre++;  
            }else{
                this.id = Barco.numeroMaquina++;
            }
            
        }else{
            this.id = -1;  // implica que no se pudo crear.
        }         
    }

    static #BuscarTipoId(tipoABuscar){
        for(let i = 0; i < TiposBarco.length ; i++){
            if(TiposBarco[i].tipo.toLowerCase() === tipoABuscar.toLowerCase()){
                return TiposBarco[i].id;
            }
        }
        return -1
    }

    MarcarTocado(posicion){
        let tocado = false;
        if(this.Ubicacion.Posicion1.x === this.Ubicacion.Posicion2.x && this.Ubicacion.Posicion1.x === posicion.x){
            this.Estado[posicion.y - this.Ubicacion.Posicion1.y] = true;
            tocado = true;
        }else if(this.Ubicacion.Posicion1.y === this.Ubicacion.Posicion2.y && this.Ubicacion.Posicion1.y === posicion.y){
            this.Estado[posicion.x - this.Ubicacion.Posicion1.x] = true;
            tocado = true;
        }  
        return tocado;   
        //TODO: revisar porque creo que funciona mal.      
    }

    Hundido(){
        return this.Estado.every((x) => x === true);
    }
}
