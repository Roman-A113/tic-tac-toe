const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let size = 3;
let counter = 0;
let grid = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];

startGame();
addResetListener();

function startGame() {
    renderGrid(size);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (grid[row][col] !== EMPTY)
        return

    symbol = counter % 2 ? ZERO : CROSS;
    renderSymbolInCell(symbol, row, col);
    grid[row][col] = symbol;
    counter++;

    if (haveWinner(symbol, row, col)) {
        alert("Победил" + " " + symbol);
    }

    if (counter === 9) {
        alert("Победила дружба")
    }
}

function haveWinner(symbol, row, col) {
    return checkLine(symbol, 0, 1, row, col)
        || checkLine(symbol, 1, 0, row, col)
        || checkLine(symbol, 1, 1, row, col)
        || checkLine(symbol, 1, -1, row, col);
}

function checkLine(symbol, dx, dy, startx, starty) {
    let count = 0;

    let x = startx, y = starty;
    while (x < size && y < size && x >= 0 && y >= 0) {
        if (grid[x][y] === symbol) {
            count++;
            x += dx;
            y += dy;
        } else {
            break;
        }
    }

    x = startx - dx; y = starty - dy;
    while (x < size && y < size && x >= 0 && y >= 0) {
        if (grid[x][y] === symbol) {
            count++;
            x -= dx;
            y -= dy;
        } else {
            break;
        }
    }

    return count >= 3;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    grid = createGrid(size, size);
    counter = 0;

    renderGrid(size);
}

function createGrid(rows, cols, fillValue = EMPTY) {
    return Array.from({ length: rows }, () =>
        Array(cols).fill(fillValue)
    );
}

/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
