const container = document.getElementsByClassName("container")[0];
const children = document.getElementsByClassName("child");
const resetBtn = document.getElementById("reset");
const turnMessage = document.getElementById("turn");
const x = document.getElementById("score1");
const o = document.getElementById("score2");

let score = {
    O: 0,
    X: 0,
};
let winningMessage;
let current = "X";
let clicks = 0;

turnMessage.textContent = `Player ${current}'s turn.`;

function updateScore() {
    x.textContent = score["X"] + ' || ';
    o.textContent = score["O"];
}

function clearBoard() {
    for (let i = 0; i < children.length; i++) {
        children[i].innerText = "";
    }
}

//take input from user
container.addEventListener("click", (evt) => {
    if (evt.target.nodeName === "DIV") {
        //if the spot is already used return
        if (evt.target.textContent) {
            current;
            return;
        }
        //update board
        evt.target.textContent = current;
        console.log(current);
        //check if someone wins
        clicks++;
        if (checkBoard(current)) {
            //declare winner
            score[current]++;
            updateScore();
            if (confirm(winningMessage + ",  click ok to play again")) {
                cleanBoard();
            } else {
                alert(":(  you werent supposed to do that");
            }
        } else if (clicks == 9) {
            if (confirm("it's a tie!,  click ok to play again.")) {
                cleanBoard();
            } else {
                alert(":(  you werent supposed to do that");
            }
        }
        // change the turn to o or x
        if (current == "X") {
            current = "O";
        } else {
            current = "X";
        }
        turnMessage.textContent = `${current} 's turn.`;
    }
});

//check if someone wins
function checkBoard(currentPlayer) {
    if (children[0].innerText === currentPlayer) {
        if (
            children[1].innerText === currentPlayer &&
            children[2].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins up to top`;
            return true;
        }
        if (
            children[3].innerText === currentPlayer &&
            children[6].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins on the left`;
            return true;
        }
        if (
            children[4].innerText === currentPlayer &&
            children[8].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
    if (children[8].innerText === currentPlayer) {
        if (
            children[2].innerText === currentPlayer &&
            children[5].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins on the right`;
            return true;
        }
        if (
            children[6].innerText === currentPlayer &&
            children[7].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins on the bottom`;
            return true;
        }
    }
    if (children[4].innerText === currentPlayer) {
        if (
            children[1].innerText === currentPlayer &&
            children[7].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins vertically on middle`;
            return true;
        }
        if (
            children[3].innerText === currentPlayer &&
            children[5].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins horizontally on the middle`;
            return true;
        }
        if (
            children[2].innerText === currentPlayer &&
            children[6].innerText === currentPlayer
        ) {
            winningMessage = `${currentPlayer} wins diagonally`;
            return true;
        }
    }

    return false;
}

//clear board function

resetBtn.addEventListener("click", () => clearBoard());
