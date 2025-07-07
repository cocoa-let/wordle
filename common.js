// 단어 표시
const board = document.querySelector(".board");
const tile = document.querySelector(".tile");

tile.dataset.index = 0; // dataset index를 0으로 설정

for (let i = 1; i < 30; i++) {
  //index는 0부터 시작하므로 i=0으로 했을 때 31개 생성
  const copy = tile.cloneNode(true); //tile을 복사
  copy.dataset.index = i;
  board.appendChild(copy);
}

// 키보드
const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// div 불러오기
const keyboard = document.querySelector(".keyboard");

for (let row of keys) {
  const keyboard_row = document.createElement("div"); // elemnet 생성 (row)
  keyboard_row.className = "keyboard_row";

  for (let key of row) {
    const keyboard_key = document.createElement("div"); // element 생성 (key)
    keyboard_key.className = "keyboard_key";

    if (key === "ENTER" || key === "⌫") {
      keyboard_key.classList.add("wide"); // 특정 단어일 때 class 추가
    }
    keyboard_key.dataset.key = key;
    keyboard_key.textContent = key; //key에 철자 배치
    keyboard_row.appendChild(keyboard_key);
  }

  keyboard.appendChild(keyboard_row); //row에 key 배치
}

const answer = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 됐습니다!";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:42vh; left:42.7vw; background-color:#fff; width:200px; height:80px; border:1px solid #acacac; border-radius:10px; ";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    index = 0;
    attempts += 1;
  };

  const handleEnterKey = () => {
    let succesful_w = 0;
    for (let i = 0; i < 5; i++) {
      const blockIndex = attempts * 5 + i;
      const block = document.querySelector(`.tile[data-index='${blockIndex}']`);
      const userText = block.innerText;
      const realAnswer = answer[i];
      if (userText === realAnswer) {
        succesful_w += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(userText)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "#FFF";
    }
    if (succesful_w === 5) gameover();
    else nextLine(); // 엔터 누르면 다음 줄로 이동
  };

  const handleBacksapce = () => {
    if (index > 0) {
      index -= 1;
      const blockIndex = attempts * 5 + index;
      const preBlock = document.querySelector(
        `.tile[data-index='${blockIndex}']`
      );
      preBlock.innerText = "";
    }
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    if (event.key === "Backspace") handleBacksapce();

    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      const blockIndex = attempts * 5 + index;
      const thisBlock = document.querySelector(
        `.tile[data-index='${blockIndex}']`
      );
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `time : ${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
