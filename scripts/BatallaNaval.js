const MAX_X = 20;
const MAX_Y = 20;

class Posicion{
    constructor(x,y){
        if (x < 1 || x > MAX_X || y < 1 || y > MAX_Y){
            console.log("Posicion inválida. Fuera de tablero");
        };
        this.x = x;
        this.y = y;
    }
}

class Ubicacion{
    constructor(posicion1, posicion2 ){
        this.Posicion1 = posicion1;
        this.Posicion2 = posicion2;
    }

    // Agregada despues de mandar el ejercicio
    Largo(){
        let largoX = this.Posicion2.x - this.Posicion1.x;
        let largoY = this.Posicion2.y - this.Posicion1.y;
        if (largoX !== 0 && largoY !== 0){
            return -1;
        } 
        return largoX + largoY + 1;
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



class Barco {
    static numero =0;
    id = 0;
    TipoId = 0;
    constructor(tipoId, tipo, ubicacion){
        if(tipoId > 0){
            this.TipoId = tipoId;
        }else{
            this.TipoId = BuscarID(tipo);
        }
        this.Ubicacion = ubicacion;
        this.Estado = [];
        for(let i = 0 ; i < ubicacion.Largo() ; i++){
            this.Estado.push(false);
        } 
        this.id = Barco.numero++;        
    }

    // Nuevos Tocado y Hundido
    Tocado(posicion){

        if(this.Ubicacion.Posicion1.x === this.Ubicacion.Posicion2.x && this.Ubicacion.Posicion1.x === posicion.x){
            this.Estado[posicion.y - this.Ubicacion.Posicion1.y] = true;
        }else if(this.Ubicacion.Posicion1.y === this.Ubicacion.Posicion2.y && this.Ubicacion.Posicion1.y === posicion.y){
            this.Estado[posicion.x - this.Ubicacion.Posicion1.x] = true;
        }        
    }

    Hundido(){
        return this.Estado.every((x) => x === true);
    }
}


const TiposBarco = [new TipoBarco("Submarino", 1), new TipoBarco("Corbeta", 2), new TipoBarco("Fragata", 3), new TipoBarco("Destructor", 4), new TipoBarco("Portaaviones", 5)]

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

const tablero = []

const Barcos = [new Barco(1,"",new Ubicacion({x:3,y:3},{x:3,y:3})),         // esto es bastante raro usa las posiciones sin new. no seria valido si tuviera una funcion adentro
                new Barco(2,"",new Ubicacion({x:5,y:1},{x:6,y:1})),
                new Barco(0,"Destructor", new Ubicacion(new Posicion(4,2),new Posicion(4,5))),
                new Barco(5,"",new Ubicacion(new Posicion(8,3),new Posicion(12,3)))];



console.log(TiposBarco);
console.log(Barcos);

// Test: 3 / 2 / 0 / -1 / 3
let disparo = new Posicion(9,3)
let barcoAlcanzado = ValidarDisparo(disparo);
console.log("disparo", disparo, barcoAlcanzado);
if (barcoAlcanzado != -1){
    Barcos[barcoAlcanzado].Tocado(disparo);
    console.log(Barcos[barcoAlcanzado].Estado);
    console.log("Hundido: ", Barcos[barcoAlcanzado].Hundido());
} 

disparo = new Posicion(4,3);
barcoAlcanzado = ValidarDisparo(disparo);
console.log("disparo", disparo, ValidarDisparo(disparo));
if (barcoAlcanzado != -1){
    Barcos[barcoAlcanzado].Tocado(disparo);
    console.log(Barcos[barcoAlcanzado].Estado);
    console.log("Hundido: ", Barcos[barcoAlcanzado].Hundido());
} 
disparo = new Posicion(3,3);
barcoAlcanzado = ValidarDisparo(disparo);
console.log("disparo", disparo, ValidarDisparo(disparo));
if (barcoAlcanzado != -1){
    Barcos[barcoAlcanzado].Tocado(disparo);
    console.log(Barcos[barcoAlcanzado].Estado);
    console.log("Hundido: ", Barcos[barcoAlcanzado].Hundido());
} 

disparo = new Posicion(9,2);
barcoAlcanzado = ValidarDisparo(disparo);
console.log("disparo", disparo, ValidarDisparo(disparo));
if (barcoAlcanzado != -1){
    Barcos[barcoAlcanzado].Tocado(disparo);
    console.log(Barcos[barcoAlcanzado].Estado);
    console.log("Hundido: ", Barcos[barcoAlcanzado].Hundido());
} 

disparo = new Posicion(10,3)
barcoAlcanzado = ValidarDisparo(disparo);
console.log("disparo", disparo, barcoAlcanzado);
if (barcoAlcanzado != -1){
    Barcos[barcoAlcanzado].Tocado(disparo);
    console.log(Barcos[barcoAlcanzado].Estado);
    console.log("Hundido: ", Barcos[barcoAlcanzado].Hundido());
} 

//Test: Largo: 2 / Largo: -1 /  Largo: 5
let ubicacion1 = new Ubicacion({x:5,y:1},{x:6,y:1})
console.log("Largo: ", ubicacion1.Largo());
ubicacion1 = new Ubicacion({x:5,y:1},{x:6,y:2})
console.log("Largo: ", ubicacion1.Largo());
ubicacion1 = new Ubicacion({x:5,y:3},{x:5,y:7})
console.log("Largo: ", ubicacion1.Largo());




// Test: true, false, false, true
let ub1 = new Ubicacion({x:3,y:3},{x:3,y:3});
let ub2 = new Ubicacion({x:5,y:1},{x:6,y:1});
console.log(TiposBarco[0].LongitudValida(ub1));
console.log(TiposBarco[0].LongitudValida(ub2));
console.log(TiposBarco[1].LongitudValida(ub1));
console.log(TiposBarco[1].LongitudValida(ub2));

// Test 0, 1, 4, -1
console.log("Submarino", BuscarID("Submarino"));
console.log("Corbeta", BuscarID("Corbeta"));
console.log("PortaAviones", BuscarID("PortaAviones"));
console.log("Goleta", BuscarID("Goleta"));
