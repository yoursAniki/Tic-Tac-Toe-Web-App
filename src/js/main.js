import "../scss/style.scss";

// Создание доски (Изменение размера)

let board = document.querySelector(".game__board");
let slider = document.querySelector(".game__slider");
const sliderValue = document.querySelector(".game__board-size");
const startButton = document.querySelector(".game__start-button");

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
};

startButton.addEventListener('click', createBoard)

slider.addEventListener('input', changeSize)

// 