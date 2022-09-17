
// wxPopUp crea una ventana fija donde en principio muestra el elemento que se envie en content
// Parámetros:
//         position {top (unidades desde arriba), y_pos (unidades desde side), side ("L"eft/"R"ight)}   (ubicacion de la ventana)
//         size {width, height}  (ancho y alto de la ventana)
//         type (0=ok, 1=error, 2=input)
//         atributos {drag (true,false), closeX (true,false), button (label)} 
//         content (el elemento html que se quiera desplegar en la ventana)
// Propiedades:
//         window: el elemento que tiene la ventana.
// Métodos:
//         Show: muestra la ventana creada
//         Hide: oculta la ventana (pero no la elimina)
//         Move: re-ubica la ventana
//         Resize: cambia el ancho y alto de la ventana
//         IsVisible: indica si la ventana esta visible
// Requisitos:
//         que se cargue una stylesheet wx-style.css
class wxPopUp{
    #TypeClass = ['w-modal-container-t-ok', "w-modal-container-t-err", "w-modal-container-t-input"];
    #visible = false;  
    #type = 0; //0=ok, 1=err, 2=input
    #content = null;
    #position = {
        top: "5rem",
        y_pos: "5rem",
        side: "L"
    }
    #size = {
        width: "30rem",
        height: "10rem"
    }
    window = null;
    constructor(position,size,type,atributos,content){
        this.#type = type;
        this.#content = content;            
        
        const body = document.getElementsByTagName("body")[0];
        this.window = document.createElement("div")
        this.window.classList.add("w-modal-container", this.#TypeClass[this.#type], "w-popup-off");
        
        this.Move(position);
        this.Resize(size);
        if (atributos.drag) {
            //TODO: no se porque no andan los drag / dragstart...
            this.window.addEventListener("drag", this.Drag);
            this.window.addEventListener("dragstart", this.DragStart);
            this.window.addEventListener("click", this.Click);
        }
        if (atributos.closeX){
            this.closeX = document.createElement("div");
            this.closeX.classList.add("wx-closeX");
            this.closeX.textContent = "X";
            this.closeX.addEventListener("click", this.Close);
            this.window.append(this.closeX);
        }

        this.window.append(this.#content);
        body.append(this.window);
    }
    
    Show = () => {
        this.window.classList.replace("w-popup-off", "w-popup-on");
        this.#visible = true;
    }
    Hide = () => {
        this.window.classList.replace("w-popup-on", "w-popup-off");
        this.#visible = false;
    }

    Move = (position) => {
        this.#position.top = position.top;
        this.#position.y_pos = position.y_pos;
        this.#position.side = position.side;

        this.window.style.top = this.#position.top;
        if (this.#position.side === "L") {
            this.window.style.left = this.#position.y_pos;
            this.window.style.right = "auto";
         }else{
            this.window.style.right = this.#position.y_pos;
            this.window.style.left = "auto";
         }       
    }

    Resize = (size) => {
        this.#size.width = size.width;
        this.#size.height = size.height;
        this.window.style.width = this.#size.width;
        this.window.style.height = this.#size.height;
    }

    Close = (e) =>{
        this.closeX.addEventListener("click", this.Close);
        this.Hide();
    }

    Drag = (e) =>{
        console.log("drag",e);
    }

    DragStart = (e) =>{
        console.log("drag start", e);
    }

    Click = (e) =>{
        console.log("click", e);
    }

    IsVisible = () => this.#visible;
}

/* =============  ejecucion ================ */
let show = false;

const nuevaP = document.createElement("p");
nuevaP.textContent = "Donde sale esto ";
const newWXpopUp = new wxPopUp({top: "25rem", y_pos: "10rem", side: "R"},{width: "20rem",height: "8rem"},0,{drag: true, closeX: true},nuevaP);
const nuevaP2 = document.createElement("p");
nuevaP2.textContent = "Este es otro texto ";
const newWXpopUp2 = new wxPopUp({top: "5rem", y_pos: "10rem", side: "L"},{width: "15rem",height: "6rem"},2,{drag: true},nuevaP2);


function TestWindow(){
    if(show){
        newWXpopUp.Hide(); 
        newWXpopUp2.Hide();
        show=false;
    } else {
        newWXpopUp.Show();
        newWXpopUp2.Show();
        show=true;
    } 
}



