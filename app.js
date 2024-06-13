let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector("#newBtn");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let imgBox = document.querySelector(".imgs");

music.play();
let turno = true;
let count = 1;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turno = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  imgBox.classList.add("imgs");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    audioTurn.play();
    if (turno) {
      box.innerText = "O";
      turno = false;
    } else {
      box.innerText = "X";
      turno = true;
    }
    //checkWinner();
    box.disabled = true;
    count++;
    let hii = checkWinner();
    if (count === 9 && hii !== checkWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  gameover.play();
};

const disableBoxes = () => {
  for (let val of boxes) {
    val.disabled = true;
  }
};
const enableBoxes = () => {
  for (let val of boxes) {
    val.disabled = false;
    val.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `congratulations,winner is ${winner}`;
  msgContainer.classList.remove("hide");
  imgBox.classList.remove("imgs");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posval1 = boxes[pattern[0]].innerText;
    let posval2 = boxes[pattern[1]].innerText;
    let posval3 = boxes[pattern[2]].innerText;

    if (posval1 != "" && posval2 != "" && posval3 != "") {
      if (posval1 === posval2 && posval2 === posval3) {
        showWinner(posval1);
        // disableBoxes();
      }
    }
  }
};

reset.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
