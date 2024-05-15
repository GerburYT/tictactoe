// script.js

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winningMessage');
const playerTurnElement = document.getElementById('playerTurn');
const xWinsElement = document.getElementById('xWins');
const oWinsElement = document.getElementById('oWins');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;
let isGameActive;
let xWins = 0;
let oWins = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    isGameActive = true;
    playerTurnElement.innerText = "Player X's turn";
    winningMessageElement.innerText = '';
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.innerText = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    if (!isGameActive) return;
    const cell = e.target;
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        updateScore(currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        updatePlayerTurn();
    }
}

function endGame(draw) {
    isGameActive = false;
    if (draw) {
        winningMessageElement.innerText = 'Draw!';
    } else {
        winningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === 'x' ? 'X' : 'O';
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (circleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

function updatePlayerTurn() {
    playerTurnElement.innerText = `Player ${circleTurn ? "O's" : "X's"} turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function updateScore(winner) {
    if (winner === 'x') {
        xWins++;
        xWinsElement.innerText = xWins;
    } else {
        oWins++;
        oWinsElement.innerText = oWins;
    }
}
