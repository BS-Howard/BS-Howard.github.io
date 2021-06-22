const resetBtn = document.getElementById("reset");
const allBtn = document.querySelectorAll(".btn button:not(:last-child)");
const ul = document.querySelector("ul");
let numArray = [];
let status = [];
let rowNum = 0;
let ab = [];
let win = [];

// 選擇格數
allBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // 取消按鈕功能
    allBtn.forEach((x) => (x.disabled = true));
    rowNum = Number(this.dataset.num);
    let a = 0,
      b = 0;
    for (let i = 0; i < Math.pow(this.dataset.num, 2); i++) {
      let c = 0;
      while (c < rowNum) {
        if (Math.floor(i / rowNum) == c) {
          b = (100 / (rowNum - 1)) * c;
        }
        if (i % rowNum == c) {
          a = (100 / (rowNum - 1)) * c;
        }
        c++;
      }
      ab.push({ a: a, b: b });

      // 新增li並設置css樣式
      let li = document.createElement("li");
      li.setAttribute(
        "style",
        `width:${500 / this.dataset.num}px; height: ${
          500 / this.dataset.num
        }px; line-height: ${
          500 / this.dataset.num
        }px; background-position: ${a}% ${b}% ;`
      );
      ul.append(li);
      numArray.push(i);
    }

    // 取出列數
    let allList = document.querySelectorAll("ul li");
    start(numArray, allList);
    win = [...numArray];
    win.pop();
    win.push("");
    move(allList);
  });
});

// 初始化
function start(arr, list) {
  status = shuffle(arr);
  list.forEach((li, index) => {
    li.innerText = status[index];
    let ranNum = Number(li.innerText);
    li.style.backgroundPosition = `${ab[ranNum].a}% ${ab[ranNum].b}% `;
    if (li.innerText == arr[arr.length - 1]) {
      li.classList.add("empty");
      li.innerText = "";
    }
  });
}

// 重新
resetBtn.addEventListener("click", () => {
  window.location.reload();
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

// 移動
function move(list) {
  list.forEach((x) => {
    x.addEventListener("click", (e) => {
      let empty = Array.from(list).filter((item) => item.innerText == "");
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
      let ranNum = Number(e.target.innerText);
      empty[0].classList.remove("empty");
      empty[0].style.backgroundPosition = `${ab[ranNum].a}% ${ab[ranNum].b}% `;
      e.target.innerText = "";
      e.target.classList.add("empty");
      updateStatus(list);
      isWin();
    });
  });
}

// 取得目前各點位置
function getStatus(arr) {
  let cols = [];
  let total = [];
  for (let i = 0; i < arr.length; i += rowNum) {
    cols.push(arr.slice(i, i + rowNum));
  }
  cols.forEach((row, index) => {
    row.forEach((x, i) => {
      total.push({ name: x, row: index, col: i });
    });
  });
  return total;
}

// 更新目前狀態
function updateStatus(list) {
  list.forEach((x, index) => (status[index] = x.innerText));
}

// 輸贏
function isWin() {
  if (status.toString() == win.toString()) {
    alert("You Win!");
  }
}
