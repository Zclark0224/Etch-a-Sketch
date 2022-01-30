//defaults
const defaultColor = '#000000';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

//elements from HTML
const container = document.getElementById('container');
const gridItem = document.querySelector('.grid-item');
const colorBtn = document.querySelector('.colorBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const clearBtn = document.querySelector('.clearBtn');
const charcoalBtn = document.querySelector('.charcoalBtn');
const colorPicker = document.querySelector('#colorPicker');
const slider = document.getElementById('sizeSlider');
const sizeDisplay = document.getElementById('sizeDisplay');

//event listeners
colorBtn.addEventListener('click', function() {
    setCurrentMode('color')
});
eraserBtn.addEventListener('click', function() {
    setCurrentMode('eraser');
});
rainbowBtn.addEventListener('click', function() {
    setCurrentMode('rainbow');
});
charcoalBtn.addEventListener('click', function() {
    setCurrentMode('charcoal');
});
slider.addEventListener('change', function(){
    sizeDisplay.innerHTML = `${this.value} x ${this.value}`;
    container.innerHTML='';
    setCurrentSize(this.value);
    makeGrid(this.value);
});
clearBtn.addEventListener('click', function() {
    container.innerHTML='';
    makeGrid(currentSize);
});
colorPicker.addEventListener('change', newColor, false);
colorPicker.value = defaultColor;

//size functions
function makeGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let c=0; c < size*size; c++) {
        const cell = document.createElement('div');
        container.appendChild(cell);
        cell.addEventListener('mouseover', changeColor);
    }
};

function setCurrentSize(newSize) {
    currentSize = newSize;
};

function updateSizeDisplay(newSize) {
    sizeDisplay.innerHTML = `${value} x ${value}`;
};

//mode functions
function setCurrentMode(newMode) {
    activateNewMode(newMode);
    currentMode = newMode;
};

function activateNewMode(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color'){
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } else if (currentMode === 'charcoal') {
        charcoalBtn.classList.remove('active');
    };

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color'){
        colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    } else if (newMode === 'charcoal') {
        charcoalBtn.classList.add('active');
    };
};

//color functions
function newColor(event) {
    currentColor = event.target.value;
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
    } else if (currentMode === 'charcoal') {
        e.target.style.backgroundColor = 'black';
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.2;
   }
}

//onload
window.onload = function() {
    makeGrid(defaultSize);
    activateNewMode('color');
}