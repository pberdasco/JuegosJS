

const output = document.querySelector(".output");
const grid = {rows:4, cols:7};
const total = grid.rows * grid.cols;

createGrid(total, output, grid.cols);

function createGrid(total, parent, columns){
    const elementHolder = [];
    for(let i=0; i<total; i++){
        const ele = maker(i, parent);
        ele.addEventListener('click', updateBack)
        elementHolder.push(ele);
    }
    parent.style.setProperty(`grid-template-columns`, `repeat(${columns},1fr)`)
    console.log(elementHolder);
}

function maker(i, parent){
    const ele = document.createElement("div");
    ele.textContent = `${i+1}`;
    ele.classList.add("box");
    ele.style.backgroundColor = ranBack();
    return parent.appendChild(ele);
}

function updateBack(e){
    const ele = e.target;
    console.log(ele.style.backgroundColor);
}

function ranBack(){
    return '#' + (Math.random().toString(16).substr(-6));
}
