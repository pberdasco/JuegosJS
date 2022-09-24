class Posicion{
    
    //Formato fila (1 a MAX_X), columna (1 a MAX_Y).
    //La columna puede ser alfabetica mayuscula (A = 1, B = 2)
    constructor(x,y){
        this.y = typeof(y) === "number" ? y : y.charCodeAt(0) - 64;
        this.x = x;
    }

    // base = 0 o 1 indica si cuenta que el tablero comienza en la posicion base
    // EnTablero = (origen) => this.x >= 0 + origen && this.x < MAX_X + origen && this.y >= 0 + origen && this.y < MAX_Y + origen;   
    EnTablero(origen = 0) { 
        return (this.x >= 0 + origen && this.x < MAX_X + origen && this.y >= 0 + origen && this.y < MAX_Y + origen);
    }
       
}

class Ubicacion{
    Posicion1 = 0;
    Posicion2 = 0;

    constructor(posicion1, posicion2 ){
        this.Posicion1 = posicion1;
        this.Posicion2 = posicion2;
    }

    // Devuelve la longitud de la Ubicacion o -1 si es una ubicacion en diagonal
    Largo(){
        let largoX = this.Posicion2.x - this.Posicion1.x;
        let largoY = this.Posicion2.y - this.Posicion1.y;
        if (largoX !== 0 && largoY !== 0){
            return -1;
        } 
        return largoX + largoY + 1;
    }

    // Devuelve 0 si la Ubicacion es valida en tablero
    //  ==> Pasan a un metodo en barco: no debe pisar otro barco
    //                                  no debe tocarse con otro barco si VALE_PEGADO = false
    //                                  no debe salirse del tablero
    EsValida(tablero){
        // posicion2 debe ser > a posicion1 y las 2 puntas deben estar dentro del tablero
        if ((this.Posicion1.x > this.Posicion2.x || this.Posicion1.y > this.Posicion2.y) ||
            (!this.Posicion1.EnTablero(1) || !this.Posicion2.EnTablero(1)))
                return false;
        else   
                return true;
    }
}
