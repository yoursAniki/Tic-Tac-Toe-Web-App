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

// Изменение размера шрифта (чтобы ячейки были одного)

const changeFontSize = (size) => {
  switch (size.toString()) {
    case "3":
      board.style.fontSize = '72px'
      break;
    case "4":
      board.style.fontSize = '56px'
      break;
    case "5":
      board.style.fontSize = '44px'
      break;
    case "7":
      board.style.fontSize = '30px'
      break;
    case "8":
      board.style.fontSize = '18px'
      break;
  }
}

const createBoard = () => {
  board.innerHTML = "";
  const size = slider.value;

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
  changeFontSize(size);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
};

startButton.addEventListener('click', createBoard)

slider.addEventListener('input', changeSize)

// 