class Barco {
    static numeroHombre =0;
    static numeroMaquina =0;
    static ErrorTypes = ["Posicion2 debe ser mayor a Posicion1 y ambas deben estar en el tablero",
    "El barco colisiona con otro barco (posicion ya ocupada)",
    "El barco no puede estar pegado a otro barco"];

    id = 0;
    TipoId = 0;
    Ubicacion = 0;
    Jugador = 0;
    Estado = [];
    Error = "";
    constructor(tipoId, ubicacion, tableroLogico, jugador, tipoEnTexto=""){
        this.Ubicacion = ubicacion;
        const errCode = this.#UbicacionValida(ubicacion, tableroLogico);
        if (errCode === 0){
            this.TipoId = (tipoId >= 0) ?  tipoId : Barco.#BuscarTipoId(tipoEnTexto);
            this.Estado = Array(ubicacion.Largo()).fill(false);
            this.Jugador = jugador;
            this.id = (this.Jugador === 0) ? Barco.numeroHombre++ : Barco.numeroMaquina++; 
        }else{
            this.id = -1;  // implica que no se pudo crear.
            this.Error = Barco.ErrorTypes[errCode-1];
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

    Dibujar(TableroGrafico, clase = ""){
        if (this.id === -1) return;
        let pos1 = this.Ubicacion.Posicion1;
        let pos2 = this.Ubicacion.Posicion2;
        let estadoIndex = 0;
        for (let x = pos1.x; x <= pos2.x; x++){
            for(let y = pos1.y; y <= pos2.y; y++){
                TableroGrafico[x][y].classList.remove("bn_celda_blanco", "bn_celda_barco", "bn_celda_tocado", "bn_celda_prueba")
                if (!clase){
                    TableroGrafico[x][y].textContent = this.id.toString();
                    if(this.Estado[estadoIndex]) TableroGrafico[x][y].classList.add("bn_celda_tocado");
                    else TableroGrafico[x][y].classList.add("bn_celda_barco");
                    estadoIndex++;
                }else{
                    TableroGrafico[x][y].classList.add(clase);
                }
            }
        }
    }

    AsignarATableroLogico(TableroLogico){
        if (this.id === -1) return;
        let pos1 = this.Ubicacion.Posicion1;
        let pos2 = this.Ubicacion.Posicion2;
        for (let x = pos1.x-1; x < pos2.x; x++){
            for(let y = pos1.y-1; y < pos2.y; y++){
                TableroLogico[x][y] = this.id;
            }
        }
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

    #UbicacionValida(ubicacion, tableroLogico){
        if (!ubicacion.EsValida(tableroLogico)) return 1;   // 1 : ubicacion no cae en el tablero

        let pos1 = ubicacion.Posicion1;
        let pos2 = ubicacion.Posicion2;
        for (let x = pos1.x-1; x < pos2.x; x++){
            for(let y = pos1.y-1; y < pos2.y; y++){
                if (tableroLogico[x][y] != 99) return 2;  // 2: hay un barco en la misma posicion
                if (!VALE_PEGADO && Lindero(x,y,tableroLogico)) return 3;  //3: esta pegado a otro barco
            }
        }
        return 0;

        function Lindero(x, y, tableroLogico) {
            const p = new Posicion(0 , 0);
            for (let i = -1; i <=1; i++ ){
                for (let j = -1; j <= 1; j++){
                    p.x = x + i;
                    p.y = y + j;
                    if (p.EnTablero(0) && tableroLogico[x+i][y+j] != 99) return true;
                }
            }
            return false;
        }
    }
}
