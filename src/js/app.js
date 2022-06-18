var squares = [];
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
let track = "O"; // O ya da X
//is next
let isNext = true;
//winner
let winner = false;
//game count for finish
let gameCount = 0;
//limit for game count
let gameLimit = 4;
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
//winner calculator
const winnerControl = () => {
  //winner control
  for (let p = 0; p < winnerCombination.length; p++) {
    const [p1, p2, p3] = winnerCombination[p];
    if (
      elems.cell[p1].getAttribute("data-cell") !== "" &&
      elems.cell[p1].getAttribute("data-cell") ===
        elems.cell[p2].getAttribute("data-cell") &&
      elems.cell[p2].getAttribute("data-cell") ===
        elems.cell[p3].getAttribute("data-cell")
    ) {
      if (track === "O") {
        winner = "O";
        ++scores.oScore;
        elems.oScore.innerHTML = scores.oScore;
      } else {
        winner = "X";
        ++scores.xScore;
        elems.xScore.innerHTML = scores.xScore;
      }
      elems.cell[p1].classList.add("match");
      elems.cell[p2].classList.add("match");
      elems.cell[p3].classList.add("match");
      //stop next
      isNext = false;
      //game count +
      gameCount++;
    }
  }
};
//click cell
const handleClick = (e) => {
  const cell = e;
  console.log(cell);
  const dataCell = cell.getAttribute("data-cell") || "";
  //empty control
  if (gameCount < 1) {
    if (isNext) {
      if (dataCell === "") {
        //track
        switch (track) {
          case "O":
            cell.innerHTML = icons.iconO;
            cell.setAttribute("data-cell", "O");
            //winner control
            winnerControl();
            track = "X";
            break;
          case "X":
            cell.innerHTML = icons.iconX;
            cell.setAttribute("data-cell", "X");
            //winner control
            winnerControl();
            track = "O";
            break;
        }
        //squeares for reset tie
        squares.push(cell);
        reset();
      } else {
        return;
      }
    } else {
      alert("Bekleniyor...");
    }
  }
  //finish and winner result
  else {
    finish();
  }
};
//reset game
var timeOut;
const reset = () => {
  window.clearTimeout(timeOut);
  timeOut = window.setTimeout(() => {
    if (winner === "O" || winner === "X") {
      for (let r = 0; r < elems.cell.length; r++) {
        const squares = elems.cell[r];
        clearGame(squares, true);
      }
      squares = [];
    } else if (winner === false && squares.length === 9) {
      for (let r = 0; r < elems.cell.length; r++) {
        const squares = elems.cell[r];
        clearGame(squares, false);
      }
      squares = [];
    } else {
      return;
    }
  }, 1400);
};
//clear cell and reset
const clearGame = (elem, winn) => {
  elem.setAttribute("data-cell", "");
  elem.innerHTML = "";
  if (winn) {
    elem.classList.remove("match");
  } else {
    return;
  }
  isNext = true;
  winner = false;
};
//game finished
const finish = () => {
  if (scores.xScore > scores.oScore) {
    console.log("Kazanan x");
  } else if (scores.xScore < scores.oScore) {
    console.log("Kazanan o");
  } else {
    console.log("Oyun berabere bitti");
  }
  //new game
  var newGame = confirm("Yeni oyun ister misin?");
  if (newGame === true) {
    //devam edecem
  } else {
    return;
  }
};
