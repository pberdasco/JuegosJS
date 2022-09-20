ValidarLogin();


function ValidarLogin(){
    const nombreUsuario = localStorage.getItem("Usuario");
    if (nombreUsuario != null){
        DisplayLogueado(nombreUsuario); 
    }else{
        DisplayNoLogueado();
    }
}

function DisplayNoLogueado(){
    document.querySelector(".login-name").textContent = "";
    const loginButton = document.querySelector(".login-button");
    loginButton.textContent = "Login";
    loginButton.removeEventListener("click", Desloguearse);
    loginButton.addEventListener("click", SolicitarLogin);
}

function DisplayLogueado(usuario){
    document.querySelector(".login-name").textContent = usuario;
    const loginButton = document.querySelector(".login-button");
    loginButton.textContent = "Logout";
    loginButton.removeEventListener("click", SolicitarLogin);
    loginButton.addEventListener("click", Desloguearse);
}

function SolicitarLogin(){
    const loginSection = document.getElementById("login");    
    loginSection.classList.replace("login-off", "login-on"); 
    const submitButton = document.getElementById("login_submit");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        ValidarDatosFormLogin()}
        );
}

function Desloguearse(){
    localStorage.removeItem("Usuario");
    ValidarLogin();
}


function ValidarDatosFormLogin(){
    const formulario = document.querySelector("#login_form");
    const usuario = formulario.usuario;
    if (usuario.value.length < 2) {
        alert("Nombre de usuario inválido. Debe tener 2 o mas letras");
    }else{
        /* debería hacer el remove pero como para tomar el evento tuve que poner una
           arrow function, entiendo que no serviria.  TODO: estudiar el tema del event
           y el preventDefault() */
        //const submitButton = document.getElementById("login_submit");
        //submitButton.removeEventListener("click", ValidarLogin);
        localStorage.setItem("Usuario", usuario.value);
        usuario.value = "";
        const loginSection = document.getElementById("login");
        loginSection.classList.replace("login-on", "login-off"); 
        ValidarLogin();
    }
}