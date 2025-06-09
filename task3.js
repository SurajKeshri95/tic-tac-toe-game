const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const aiBtn = document.getElementById("aiMode");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let aiMode = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", function () {
        const index = this.dataset.index;
        if (board[index] === "" && !checkWinner()) {
            board[index] = currentPlayer;
            this.textContent = currentPlayer;
            if (checkWinner()) {
                status.textContent = `${currentPlayer} Wins!`;
            } else if (board.includes("")) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (aiMode && currentPlayer === "O") {
                    aiMove();
                }
            } else {
                status.textContent = "It's a Draw!";
            }
        }
    });
});

function checkWinner() {
    return winningConditions.some(condition => {
        if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[0]] === board[condition[2]]) {
            return true;
        }
        return false;
    });
}

function aiMove() {
    let availableMoves = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[move] = "O";
        cells[move].textContent = "O";
        if (checkWinner()) {
            status.textContent = "AI Wins!";
        } else if (!board.includes("")) {
            status.textContent = "It's a Draw!";
        } else {
            currentPlayer = "X";
        }
    }
}

resetBtn.addEventListener("click", function () {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    status.textContent = "";
});

aiBtn.addEventListener("click", function () {
    aiMode = !aiMode;
    this.textContent = aiMode ? "Multiplayer Mode" : "Play vs AI";
    resetBtn.click();
});