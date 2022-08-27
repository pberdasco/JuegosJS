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
    // Devuelve la longitud de la Ubicacion
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
    constructor(tipo, longitud){
        this.tipo = tipo;
        if(longitud > 0){
            this.longitud = longitud;
        }
        this.id = TipoBarco.numero++;
    }

    LongitudValida(ubicacion){
        // recibe una ubicacion y devuelve true si corresponde con la longitud de este tipo de barco
        // por ejemlo recibe {{3,4},{3,5}} y la longitud de este barco es 2 => true si la longitud no es 2 => false        
        let longX = ubicacion.Posicion2.x - ubicacion.Posicion1.x + 1;
        let longY = ubicacion.Posicion2.y - ubicacion.Posicion1.y + 1;
        if((longX === 1 && longY === this.longitud) || (longX === this.longitud && longY === 1)) {
            return true;
        } else{
            return false;
        }
        
        // opcion con nueva Ubicacion.Largo
        return ubicacion.Largo() === this.longitud;


        //fin resulucion PB
        return true;
    }
}
const TiposBarco = [new TipoBarco("Submarino", 1), new TipoBarco("Corbeta", 2), new TipoBarco("Fragata", 3), new TipoBarco("Destructor", 4), new TipoBarco("Portaaviones", 5)]

class Barco {
    static numero =0;
    id = 0;
    TipoId = 0;
    Ubicacion = 0;
    Estado = [];
    constructor(tipoId, tipo, ubicacion, tableroLogico){
        if (ubicacion.EsValida(tableroLogico)){
            if(tipoId > 0){
                this.TipoId = tipoId;
            }else{
                this.TipoId = BuscarID(tipo);
            }
            this.Ubicacion = ubicacion;
            for(let i = 0 ; i < ubicacion.Largo() ; i++){
                this.Estado.push(false);
            } 
            this.id = Barco.numero++;  
        }else{
            this.id = -1;  // implica que no se pudo crear.
        }         
    }

    // Nuevos Tocado y Hundido
    Tocado(posicion){
        let tocado = false;
        if(this.Ubicacion.Posicion1.x === this.Ubicacion.Posicion2.x && this.Ubicacion.Posicion1.x === posicion.x){
            this.Estado[posicion.y - this.Ubicacion.Posicion1.y] = true;
            tocado = true;
        }else if(this.Ubicacion.Posicion1.y === this.Ubicacion.Posicion2.y && this.Ubicacion.Posicion1.y === posicion.y){
            this.Estado[posicion.x - this.Ubicacion.Posicion1.x] = true;
            tocado = true;
        }        
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

function BuscarID(tipo){
    // recibe un tipo (por ejemplo Submarino) y debe decir que id tiene
    // buscando en el array TiposBarco
    let id = -1;
    let pos = 0;
    do{
        if(TiposBarco[pos].tipo.toUpperCase() === tipo.toUpperCase()){
            id = pos;
        }
        pos++;
    }while(id === -1 && pos < TiposBarco.length)

    return id;
}

function ValidarDisparo(diparo){
    // debería recorrer todos los barcos del array Barcos y si el disparo pego en uno de ellos
    // devolver el numero de barco
    // si no, devolver -1 
    let id = -1;
    let pos = 0;
    do{
        if(Barcos[pos].Ubicacion.Posicion1.x === Barcos[pos].Ubicacion.Posicion2.x && Barcos[pos].Ubicacion.Posicion1.x === disparo.x){
            if(disparo.y >= Barcos[pos].Ubicacion.Posicion1.y && disparo.y <= Barcos[pos].Ubicacion.Posicion2.y){
                id = pos;
            }
        }else if(Barcos[pos].Ubicacion.Posicion1.y === Barcos[pos].Ubicacion.Posicion2.y && Barcos[pos].Ubicacion.Posicion1.y === disparo.y){
            if(disparo.x >= Barcos[pos].Ubicacion.Posicion1.x && disparo.x <= Barcos[pos].Ubicacion.Posicion2.x){
                id = pos;
            }
        }
        pos++;
    }while(id === -1 && pos < Barcos.length)

    return id;
}




