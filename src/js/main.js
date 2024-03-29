import "../scss/style.scss";

// Создание доски (Изменение размера)

const board = document.querySelector(".game__board");
const slider = document.querySelector(".game__slider");
const sliderValue = document.querySelector(".game__board-size");
const startButton = document.querySelector(".game__start-button");
let boardArray;
let cellsArray;

let currentCol;
let currentRow;

let cellsCounter;

const createArrayForBoard = size => {
	boardArray = [];
	cellsArray = document.querySelectorAll(".cell");
	for (let row = 0; row < size; row++) {
		boardArray[row] = [];
		for (let col = 0; col < size; col++) {
			let index = row * size + col;
			boardArray[row][col] = cellsArray[index];
		}
	}
};

const initializeIndexCell = () => {
	for (let row = 0; row < boardArray.length; row++) {
		for (let col = 0; col < boardArray[row].length; col++) {
			let cell = boardArray[row][col];

			cell.addEventListener("click", function () {
				// При клике получаем координаты ячейки
				currentRow = row;
				currentCol = col;
			});
			cell.addEventListener("click", clickCell);
		}
	}
};

const changeSize = () => {
	const size = slider.value;
	sliderValue.textContent = `${size}x${size}`;
};

// Изменение размера шрифта (чтобы ячейки были одной высоты)

const changeFontSize = size => {
	switch (size.toString()) {
		case "3":
			board.style.fontSize = "72px";
			break;
		case "4":
			board.style.fontSize = "56px";
			break;
		case "5":
			board.style.fontSize = "44px";
			break;
		case "6":
			board.style.fontSize = "36px";
			break;
		case "7":
			board.style.fontSize = "30px";
			break;
		case "8":
			board.style.fontSize = "18px";
			break;
	}
};

const createBoard = () => {
	board.innerHTML = "";
	const size = slider.value;
	boardSize = size;
	changeFontSize(size);

	board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		board.appendChild(cell);
	}

	createArrayForBoard(size);
	initializeIndexCell();
};

startButton.addEventListener("click", createBoard);

slider.addEventListener("input", changeSize);

// Запуск игры

let winnerCells = [];

const players = {
	x: "x",
	o: "o",
};

let isGameStarted = false;
let currentPlayer;

const clickCell = function () {
	if (!isGameStarted) {
		return;
	}
	if (this.textContent) {
		return;
	}
	if (currentPlayer === players.o) {
		this.classList.add("o");
	} else {
		this.classList.add("x");
	}
	this.textContent = currentPlayer;
	this.classList.remove("unlocked");
	if (isGameOver(currentRow, currentCol, currentPlayer)) {
		return finishGame();
	}
	changePlayer();
};

const changePlayer = () => {
	currentPlayer = currentPlayer === players.x ? players.o : players.x;
};

const startGame = function () {
	winnerCells.splice(0);
	isGameStarted = true;
	currentPlayer = players.x;
	cellsCounter = 0;
	cellsArray.forEach(el => el.classList.add("unlocked"));
};

let boardSize;

const drawScore = document.querySelector(".draw__score");
let drawCount = drawScore.textContent;

function isGameOver(row, col, player) {
	let horizontalWin = true;
	let verticalWin = true;
	let diagonalWin1 = true;
	let diagonalWin2 = true;
	cellsCounter++;
	winnerCells.splice(0);

	// Проверка горизонтальной линии
	for (let i = 0; i < boardSize; i++) {
		if (boardArray[row][i].textContent !== player) {
			horizontalWin = false;
			break;
		} else {
			winnerCells.push(boardArray[row][i]);
		}
	}

	// Проверка вертикальной линии
	for (let i = 0; i < boardSize; i++) {
		if (boardArray[i][col].textContent !== player) {
			verticalWin = false;
			break;
		} else {
			winnerCells.push(boardArray[i][col]);
		}
	}

	// Проверка диагонали (/)
	for (let i = 0; i < boardSize; i++) {
		if (boardArray[i][i].textContent !== player) {
			diagonalWin1 = false;
			break;
		} else {
			winnerCells.push(boardArray[i][i]);
		}
	}

	// Проверка диагонали (\)
	for (let i = 0; i < boardSize; i++) {
		if (boardArray[i][boardSize - i - 1].textContent !== player) {
			diagonalWin2 = false;
			break;
		} else {
			winnerCells.push(boardArray[i][boardSize - i - 1]);
		}
	}

	if (horizontalWin || verticalWin || diagonalWin1 || diagonalWin2) {
		isGameStarted = false;
	}
	if (
		cellsCounter === boardSize * boardSize &&
		!(horizontalWin || verticalWin || diagonalWin1 || diagonalWin2)
	) {
		drawCount++;
		drawScore.textContent = drawCount;
		cellsArray.forEach(el => {
			el.classList.remove("unlocked");
			el.classList.add("draw");
		});
	}
	return horizontalWin || verticalWin || diagonalWin1 || diagonalWin2;
}

startButton.addEventListener("click", startGame);
// Старт при нажатии Enter
document.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		createBoard();
		startGame();
	}
});

// Увеличение счетчика при победе

const playerXScore = document.querySelector(".player1__score");
let playerXCount = playerXScore.textContent;

const playerOScore = document.querySelector(".player2__score");
let playerOCount = playerOScore.textContent;

const finishGame = () => {
	switch (currentPlayer) {
		case players.x:
			playerXCount++;
			playerXScore.textContent = playerXCount;
			break;
		case players.o:
			playerOCount++;
			playerOScore.textContent = playerOCount;
			break;
	}
	winnerCells.forEach(el => {
		el.classList.add("winner-cell");
	});
	cellsArray.forEach(el => {
		el.classList.remove("unlocked");
	});
};
