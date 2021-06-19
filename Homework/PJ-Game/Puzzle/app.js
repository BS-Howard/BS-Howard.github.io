const li = document.querySelectorAll("ul li");
const array = ["A", "B", "C", "D", "E", "F", "G", "H", ""];
let status = [];

window.addEventListener("load", (e) => {
  status = shuffle(array);
  li.forEach((x, index) => {
    x.innerText = status[index];
    if (x.innerText == "") {
      x.classList.add("empty");
    }
  });
});

// 洗牌
function shuffle(arr) {
  let newArray = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let random = Math.floor(Math.random() * arr.length);
    let temp = newArray[i];
    newArray[i] = newArray[random];
    newArray[random] = temp;
  }
  return newArray;
}

// 點擊移動
li.forEach((x) => {
  x.addEventListener("click", (e) => {
    let empty = Array.from(li).filter((item) => item.innerText == "");
    let now = getStatus(status).filter((x) => x.name == e.target.innerText);
    let limit = getStatus(status).filter(
      (x) =>
        ((x.row == now[0].row - 1 || x.row == now[0].row + 1) &&
          x.col == now[0].col) ||
        ((x.col == now[0].col - 1 || x.col == now[0].col + 1) &&
          x.row == now[0].row)
    );
    if (!limit.some((x) => x.name == "")) return;
    empty[0].innerText = e.target.innerText;
    empty[0].classList.remove("empty");
    e.target.innerText = "";
    e.target.classList.add("empty");
    updateStatus();
    isWin();
    console.log(status.toString());
    console.log(array.toString())
  });
});

// 取得目前各點位置
function getStatus(arr) {
  let cols = [];
  let total = [];
  for (let i = 0; i < arr.length; i += 3) {
    cols.push(arr.slice(i, i + 3));
  }
  cols.forEach((row, index) => {
    row.forEach((x, i) => {
      total.push({ name: x, row: index, col: i });
    });
  });
  return total;
}

// 更新目前狀態
function updateStatus() {
  li.forEach((x, index) => (status[index] = x.innerText));
}

// 輸贏
function isWin() {
  if (status.toString() == array.toString()) {
    alert("You Win!");
  }
}