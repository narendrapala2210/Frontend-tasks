const urScore = document.getElementById("ur-score");
const pcScore = document.getElementById("pc-score");
const playBoard = document.getElementById("play-board");
const playButton = document.getElementById("play-button");
const restartButton = document.getElementById("reset-button");
const message = document.getElementById("msg");
const resultButton = document.getElementById("result-button");

// variables
let isGameStarted = false;
let isPlayerTurn;
let attempts = 0;
const data = {
  1: {
    mark: "",
  },
  2: {
    mark: "",
  },
  3: {
    mark: "",
  },
  4: {
    mark: "",
  },
  5: {
    mark: "",
  },
  6: {
    mark: "",
  },
  7: {
    mark: "",
  },
  8: {
    mark: "",
  },
  9: {
    mark: "",
  },
};
const arr = [];
//

message.textContent = isPlayerTurn === undefined ? "Lets Play" : "";
playButton.onclick = function () {
  count = 3;
  const timeClear = setInterval(() => {
    message.textContent = "Game Starts in " + count;
    count -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(timeClear);
    isGameStarted = true;
    isPlayerTurn = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
    message.textContent = isPlayerTurn ? "Player Turn" : "PC Turn";
    if (isPlayerTurn === false) {
      setTimeout(() => {
        ComputerPlay();
      }, 2000);
    }
  }, 5000);
  playButton.classList.add("d-none");
  restartButton.classList.remove("d-none");
};
restartButton.onclick = function () {
  window.location.reload();
};
function gameOver(symbol) {
  resultButton.textContent = symbol === "X" ? "Player Won" : "PC Won";
  resultButton.classList.remove("d-none");
  isGameStarted = false;
  message.textContent = "Game Over";
  const score = getScore(symbol);
  saveScore(symbol, score + 10);
  restartButton.textContent = "Play Again";
}
function checking(symbol, a, b, c) {
  const x = data[a].mark;
  const y = data[b].mark;
  const z = data[c].mark;
  const elementA = document.getElementById(a);
  const elementB = document.getElementById(b);
  const elementC = document.getElementById(c);
  if (x === symbol && y === symbol && z === symbol) {
    gameOver(symbol);
    elementA.classList.add("mark");
    elementB.classList.add("mark");
    elementC.classList.add("mark");
  }
}
function getResult() {
  // x checking
  checking("X", 1, 2, 3);
  checking("X", 4, 5, 6);
  checking("X", 7, 8, 9);
  checking("X", 1, 4, 7);
  checking("X", 2, 5, 8);
  checking("X", 3, 6, 9);
  checking("X", 1, 5, 9);
  checking("X", 3, 5, 7);
  //   0 checking
  checking("0", 1, 2, 3);
  checking("0", 4, 5, 6);
  checking("0", 7, 8, 9);
  checking("0", 1, 4, 7);
  checking("0", 2, 5, 8);
  checking("0", 3, 6, 9);
  checking("0", 1, 5, 9);
  checking("0", 3, 5, 7);
}
function playerPlay(element, id) {
  if (attempts < 9) {
    if (
      arr.indexOf(id) === -1 &&
      isPlayerTurn === true &&
      isGameStarted === true
    ) {
      arr.push(id);
      data[id].mark = "X";
      element.textContent = "X";
      isPlayerTurn = false;
      element.classList.add("placed-x");
      setTimeout(() => {
        ComputerPlay();
      }, 1800);
      message.textContent = "PC Turn";
      attempts += 1;
      getResult();
    }
  }
  if (attempts === 9 && isGameStarted === true) {
    resultButton.textContent = "Tie";
    resultButton.classList.remove("d-none");
    message.textContent = "Game Over";
  }
}
function randomNumber() {
  const num = Math.floor(Math.random() * 9) + 1;
  if (attempts < 9) {
    if (arr.indexOf(num) === -1) {
      return num;
    } else {
      return randomNumber();
    }
  }
}
function ComputerPlay() {
  const id = randomNumber();
  const element = document.getElementById(id);
  if (attempts < 9) {
    if (
      arr.indexOf(id) === -1 &&
      isPlayerTurn === false &&
      isGameStarted === true
    ) {
      element.textContent = "0";
      element.classList.add("placed-0");
      arr.push(id);
      data[id].mark = "0";
      //   attempts += 1;
      isPlayerTurn = true;
      message.textContent = "Player Turn";
      attempts += 1;
      getResult();
    }
  }
  if (attempts === 9 && isGameStarted === true) {
    resultButton.textContent = "Tie";
    resultButton.classList.remove("d-none");
    message.textContent = "Game Over";
  }
}

// initial scores
urScore.textContent =
  localStorage.getItem("X") === null ? saveScore("X", 0) : getScore("X");
pcScore.textContent =
  localStorage.getItem("0") === null ? saveScore("0", 0) : getScore("0");
//   grid boxes dynamically
function addGridBoxes() {
  for (let index = 1; index < 10; index++) {
    const element = document.createElement("button");
    element.textContent = "";
    element.classList.add("grid-item");
    element.setAttribute("id", index);
    element.onclick = function () {
      playerPlay(element, index);
    };
    playBoard.appendChild(element);
  }
}
addGridBoxes();
function saveScore(symbol, score) {
  localStorage.setItem(symbol, JSON.stringify(score));
  const newScore = localStorage.getItem(symbol);
  getScore(symbol);
  return newScore;
}
function getScore(symbol) {
  const score = JSON.parse(localStorage.getItem(symbol));
  symbol === "X"
    ? (urScore.textContent = score)
    : (pcScore.textContent = score);
  return score;
}
