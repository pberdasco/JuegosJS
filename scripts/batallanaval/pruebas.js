
//const tablero = []
const TableroLogico0 = CrearTableroLogico();
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


const tableroGrafico0 = dibujarTablero(0,MAX_X,MAX_Y);
const tableroGrafico1 = dibujarTablero(1,MAX_X,MAX_Y);

dibujarBarco(Barcos[0],tableroGrafico0);
dibujarBarco(Barcos[1],tableroGrafico0);
dibujarBarco(Barcos[2],tableroGrafico0);
dibujarBarco(Barcos[3],tableroGrafico0);


barcoMal = new Barco(3,"",new Ubicacion(new Posicion(10,10),new Posicion(13,13)));
if (barcoMal.id = -1) console.log("Barco no creado", barcoMal); 