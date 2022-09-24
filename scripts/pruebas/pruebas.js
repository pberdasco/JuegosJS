
// === Creando y usando procesos asyncronos
/*
setTimeout(callback, 6000, "8 segundos", "8S");
setTimeout(callback, 4000, "5 segundos", "5S");
setTimeout(callback, 2000, "2 segundos", "2S");

const eventoFuturo = (res) => {
    return new Promise ( (resolve, reject) => {
        console.log(`procesado ${res}...`);
        setTimeout( () => {
            res ? resolve(`... fin proceso ${res}`) :  reject(`promesa rechazada`)  
        } ,8000, res);
    } )
}

console.log(eventoFuturo(true)
                .then((response) => console.log("sali del proceso true"+response))
                .catch((error) => console.log(error)));
console.log(eventoFuturo(false)
                .then((response) => console.log("sali del proceso true"+response))
                .catch((error) => console.log(error)));

function callback(texto, tipo){
    console.log("pasaron: ", texto, tipo);
}
*/

const titulo = document.querySelector("#texto");
titulo.addEventListener("dblclick", (e) => {alert(e.type)})
 


/*

// esta parte necesita la clase records 

const myFirstRecord = new Record("Pablo", 2, 44);
let recordPersonal = Record.Get("FG","Pablo");
let recordGeneral = Record.Get("FG", "General");


if (myFirstRecord.IsNewRecord(recordPersonal)){
    console.log("Pablo. nuevo record personal. Guardandolo")
    myFirstRecord.Save("Personal");
}  
if (myFirstRecord.IsNewRecord(recordGeneral)){
    console.log("Pablo. nuevo record General. Guardandolo")
    myFirstRecord.Save("General");
}  

recordPersonal = Record.Get("FG","Pablo");
recordGeneral = Record.Get("FG", "General");


// ----- ahora pedro
const PedroFirstRecord = new Record("Pedro", 2, 60);
recordPersonal = Record.Get("FG","Pedro");
if (PedroFirstRecord.IsNewRecord(recordPersonal)){
    console.log("Pedro. nuevo record personal. Guardandolo")
    PedroFirstRecord.Save("Personal");
}  
recordGeneral = Record.Get("FG", "General");
if (PedroFirstRecord.IsNewRecord(recordGeneral)){
    console.log("Pedro. nuevo record General. Guardandolo")
    PedroFirstRecord.Save("General");
}  

console.log(Record.GetList("FG"));


//=========================  Algo de DOM
let divs = document.getElementsByTagName("div");  // devuelve una lista de elementos
for ( const oneDiv of divs){
    console.log(oneDiv.innerHTML);
}

console.log("Menu NAV");
const menuIndex = document.getElementsByTagName("ul");
const nuevoBoton = document.createElement("li");
nuevoBoton.innerHTML = `<button class="botonNav" type="button" onclick="CargarPagina('./testGrid.html')" id="btnAgregado">Boton Nuevo grid</button>`
menuIndex[0].append(nuevoBoton);
nuevoBoton.style.backgroundColor = "red";


const ulTags = document.getElementsByTagName("ul");
const boton = ulTags[0].children[3];
boton.style.backgroundColor = "red";

console.log("ul-lis", ulTags[0].children);
console.log("li-3-children", ulTags[0].children[3]);
console.log("li-3-chnode", ulTags[0].childNodes[3]);


const h1Tag = document.getElementsByTagName("h1");
h1Tag[0].addEventListener("click", (ev) => alert(`Presionaron click sobre el h1. ${ev.target}`));

//h1Tag[0].onclick = function(){ClickSobreH1};

console.log(h1Tag[0].innerText);
h1Tag[0].innerText= `Nuevo 
                     Titulo`;


a = 19;
b = 1;
c = 4;

console.log("19 (10011) and 1 (00001):",a & b);
console.log("19 (10011) and 4 (00100):",a & c);
console.log("19 (10011) or 4 (00100):",a | c);
console.log("19 (10011) >> 1:",a >> 1);

console.log("=======================");
console.log("Spreed, y copia de vectores")

let vector1 = [3,5,9];
let vector2 = vector1;   


let vector3=[]
for (let i = 0; i<vector1.length;i++){
    vector3[i]=vector1[i];
}

vector4 = vector1.slice();

let vector5 = [...vector1];

vector2[1] = 22;

console.log(vector1);
console.log(vector2);
console.log(vector3);
console.log(vector4);
console.log(vector5);

console.log("=======================");


const array1 = [1,2,3,4,5,6];
const array2 = [];
array1.forEach((x) => array2.push(x * 2));

// Prueba de onwheel="MueveRueda(event)"
function MueveRueda(event){
    //console.log(event);
    if (event.wheelDelta > 0) rueda++;
    else rueda--;
    
    console.log(rueda, event.wheelDelta);
}





//====== Lectura y Modificion Variables CSS ====== 
const root = document.querySelector(':root');

function getRootVariable(variable){
    return getComputedStyle(root).getPropertyValue(variable);
}

function setRootVariable(variable, value){
    root.style.setProperty(variable, value);
}

*/