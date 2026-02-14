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

const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset Grid';
resetBtn.style.margin = '1rem';
resetBtn.style.padding = '10px 20px';
resetBtn.style.fontSize = '16px';
document.body.insertBefore(resetBtn, grid);

resetBtn.addEventListener('click', () => {
    const squares = grid.querySelectorAll('div');
    squares.forEach(square => {
        square.style.backgroundColor = 'rgb(255, 255, 255)';
        square.interactions = 0; // Reset counter
    });
});

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
        if (interactions > 5) interactions = 5; // Only 5 steps to black

        // Darken by 10% each time (max 10 times = black)
        const brightness = 255 - (interactions * 51); // 255/5 = 51 per step
        square.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    });
    grid.appendChild(square);
}
