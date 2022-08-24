const listaPalabrasPosibles = ["murcielago", "marsupial", "helicoptero", "automata", "hiperbola", "legumbre", "uniforme", "entrepiso"]; 

function ResetAhorcado(){

    palabraElegida = ElegirPalabra();

    // generar un string que tenga _ donde no conozco aun la letra o la letra cuando si la conozco
    // DisplayPalabra(palabra)
    // pedir que se ingrese una letra con prompt (el pedido de letra meterlo en una funcion que llame a prompt)
    // verificar si la letra esta en la palabraElegida
    //     si esta volver a mostrar la palabra elegida con la letra reemplazada
    // contar un error mas y determinar hasta donde dibujar al hombre (1 error = cabeza, 2 errores = cabeza+tronco, etc)
    // llamar a las funciones de dibujo de ahorcadoUI.js



}


function ElegirPalabra(){
    // en esta version: basarse en el string precargado "listaPalabrasPosibles" y 
    // devolver una al azar valiendose de genRndInteger que devuelve un numero al azar entre min y max ambos incluidos
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}