let gridSize = 16; // 16x16 grid = 256 squares
// const squareSize = 60; // Each square is 60px x 60px
const containerSize = 960; // Total grid size in pixels (stays constant)
let isMouseDown = false; // Track if mouse button is pressed

// // Create a grid container
// const grid = document.createElement('div');
// grid.id = 'grid';
// grid.style.display = 'flex'; // Flexbox container
// grid.style.flexWrap = 'wrap'; //Items wrap to next line when they reach the edge
// grid.style.width = `${gridSize * squareSize}px`; // 960px
// grid.style.border = '3px solid black';
// grid.style.padding = '1rem';
// document.body.appendChild(grid);

// Function to create the grid
function createGrid(size) {
    const squareSize = containerSize / size; // Calculate square size dynamically

    // Remove existing grid if it exists
    const existingGrid = document.getElementById('grid');
    if (existingGrid) {
        existingGrid.remove();
    }

    // Create new grid
    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.style.display = 'flex'; // Flexbox container
    grid.style.flexWrap = 'wrap';
    grid.style.width = `${containerSize}px`; // Always 960px
    grid.style.height = `${containerSize}px`; // Always 960px
    grid.style.border = '3px solid black';
    grid.style.padding = '0';
    grid.style.boxSizing = 'content-box';
    grid.style.userSelect = 'none'; // Prevent text selection while dragging
    document.body.appendChild(grid);

    // Prevents default drag behaviour
    grid.addEventListener('dragstart', (e) => e.preventDefault());

    // Create squares without individual event listeners
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.backgroundColor = 'white';
        square.style.border = '1px solid #ddd';
        square.style.boxSizing = 'border-box';
        square.dataset.interactions = '0'; // Store interactions in data attribute
        grid.appendChild(square);
    }

    // One event listener on the grid (event delegation)
    const darkenSquare = (square) => {
        let interactions = parseInt(square.dataset.interactions);
        interactions++;
        if (interactions > 5) interactions = 5;

        square.dataset.interactions = interactions;
        const brightness = 255 - (interactions * 51);
        square.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    };

    grid.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        if (e.target !== grid) {
            darkenSquare(e.target);
        }
    });

    // 1 event listener for the entire grid
    // Uses event bubbling - events on children bubble up to parent
    // mouseover bubbles up (works with event delegation)
    grid.addEventListener('mouseover', (e) => {
        if (isMouseDown && e.target !== grid) {
            darkenSquare(e.target); // tells which square was hovered
        }
    });
}

// // Track mouse button state globally
// document.addEventListener('mousedown', () => {
//     isMouseDown = true;
// });

// Track mouse button state globally
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Create "New Grid" button
const newGridBtn = document.createElement('button');
newGridBtn.textContent = 'New Grid';
newGridBtn.style.margin = '1rem';
newGridBtn.style.padding = '10px 20px';
newGridBtn.style.fontSize = '16px';
document.body.appendChild(newGridBtn);

newGridBtn.addEventListener('click', () => {
    let userInput = prompt('Enter number of squares per side (max 100):');

    // Validates input 
    let size = parseInt(userInput);

    if (isNaN(size) || size < 1) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    if (size > 100) {
        alert('Maximum size is 100. Setting to 100.');
        size = 100;
    }
    gridSize = size;
    createGrid(gridSize);
});

// Create "Reset Grid" button
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset Grid';
resetBtn.style.margin = '1rem';
resetBtn.style.padding = '10px 20px';
resetBtn.style.fontSize = '16px';
document.body.appendChild(resetBtn);

resetBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('#grid div');
    squares.forEach(square => {
        square.style.backgroundColor = 'rgb(255, 255, 255)';
        square.dataset.interactions = '0'; // Stores data in the element itself
    });
});

// Create initial grid
createGrid(gridSize);
