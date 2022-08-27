const MAX_X = 12;
const MAX_Y = 12;
const VALE_PEGADO = false;

class Posicion{
    
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    // base = 0 o 1 indica si cuenta que el tablero comienza en la posicion base
    // EnTablero = (origen) => this.x >= 0 + origen && this.x < MAX_X + origen && this.y >= 0 + origen && this.y < MAX_Y + origen;   
    EnTablero(origen) { 
        return (this.x >= 0 + origen && this.x < MAX_X + origen && this.y >= 0 + origen && this.y < MAX_Y + origen);
    }
    
}

class Ubicacion{
    constructor(posicion1, posicion2 ){
        this.Posicion1 = posicion1;
        this.Posicion2 = posicion2;
    }

    // Agregada despues de mandar el ejercicio
    Largo(){
    // Devuelve la longitud de la Ubicacion o -1 si es una ubicacion en diagonal
        let largoX = this.Posicion2.x - this.Posicion1.x;
        let largoY = this.Posicion2.y - this.Posicion1.y;
        if (largoX !== 0 && largoY !== 0){
            return -1;
        } 
        return largoX + largoY + 1;
    }

    EsValida(tablero){
    // Devuelve si la Ubicacion es valida en tablero
    // no debe pisar otro barco
    // no debe tocarse con otro barco si VALE_PEGADO = false
    // no debe salirse del tablero
        if(this.Posicion1.x > this.Posicion2.x || this.Posicion1.y > this.Posicion2.y 
            /*|| !this.Posicion1.EnTablero(1) || !this.Posicion2.EnTablero(1)*/){
                return false;
        }

        // TODO: falta validar choque de barcos 
        return true;
    }
}

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

const TiposBarco = [new TipoBarco("Submarino", 1, 3), new TipoBarco("Corbeta", 2, 2), new TipoBarco("Fragata", 3, 1), new TipoBarco("Destructor", 4, 1), new TipoBarco("Portaaviones", 5, 1)]

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



function CrearTableroLogico(){
    const tablero = [];
    for(let i= 0; i < MAX_Y; i++){
        tablero.push([]); 
        for(let j= 0; j < MAX_X; j++){
            tablero[i].push(99);          
        }
    }
    return tablero;
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



