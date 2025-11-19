let gameSeq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 500);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * btns.length); 
  let randomColor = btns[randomIdx];
  let randbtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor); 
  console.log(gameSeq); 

  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameSeq[idx]) {
    if (userseq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> </br>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userseq.push(userColor); 
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameSeq = [];
  userseq = [];
  level = 0;
}
