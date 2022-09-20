const sounds = [new Audio("./audio/do.mp3"), new Audio("./audio/re.mp3"), new Audio("./audio/mi.mp3"), new Audio("./audio/fa.mp3")] ;
const soundFallo = new Audio("./audio/beep-03.mp3");

const numbers = [];
const tiempoNota = 1500;
let sequenceNumber = 1;
let turno = "maquina";
let playerSeqPosition = 0;

function SimonSetup(cantidad){
    for (i=0; i < cantidad; i++){
        numbers.push(getRndInteger(1,4));
    }  
}

async function SimonList(){
    let espacioTexto = document.getElementById("texto");
    espacioTexto.innerText = "";

    for (i=0; i < sequenceNumber + 1; i++){
        await sleep(1000);
        SimonPlayOne(numbers[i], false); 
    }
    sequenceNumber++;
    turno = "humano";
}

function SimonPress(numero){
    if (turno === "humano"){
        console.log("playerSeqPos: ", playerSeqPosition, "num: ", numero, "numbers[psp]:", numbers[playerSeqPosition], "seqNum: ",sequenceNumber)
        if (numbers[playerSeqPosition] === numero){
            SimonPlayOne(numero, false);
            playerSeqPosition++;
            if (playerSeqPosition === sequenceNumber){
                turno = "maquina";
                playerSeqPosition = 0;
                console.log("ahora maquina");
                SimonList();
            }
        }
        else{
            console.log("error");
            SimonPlayOne(numero, true);
            SimonPlayOne(numero, true);

            let espacioTexto = document.getElementById("texto");
            espacioTexto.innerText = `Juntaste ${sequenceNumber} niveles` ;

            SimonSetup(100);
            sequenceNumber = 1;
            
        }     
    }    
}



async function SimonPlayOne(numero, fallo){
    if (fallo){
        console.log("sonido fallo");
        AudioPlay(soundFallo,tiempoNota);
    } else{
        AudioPlay(sounds[numero-1],tiempoNota);
    }

    let botonPresionado = document.getElementById(`simon${numero}`);
    let colorOrigen = botonPresionado.style.backgroundColor;
    botonPresionado.style.backgroundColor = 'orange';

    await sleep(700);
    botonPresionado.style.backgroundColor = colorOrigen;
}




function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }


// para poder acortar el tiempo que suena cada nota.
function AudioPlay(audio, time){
	audio.currentTime=1;
	audio.play();
       
    // check cada 1/10 de segundo si se cumplio time
	setInterval(function(){
		if(audio.currentTime > time){
			audio.pause();
		}
	},100);
}

function AudioPlay2(audio, time){

	audio.play();
       

}
    