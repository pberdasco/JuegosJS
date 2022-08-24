const listaPalabrasPosibles = ["murcielago", "marsupial", "helicoptero", "automata", "hiperbola", "legumbre", "uniforme", "entrepiso"]; 
let palabraElegida;
let letrasAcertadas;

function ResetAhorcado(){
    palabraElegida = ElegirPalabra();
    letrasAcertadas = InicializarLetrasAcertadas(); 
    
    JugarAhorcado();    
}

function JugarAhorcado(){
    const MAX_ERRORES = 7;
    let errores = 0;

    do { 
        let mostrar = PalabraVisible();
        DisplayPalabra(mostrar); 

        letra = prompt("Ingrese una letra").toLocaleUpperCase();

        acertada = ValidarLetraIngresada(letra);
        console.log(`acertada ${acertada}`);
        if(acertada === 0){
            MostrarHorca(errores);
            errores++;
        }
    } while(errores < MAX_ERRORES && acertada !== 2)

    console.log("Ganaste");
}

function MostrarHorca(errores){
    console.log(`Errores: ${errores}`);
}

function ValidarLetraIngresada(letra){
    // ademas devuelve:  0 si no encontro la letra
    //                   1 si encontro la letra
    //                   2 si encontro la letra pero ademas termino de acertar la palabra
    let acertada = 0;
    console.log("ingrese con letra: ", letra); 
    for(let i = 0; i < palabraElegida.length; i++){
        console.log(letra, palabraElegida[i].toUpperCase())
        if(letra === palabraElegida[i].toUpperCase()){
            letrasAcertadas[i] = true;
            acertada = 1; 
            console.log(i,letra, palabraElegida[i], letrasAcertadas[i]); 
        }
    }
    if (PalabraCompleta()){
        acertada = 2;  
    }
    return acertada;
}

function PalabraCompleta(){
    resultado = true;
    for(let i = 0; i < letrasAcertadas.length; i++){
        if(letrasAcertadas[i] = false){
            resultado = false;
        }
    }
}

function InicializarLetrasAcertadas(){
    const letrasAcertadas = [];
    for(let i = 1; i <= palabraElegida.length; i++){
        letrasAcertadas.push(false);
    }
    return letrasAcertadas;
}

function PalabraVisible(){
    console.log(letrasAcertadas);
                
    
    let resultado = "";
    for(let i = 0; i < palabraElegida.length; i++){
        if(letrasAcertadas[i]){
            resultado += palabraElegida[i];
        }else{
            resultado += "_";
        }
        if(i < palabraElegida.length){
            resultado += " ";
        }
    }
    console.log(resultado);
    return resultado;
}

function ElegirPalabra(){
    return listaPalabrasPosibles[getRndInteger(0, listaPalabrasPosibles.length)];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}