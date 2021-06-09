const upperShow = document.querySelector(".txt span");
const inputBox = document.querySelector(".txt input");
const historyBtn = document.querySelector("#history");
const textbox = document.querySelector("textarea");
const cancelBtn = document.querySelector("#cancel");
const backBtn = document.querySelector("#back");
let calBtn = document.querySelectorAll(".cal button");
let calBTN = document.querySelectorAll(".calculate button:last-child");
const allCalBtn = [];
allCalBtn.push.apply(allCalBtn, calBtn);
allCalBtn.push.apply(allCalBtn, calBTN);
const equalBtn = document.querySelector("#equal");
const numberBtn = document.querySelectorAll(".num button:not(:last-child)");

var Temp = 0;
var Total = 0;
var calItem = "";
// 歷史紀錄出來
historyBtn.addEventListener("click", () => {
  textbox.style.opacity = "100";
  textbox.style.zIndex = "1";
});
// 按鈕取消輸入
cancelBtn.addEventListener("click", () => {
  inputBox.value = "";
  upperShow.innerText = "";
  textbox.innerHTML += "\n";
  plus = false;
  textbox.style.opacity = "0";
  textbox.style.zIndex = "-1";
});

// 倒退
backBtn.addEventListener("click", () => {
  let str = inputBox.value.slice(0, -1);
  inputBox.value = str;
});

var plus = false;
// 按鈕輸出到Input
var minus = false;
numberBtn.forEach((x) => {
  x.addEventListener("click", (e) => {
    if (x.value == "+/-") {
      if (minus == false) {
        inputBox.value = "-" + inputBox.value;
        minus = true;
      } else {
        let str = inputBox.value.slice(1);
        inputBox.value = str;
        minus = false;
      }
    } else {
      inputBox.value += x.innerText;
      if (plus) textbox.innerHTML += e.target.value;
    }
  });
});

// 加減乘除符號
allCalBtn.forEach((x) => {
  x.addEventListener("click", (e) => {
    plus = true;
    calItem = e.target.value;
    // 特別處理
    if (calItem == "√") {
      Temp = Math.sqrt(Number(inputBox.value));
      spec();
    } else if (calItem == "square") {
      Temp = Math.pow(Number(inputBox.value), 2);
      spec();
    } else if (calItem == "1/x") {
      Temp = 1 / Number(inputBox.value);
      spec();
    } else {
      // 加減乘除
      if (inputBox.value != "") {
        Temp = Number(inputBox.value);
      } else {
        Temp = Total;
      }
      upperShow.innerText = inputBox.value + x.value;
      textbox.innerHTML += `${Temp}${calItem}`;
      inputBox.value = "";
    }
  });
});

// 計算
equalBtn.addEventListener("click", (e) => {
  switch (calItem) {
    case "+":
      Temp += Number(inputBox.value);
      break;
    case "-":
      Temp -= Number(inputBox.value);
      break;
    case "×":
      Temp *= Number(inputBox.value);
      break;
    case "/":
      Temp /= Number(inputBox.value);
      break;
  }
  textbox.innerHTML += ` = ${Temp} \n`;
  console.log(Temp);
  Total = Temp;
  upperShow.innerText = Total;
  inputBox.value = Total;
});

// 計算處理
function spec() {
  Total = Temp;
  upperShow.innerText = Total;
  inputBox.value = Total;
  textbox.innerHTML += ` ${calItem} = ${Total} \n`;
}
