const fileBtn = document.getElementById("file");
const picBtn = document.querySelectorAll(".pic img");
const resetBtn = document.getElementById("reset");
const allBtn = document.querySelectorAll(".btn .play");
const stepTxt = document.getElementById("step");
const tipsBtn = document.getElementById("tips");
const ul = document.querySelector("ul");
let numArray = [];
let status = [];
let rowNum = 0;
let picArray = [];
let win = [];
let step = 0;
let url = "";

// 上傳照片
fileBtn.addEventListener("change",(e)=>{
  const file = e.target.files[0];//將上傳檔案轉換為base64字串
  const fr = new FileReader();//建立FileReader物件
  fr.onload = function (e) {
    url = e.target.result
  };
  // 使用 readAsDataURL 將圖片轉成 Base64
  fr.readAsDataURL(file);

  allBtn.forEach((x) => (x.disabled = false));
})

// 選擇照片
picBtn.forEach((pic) => {
  pic.addEventListener("click", (el) => {
    url = el.target.getAttribute("src");
    allBtn.forEach((x) => (x.disabled = false));
  });
});

// 選擇格數
allBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // 取消按鈕功能
    allBtn.forEach((x) => (x.disabled = true));

    // 判斷圖片切割位置
    rowNum = Number(this.dataset.num);
    let pic_X = 0,
      pic_Y = 0;
    for (let i = 0; i < Math.pow(this.dataset.num, 2); i++) {
      let temp = 0;
      while (temp < rowNum) {
        if (i % rowNum == temp) {
          pic_X = (100 / (rowNum - 1)) * temp;
        }
        if (Math.floor(i / rowNum) == temp) {
          pic_Y = (100 / (rowNum - 1)) * temp;
        }
        temp++;
      }
      picArray.push({ x: pic_X, y: pic_Y });

      // 新增li並設置css樣式
      let li = document.createElement("li");
      li.setAttribute(
        "style",
        `width:${500 / rowNum}px; height: ${500 / rowNum}px; line-height: ${
          500 / rowNum
        }px; background-position: ${pic_X}% ${pic_Y}% ; `
      );
      ul.append(li);
      numArray.push(i);
    }

    // 取出列數
    let allList = document.querySelectorAll("ul li");
    // 提示
    tipsBtn.addEventListener("click", () => {
      allList.forEach((x) => {
        x.classList.toggle("tips");
      });
    });
    start(numArray, allList);
    win = [...numArray];
    win.pop();
    win.push("");
    move(numArray, allList);
  });
});

// 初始化
function start(arr, list) {
  status = shuffle(arr);
  list.forEach((li, index) => {
    li.innerText = status[index];
    let ranNum = Number(li.innerText);
    li.style.backgroundImage = `url(${url})`;
    li.style.backgroundPosition = `${picArray[ranNum].x}% ${picArray[ranNum].y}% `;
    if (li.innerText == arr[arr.length - 1]) {
      li.classList.add("empty");
      li.style.backgroundImage = "";
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
function move(arr, list) {
  list.forEach((x) => {
    x.addEventListener("click", (e) => {
      let empty = Array.from(list).filter((item) => item.innerText == "");
      let now = getStatus(status, arr).filter((x) => x.name == e.target.innerText);
      let limit = getStatus(status, arr).filter(
        (x) =>
          ((x.row == now[0].row - 1 || x.row == now[0].row + 1) &&
            x.col == now[0].col) ||
          ((x.col == now[0].col - 1 || x.col == now[0].col + 1) &&
            x.row == now[0].row)
      );
      if (!limit.some((x) => x.name === "")) return;
      empty[0].innerText = e.target.innerText;
      let ranNum = Number(e.target.innerText);
      empty[0].classList.remove("empty");
      empty[0].style.backgroundImage = `url(${url})`;
      empty[0].style.backgroundPosition = `${picArray[ranNum].x}% ${picArray[ranNum].y}% `;
      e.target.innerText = "";
      e.target.classList.add("empty");
      e.target.style.backgroundImage = "";
      updateStatus(list);
      isWin();
      step++;
      stepTxt.innerText = `Your step : ${step}`;
    });
  });
}

// 取得目前各點位置
function getStatus(arr, numarray) {
  let cols = [];
  let total = [];
  for (let i = 0; i < arr.length; i += rowNum) {
    cols.push(arr.slice(i, i + rowNum));
  }
  cols.forEach((row, index) => {
    row.forEach((x, i) => {
      if (x == numarray[numarray.length - 1]) { x = ""; }
      total.push({ name: x, row: index, col: i });
    });
  });
  console.log(total)
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
    let li = document.querySelector("ul li:last-child");
    li.classList.remove("empty");
    li.style.backgroundImage = `url(${url})`;
    li.style.backgroundPosition = `${picArray[picArray.length - 1].x}% ${
      picArray[picArray.length - 1].y
    }% `;
  }
}
