

function probarFunciones(){
    DefinirTiposBarco();

    const T_Jugador_Propio = new Tablero(0,0);
    const T_Jugador_Disparos = new Tablero(1,1);
    const T_Maquina_Propio = new Tablero(2,-1);
    const T_Maquina_Disparos = new Tablero(3,-1);

    const Barcos = [new Barco(1,new Ubicacion({x:3,y:3},{x:3,y:3}),T_Jugador_Propio.Logico,0),         // esto es bastante raro usa las posiciones sin new. no seria valido si tuviera una funcion adentro
                    new Barco(2,new Ubicacion({x:5,y:1},{x:6,y:1}),T_Jugador_Propio.Logico,0),
                    new Barco(-1, new Ubicacion(new Posicion(4,2),new Posicion(4,5)),T_Jugador_Propio.Logico,0,"Destructor"),
                    new Barco(5,new Ubicacion(new Posicion(8,3),new Posicion(12,3)),T_Jugador_Propio.Logico,0)];


    console.log(TiposBarco);
    console.log(Barcos);

    variosDisparos(Barcos);


    Barcos.forEach((e) => {dibujarBarco(e,T_Jugador_Propio.Grafico)});

}


function variosDisparos(Barcos){
    // Test: 3 / 2 / 0 / -1 / 3
    let disparo = new Posicion(9,"C");
    let barcoAlcanzado = ValidarDisparo(Barcos,disparo);
    if (barcoAlcanzado != -1){
        Barcos[barcoAlcanzado].MarcarTocado(disparo);
    } 

    disparo = new Posicion(4,"C");
    barcoAlcanzado = ValidarDisparo(Barcos,disparo);
    if (barcoAlcanzado != -1){
        Barcos[barcoAlcanzado].MarcarTocado(disparo);
    } 
    disparo = new Posicion(3,"C");
    barcoAlcanzado = ValidarDisparo(Barcos, disparo);
    if (barcoAlcanzado != -1){
        Barcos[barcoAlcanzado].MarcarTocado(disparo);
    } 

    disparo = new Posicion(9,"B");
    barcoAlcanzado = ValidarDisparo(Barcos, disparo);
    if (barcoAlcanzado != -1){
        Barcos[barcoAlcanzado].MarcarTocado(disparo);
    } 

    disparo = new Posicion(10,"C")
    barcoAlcanzado = ValidarDisparo(Barcos, disparo);
    if (barcoAlcanzado != -1){
        Barcos[barcoAlcanzado].MarcarTocado(disparo);
    } 

    console.log("Despues de los disparos: ", Barcos);
}




    /*
    //Test: Largo: 2 / Largo: -1 /  Largo: 5
    let ubicacion1 = new Ubicacion({x:5,y:1},{x:6,y:1})
    console.log("Largo: ", ubicacion1.Largo());
    ubicacion1 = new Ubicacion({x:5,y:1},{x:6,y:2})
    console.log("Largo: ", ubicacion1.Largo());
    ubicacion1 = new Ubicacion({x:5,y:3},{x:5,y:7})
    console.log("Largo: ", ubicacion1.Largo());
    */


    /*
    // Test: true, false, false, true
    let ub1 = new Ubicacion({x:3,y:3},{x:3,y:3});
    let ub2 = new Ubicacion({x:5,y:1},{x:6,y:1});
    console.log(TiposBarco[0].LongitudValida(ub1));
    console.log(TiposBarco[0].LongitudValida(ub2));
    console.log(TiposBarco[1].LongitudValida(ub1));
    console.log(TiposBarco[1].LongitudValida(ub2));
    */

    

    /*
    barcoMal = new Barco(3,new Ubicacion(new Posicion(10,10),new Posicion(13,13),TL0,0));
    if (barcoMal.id = -1) console.log("Barco no creado", barcoMal); 
    */
   


