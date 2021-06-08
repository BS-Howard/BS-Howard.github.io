const calButton = document.querySelector(".number > button");
const inputText = document.querySelector("input");
let h1 = document.getElementById("h1");
var Temp = 0;
var Total = 0;
var calItem = "";

//加減乘除
let pointButton = document.querySelectorAll(
  ".numButton .row button:last-child"
);
pointButton.forEach((x) => {
  x.addEventListener("click", (e) => {
    calItem = e.target.value;
    if (inputText.value != "") {
      Temp = Number(inputText.value);
    } else {
      Temp = Total;
    }
    h1.innerText += x.value;
    inputText.value = "";
  });
});

//按鈕輸出到Input
let allButton = document.querySelectorAll(
  ".numButton .row button:not(:last-child)"
);
allButton.forEach((x) => {
  x.addEventListener("click", () => {
    inputText.value += x.value;
    h1.innerText += x.value;
  });
});

// 按鈕取消輸入
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  inputText.value = "";
  h1.innerText = "";
});

// 歸零
const toZero = document.querySelector("#toZero");
toZero.addEventListener("click", () => {
  inputText.value = "";
  h1.innerText = "";
});

//計算
calButton.addEventListener("click", (e) => {
  switch (calItem) {
    case "+":
      Temp += Number(inputText.value);
      break;
    case "-":
      Temp -= Number(inputText.value);
      break;
    case "*":
      Temp *= Number(inputText.value);
      break;
    case "/":
      Temp /= Number(inputText.value);
      break;
  }
  Total = Temp;
  h1.innerText = Total;
  inputText.value = "";
});
