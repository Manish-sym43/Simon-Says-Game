let gameSeq = [];
let userSeq = [];

let h2 = document.querySelector('h2');

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * 3);

    let randcolor = btns[randidx];

    let randbtn = document.querySelector(`.${randcolor}`);

    gameSeq.push(randcolor);
    
    gameflash(randbtn);
}

function checkAns(idx) {
    // console.log("curr level", level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);  
        }
    }
    else {
        h2.innerHTML = `Game over! your score was <b>${level}</b> <br> press any key to start game`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        reset();
    }
}

function btnpress() {
   
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    // console.log(usercolor);
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}