const gridSize = 16; // 16x16 grid = 256 squares
const squareSize = 50; // pixels

const grid = document.createElement('div');
grid.id = 'grid';
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';
grid.style.width = `${gridSize * squareSize}px`; // 800px
grid.style.border = '3px solid black';
grid.style.padding = '1rem';
document.body.appendChild(grid);

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.backgroundColor = 'white'; // Start with white
    square.style.border = '1px solid #333';
    square.style.boxSizing = 'border-box'; // Include border in size calculation

    // Add random color on hover
    square.addEventListener('mouseenter', () => {
        square.style.backgroundColor = getRandomColor();
    });

    grid.appendChild(square);
}
