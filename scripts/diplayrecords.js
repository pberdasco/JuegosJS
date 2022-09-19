function TablaYChart(juego){
    DesplegarTablaRecords(juego);
    DibujarChart(juego);

    const borrarRecords = document.querySelector(".records-button");
    borrarRecords.addEventListener("click", (e) => alert("No implementado aun"));
}

function DesplegarTablaRecords(juego){
    const listaRecords = Record.GetList(juego);

    // solo los registros personales ordenados de mayor a menor, convertidos a elementos de un array
    const datos = listaRecords.filter((x) => x.Tipo === "Personal")
                                        .sort((a,b) => ((a.Nivel > b.Nivel) || (a.Nivel === b.Nivel && a.Tiempo < b.Tiempo) ? -1 : 1 ))
                                        .map((rec) => [rec.Juego, rec.Usuario, rec.Nivel, rec.Tiempo, new Date(rec.Fecha).toLocaleString()]);  
    
     
    const titulos = ["Juego", "Usuario", "Nivel", "Tiempo", "Fecha"];
    
    const grilla = new Table(titulos,["gridTable"], ["gridElements", "gridTitleElements"], ["gridElements", "gridDataElements"]);
    grilla.InsertRows(datos);
    grilla.AplyTo(document.querySelector(".areaDisplayRecords"));
    return datos;
}
 


function DibujarChart(juego){
    const listaRecords = Record.GetList(juego);
    const datos = listaRecords.filter((x) => x.Tipo === "Personal")
                 .sort((a,b) => ((a.Nivel > b.Nivel) || (a.Nivel === b.Nivel && a.Tiempo < b.Tiempo) ? -1 : 1 ))
  
    const labels = datos.map((rec) => rec.Usuario);
    const valores = datos.map((rec) => rec.Nivel);

   
    const data = {
        labels: labels,
        datasets: [{
            label: 'Records Personales',
            backgroundColor: 'rgba(75, 192, 192, 0.7)',  // esto puede ser un array para tener colores distintos por usuario
            borderColor: 'rgb(75, 192, 192)',            // idem
            data: valores,
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                  beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}




