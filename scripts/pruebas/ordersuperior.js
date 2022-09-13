function elijeFuncion (opcion, f0){
    switch (opcion){
        case "+":
            return (a,b) => f0(a,b) + a + b;
            break;
        case "-":
            return (a,b) => f0(a,b) - a - b;
            break;
    }
}

function producto(a, b){
    return a * b;
}

function modulo (a, b){
    return a % b;
}

const f1 = elijeFuncion("+", producto);
console.log(f1(10,4));

const f2 = elijeFuncion("-", modulo);
console.log(f2(10,4));

const arrayTest = ["uno", "dos", "tres", "cuatro"];


console.log(arrayTest.filter((valor) => valor.length > 3 ));

const arrayTestOrdenado = arrayTest.sort();
console.log(arrayTestOrdenado);

const personas = [{nom: "Alberto", ape: "Perez"}, {nom: "Oscar", ape: "Diaz"}, {nom: "Carlos", ape: "Sanchez"}];
console.log(personas);
personas.sort((a,b) => {
                    if(a.ape > b.ape) return 1
                    else return -1
                  });
console.log(personas);


const apellidosyLong = personas.map((a) => {return {ape: a.ape, largoNom : a.nom.length}} );
console.log(apellidosyLong)





// llamando con una arrow function anonima
arrayTest.forEach((elemento, index) => {
    console.log(`${index}:${elemento}`)
});



function f3(elemento, indice){
    console.log(`${elemento}->${indice}`);
}
//llamando con una funcion predefinida y nominada
arrayTest.forEach(f3);

console.log(document.body);
console.dir(document.body);






 