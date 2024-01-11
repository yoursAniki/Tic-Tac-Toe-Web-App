import "../scss/style.scss";

// Создание доски (Изменение размера)

const board = document.querySelector(".game__board");
const slider = document.querySelector(".game__slider");
const sliderValue = document.querySelector(".game__board-size");
const startButton = document.querySelector(".game__start-button");
let boardArray;
let cellsArray;

const createArrayForBoard = (size) => {
  boardArray = [];
  for (let i = 0; i < size; i++) {
    boardArray[i] = [];
    for (let j = 0; j < size; j++) {
      boardArray[i][j] = 0;
    }
  }
}

const initializeCell = () => { //todo разобраться, как использовать эту функцию
  cellsArray = document.querySelectorAll('.cell');
}

const changeSize = () => {
  const size = slider.value;
  sliderValue.textContent = `${size}x${size}`;
}

const createBoard = () => {
  board.innerHTML = "";
  const size = slider.value;

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }

  createArrayForBoard(size);
  initializeCell();
};

startButton.addEventListener('click', createBoard)

slider.addEventListener('input', changeSize)

// Запуск игры

