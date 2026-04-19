const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorInput = document.getElementById("fav_color");
const brushSize = document.getElementById("brushSize");
const brushOutput = document.getElementById("brushOutput");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");
const eraserBtn = document.querySelector(".eraser");
const colorButtons = document.querySelectorAll(".clr");

let isDrawing = false;
let lineW = 5;
let currentColor = "#000";

// Set initial canvas size based on window width
function setCanvasSize() {
    if (window.innerWidth >= 1200) {
        canvas.width = 1000;
        canvas.height = 500;
    } else {
        canvas.width = 800;
        canvas.height = 400;
    }
    ctx.lineWidth = lineW;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentColor;
}
// Update canvas size on window resize
setCanvasSize();

window.addEventListener("resize", () => {
    setCanvasSize();
});


ctx.lineWidth = lineW;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = currentColor;

// Color picker functionality
colorInput.addEventListener("input", () => {
    currentColor = colorInput.value;
    ctx.strokeStyle = colorInput.value;
});

// Brush size adjustment functionality
brushSize.addEventListener("input", () => {
    lineW = brushSize.value;
    ctx.lineWidth = lineW;
    brushOutput.textContent = lineW;
});

// Color selection functionality
colorButtons.forEach(clr => {
    clr.addEventListener("click", () => {
        currentColor = clr.dataset.clr;
        ctx.strokeStyle = currentColor;
    });
});

// Eraser functionality
eraserBtn.addEventListener("click", () => {
    ctx.strokeStyle = "white";
});

// Clear canvas functionality
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

// Save canvas as image functionality
saveBtn.addEventListener("click", () => {
    const data = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "sketch.png";
    a.href = data;
    a.click();
});

// Start drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw when mouse is moved
canvas.addEventListener("mousemove", (e) => {
    // Only draw if the left mouse button is pressed
    if (!isDrawing || e.buttons !== 1) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Stop drawing
window.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
});

// Stop drawing when mouse leaves canvas
canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
    ctx.beginPath();    
});