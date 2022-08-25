let mouseDown = false;

function createGrid(dim) {
    const grid = document.querySelector(".grid");
    const gridSize = grid.clientWidth;

    // Create and insert cells into parent grid div
    for (let i = 0; i < dim ** 2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = gridSize / dim + "px";
        cell.style.height = cell.style.width;

        grid.appendChild(cell);
    }

    addDragAndPaint(grid);

    return grid
}

// Add event listener for drag-and-paint effect on cells
function addDragAndPaint(grid) {
    grid.addEventListener("mousedown", () => mouseDown = true);
    grid.addEventListener("mouseup", () => mouseDown = false);

    grid.addEventListener("mouseover", paintCell);
}

function paintCell(event) {
    if (mouseDown && event.target.className === "cell") {
        changeBgCol(event, "black");
    }
}

// Helper function for paintCell
function changeBgCol(event, color) {
    event.target.style.backgroundColor = color;
}


function rainbowPaint() {
    const grid = document.querySelector(".grid");
    grid.removeEventListener("mouseover", paintCell);
    grid.addEventListener("mouseover", paintCellRainbow);
}

function paintCellRainbow(event) {
    const color = `rgb(${rand255()}, ${rand255()}, ${rand255()})`;

    if (mouseDown && event.target.className === "cell") {
        changeBgCol(event, color);
    }
}

// Generate random integer between 0 and 255
function rand255() {
    return Math.floor(Math.random() * 255)
}

function updateGridSize() {
    
    const dimension = document.getElementById("dimension");

    document.querySelector(".grid").innerHTML = "";
    createGrid(this.value);

    dimension.textContent = `Grid size: ${this.value} x ${this.value}`;
}

// Main JS function
function main() {
    const grid = createGrid(16);

    const slider = document.getElementById("slider");
    slider.addEventListener("input", updateGridSize);

    const rainbowButton = document.getElementById("rainbow-button");
    rainbowButton.addEventListener("click", rainbowPaint);

    
}

main();