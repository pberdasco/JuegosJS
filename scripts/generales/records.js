class Record{
    Juego = "FG";  // por ahora solo frogger, luego ver si aplica a otros juegos
    Tipo = ""
    Usuario= "";
    Fecha= Date.now();
    Nivel= 0;
    Tiempo= 0;
    constructor (usuario, nivel, tiempo){
        this.Usuario = usuario;
        this.Nivel = nivel; 
        this.Tiempo = tiempo;
    }

    IsNewRecord = (oldRecord) => (!oldRecord || oldRecord.Nivel < this.Nivel || (oldRecord.Nivel === this.Nivel && oldRecord.Tiempo >= this.Tiempo));
    

    Save = (userType) => {
        this.Tipo = userType;
        const recordString = JSON.stringify(this);
        if (userType === "General") localStorage.setItem(`${this.Juego}-Record-General`,recordString);
        else localStorage.setItem(`${this.Juego}-Record-${this.Usuario}`,recordString);
    }

    static Get = (juego,usuario) => JSON.parse(localStorage.getItem(`${juego}-Record-${usuario || "General"}`));

    static GetList = (juego) => {
        const startString = `${juego}-Record`;
        const recordsList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(startString)) recordsList.push(JSON.parse(localStorage.getItem(key)));
        }
        return recordsList;
    }
}