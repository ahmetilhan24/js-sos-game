//dom elements
const elems = {
  cell: document.querySelectorAll(".cell"),
  oScore: document.querySelector(".o-score"),
  xScore: document.querySelector(".x-score"),
};
const scores = {
  oScore: 0,
  xScore: 0,
};
//icons
const icons = {
  iconO: ` <svg class="icon icon-o" viewBox="0 0 128 128">
    <path
      class="hFJ9Ve"
      d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
    ></path>
  </svg>`,
  iconX: ` <svg class="icon icon-x" viewBox="0 0 128 128">
  <path d="M16,16L112,112"></path>
  <path d="M112,16L16,112"></path>
</svg>`,
};
//order tracing
let track = "O"; // O or X
//is next
let isNext = true;
//winner
let winner = "";
//game count for finish
let gameCount = 0;
//limit for game count
let gameLimit = 4;
//data key
const attrKey = "data-cell";
// game delay
const gameDelayTime = 1500;
//winner comibinations
var winnerCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

// Get cell game value
const getCellValue = (cell) => {
  return elems.cell[cell].getAttribute(attrKey);
};
//winner calculator
const winnerControl = () => {
  //winner control
  for (let p = 0; p < winnerCombination.length; p++) {
    const [p1, p2, p3] = winnerCombination[p];
    // isWinner?
    if (
      getCellValue(p1) !== "" &&
      getCellValue(p1) === getCellValue(p2) &&
      getCellValue(p2) === getCellValue(p3)
    ) {
      // Winner O
      if (winner === "O") {
        ++scores.oScore;
        elems.oScore.innerHTML = scores.oScore;
      }
      // winner X
      else {
        ++scores.xScore;
        elems.xScore.innerHTML = scores.xScore;
      }
      // For animation  -> winner clas
      elems.cell[p1].classList.add("match");
      elems.cell[p2].classList.add("match");
      elems.cell[p3].classList.add("match");
      // stop game
      isNext = false;
      // End controll
      gameCount === gameLimit ? resetGame() : clearGame();
      //game count +
      gameCount++;
    }
  }
};
//click cell
const handleClick = (e) => {
  const cell = e;
  const dataCell = cell.getAttribute("data-cell") || "";
  //empty control
  if (isNext) {
    if (dataCell === "") {
      //track
      winner = track;
      switch (track) {
        case "O":
          cell.innerHTML = icons.iconO;
          cell.setAttribute("data-cell", "O");
          track = "X";
          break;
        case "X":
          cell.innerHTML = icons.iconX;
          cell.setAttribute("data-cell", "X");
          track = "O";
          break;
      }
      winnerControl();
    }
  }
};
//reset game
const resetGame = () => {
  track = "O";
  isNext = true;
  winner = "";
  gameCount = 0;
  scores.oScore = 0;
  scores.xScore = 0;
  elems.oScore.innerHTML = scores.oScore;
  elems.xScore.innerHTML = scores.xScore;
  clearCells();
};
//clear cell
const clearCells = () => {
  window.setTimeout(() => {
    elems.cell.forEach((item) => {
      item.setAttribute(attrKey, "");
      item.innerHTML = "";
      item.classList.remove("match");
    });
  }, gameDelayTime);
};
//clear cell and reset
const clearGame = () => {
  // Clear cells
  clearCells();
  winner = "";
  window.setTimeout(() => {
    isNext = true;
  }, gameDelayTime);
};
