class Table{
    DomTableElement = null;
    DomElements = [];
    ColumnElementsNumber = 0;
    ActualDataRows = 0;
    Contenedor = null;
    ClaseTable = [];
    ClaseTitulos = [];
    ClaseDatos = [];

    constructor(arrayColumnTitles, claseTable, claseTitulos, claseDatos){
        this.ColumnElementsNumber = arrayColumnTitles.length;
        this.ClaseTable = claseTable;
        this.ClaseTitulos = claseTitulos;
        this.ClaseDatos = claseDatos;

        const t = document.createElement("table");
        this.ClaseTable.forEach(element => {t.classList.add(element)} ); 
        const r = document.createElement("tr");
        r.setAttribute("id",0);
        this.DomElements.push([]);
        this.DomElements[0].push(r);  // la columna 0 tiene el tr
        for (let i = 0; i < this.ColumnElementsNumber; i++){
            const c = document.createElement("th");
            this.ClaseTitulos.forEach(element => {c.classList.add(element)} ); 
            c.textContent = arrayColumnTitles[i];
            this.DomElements[0].push(c);
            r.append(c);
        }
        t.append(r);
        this.DomTableElement = t;
    }

    AplyTo(contenedor){
        this.Contenedor = contenedor;
        this.Contenedor.append(this.DomTableElement);
    }

    InsertRows = (rows) =>{
        for(let i=0; i < rows.length; i++){
            if(rows[i].length != this.ColumnElementsNumber){
                console.log(`Row ${i} omitida`)
            }else{
                let fila = this.DomElements.length;
                const r = document.createElement("tr");
                r.setAttribute("id",fila);
                this.DomElements.push([]);
                this.DomElements[fila].push(r);  // la columna 0 tiene el tr
                for (let j=0; j < this.ColumnElementsNumber; j++){
                    const c = document.createElement("td");
                    this.ClaseDatos.forEach(element => {c.classList.add(element)} ); 
                    c.classList.add(this.ClaseDatos);
                    c.textContent = rows[i][j];
                    this.DomElements[fila].push(c);
                    r.append(c);
                }
                this.ActualDataRows++;
                this.DomTableElement.append(r);
            }
        }
    }

    DeleteRow = (dataRowNumber) => {
        this.DomElements[dataRowNumber][0].remove();
        this.DomElements.splice(dataRowNumber,1);
    }
}

/*
const titulos = ["Nombre", "Apellido", "Edad", "Altura"]
const datos= [
    ["Pablo", "Berdasco", 55, 1.72],
    ["Pedro", "Gonzalez", 49, 1.80]
    ]
const datos2 =[["Juan","Berdasco", 25,1.76]];

const grilla = new Table(titulos,["gridTable"], ["gridElements", "gridTitleElements"], ["gridElements", "gridDataElements"]);

const ubicar = document.querySelector(".areaDisplayRecords");
grilla.AplyTo(ubicar);

grilla.InsertRows(datos);
grilla.InsertRows(datos2);

grilla.DeleteRow(2);

*/
