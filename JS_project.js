//"use strict";

const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
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

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayerOTurn = false;

startGame();

restartButton.addEventListener('click', startGame);

let playerXScore = 0;
let playerOScore = 0;

function updateScoreboard() {
    document.getElementById('player-x-score').textContent = playerXScore;
    document.getElementById('player-o-score').textContent = playerOScore;  

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!";
    } else {
        winningMessageTextElement.innerText = `Player ${isPlayerOTurn ? "O's" : "□'s"} Wins!`;  

        if (isPlayerOTurn) {
            playerOScore++;
        } else {
            playerXScore++;
        }
        updateScoreboard();
    }
    winningMessageElement.classList.add('show');
}

function startGame() {
  isPlayerOTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayerOTurn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}



function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayerOTurn = !isPlayerOTurn;
}

function setBoardHoverClass() {
  board.classList.remove(PLAYER_X_CLASS); 
  board.classList.remove(PLAYER_O_CLASS);
  if (isPlayerOTurn) {
    board.classList.add(PLAYER_O_CLASS);
  } else {
    board.classList.add(PLAYER_X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}