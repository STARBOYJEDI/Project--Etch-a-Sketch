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

for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.backgroundColor = 'white'; // Start with white
    square.style.border = '1px solid #333';
    square.style.boxSizing = 'border-box'; // Include border in size calculation

    let interactions = 0; // Track how many times hovered

    square.addEventListener('mouseenter', () => {
        interactions++;
        if (interactions > 10) interactions = 10; // Cap at 10 (fully black)

        // Darken by 10% each time (max 10 times = black)
        const brightness = 255 - (interactions * 25.5);
        square.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    });
    grid.appendChild(square);
}
