var squares = []
//dom elements
const elems = {
    cell: document.querySelectorAll(".cell"),
    oScore: document.querySelector(".o-score"),
    xScore: document.querySelector(".x-score")
}
const scores = {
    oScore: 0,
    xScore: 0
}
//icons
const icons = {
    iconO: `<svg class="icon icon-o" viewBox="0 0 24 24">
    <path  d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
  </svg>`,
    iconX: `<svg class="icon icon-x" viewBox="0 0 24 24">
  <path  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
</svg>`
}
//order tracing
let track = "O"; // O ya da X 
//is next
let isNext = true;
//winner
let winner = false;
//winner comibinations
var winnerCombination = [
    [0, 1, 3],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
//winner calculator
const winnerControl = () => {
    //winner control
    for (let p = 0; p < winnerCombination.length; p++) {
        const [p1, p2, p3] = winnerCombination[p];
        if (elems.cell[p1].getAttribute("data-cell") !== "" && elems.cell[p1].getAttribute("data-cell") === elems.cell[p2].getAttribute("data-cell") && elems.cell[p2].getAttribute("data-cell") === elems.cell[p3].getAttribute("data-cell")) {
            if (track === "O") {
                winner = "O";
                ++scores.oScore;
                elems.oScore.innerHTML = scores.oScore;
            }
            else {
                winner = "X"
                ++scores.xScore;
                elems.xScore.innerHTML = scores.xScore;
            }
            elems.cell[p1].classList.add("match");
            elems.cell[p2].classList.add("match");
            elems.cell[p3].classList.add("match");
            //stop next
            isNext = false;
        }
    }
}
//click cell
const handleClick = (e) => {
    const cell = e;
    const dataCell = cell.getAttribute("data-cell") || "";
    //empty control 
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
        }
        else {
            alert("Bekleyiniz...")
        }
    }
    else {
        alert("Bekleyiniz...")
    }

}
//reset game 
var timeOut;
const reset = () => {
    window.clearTimeout(timeOut);
    timeOut = window.setTimeout(() => {
        if (winner === "O" || winner === "X") {
            for (let r = 0; r < elems.cell.length; r++) {
                const squares = elems.cell[r];
                squares.setAttribute("data-cell", "");
                squares.innerHTML = "";
                squares.classList.remove("match");
                isNext = true;
                winner = false;
            }
            squares = [];
        }
        else if(winner === false && squares.length === 9){
            for (let r = 0; r < elems.cell.length; r++) {
                const squares = elems.cell[r];
                squares.setAttribute("data-cell", "");
                squares.innerHTML = "";
                isNext = true;
                winner = false;
            }
            squares = [];
        }
        else{
            return;
        }
    }, 1400)
}