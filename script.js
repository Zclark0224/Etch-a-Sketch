const defaultColor = 'black';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

const container = document.getElementById('container');
const gridItem = document.querySelector('.grid-item');
const colorBtn = document.querySelector('.colorBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const clearBtn = document.querySelector('.clearBtn');
const charcoalBtn = document.querySelector('.charcoalBtn');

clearBtn.addEventListener('click', function() {
    container.innerHTML='';
    makeGrid(currentSize);
});

colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
charcoalBtn.onclick = () => setCurrentMode('charcoal');

function setCurrentMode(newMode) {
    activateNewMode(newMode);
    currentMode = newMode;
}

function makeGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let c=0; c < size*size; c++) {
        const cell = document.createElement('div');
        container.appendChild(cell);
        cell.addEventListener('mouseover', changeColor);
    }
}

function changeColor(e){
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'rainbow') {
        randomR = Math.floor(Math.random()*255);
        randomG = Math.floor(Math.random()*255);
        randomB = Math.floor(Math.random()*255);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FEFEFE';
    } //else if (currentMode === 'charcoal') {
        //e.target.style.backgroundColor = 
   // }
}

function activateNewMode(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color'){
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } else if (currentMode === 'charcoal') {
        charcoalBtn.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color'){
        colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    } else if (newMode === 'charcoal') {
        charcoalBtn.classList.add('active');
}

window.onload = () => {
    makeGrid(defaultSize);
}