// 단어 표시
const board = document.querySelector(".board");
const tile = document.querySelector(".tile");

for (let i = 1; i < 30; i++) {
  const copy = tile.cloneNode(true);
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
