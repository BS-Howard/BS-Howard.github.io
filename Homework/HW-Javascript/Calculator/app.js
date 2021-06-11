const upperShow = document.querySelector(".txt span");
const inputBox = document.querySelector(".txt input");
const historyBtn = document.querySelector("#history");
const textbox = document.querySelector("#text");
const cancelBtn = document.querySelector("#cancel");
const backBtn = document.querySelector("#back");
const calHardBtn = document.querySelectorAll(".cal");
const calEasyBtn = document.querySelectorAll(".calculate button:last-child");
const equalBtn = document.querySelector("#equal");
const numberBtn = document.querySelectorAll(".num button:not(:last-child)");

var calItem = "";

// 按鈕輸出到Input
var minus = false;
numberBtn.forEach((x) => {
  x.addEventListener("click", (e) => {
    changeCal = false
    if (x.value == "+/-") {
      if (minus == false) {
        inputBox.value = "-" + inputBox.value;
        minus = true;
      } else {
        let str = inputBox.value.slice(1);
        inputBox.value = str;
        minus = false;
      }
    } else if (
      (x.value == "0" && inputBox.value == "") ||
      inputBox.value == "-"
    ) {
      return;
    } else if (x.value == "." && inputBox.value == "") {
      inputBox.value = `0.${inputBox.value}`;
    }else if(x.value == "." && Array.from(inputBox.value).includes('.')) {
      return
    }
    else {
      inputBox.value += x.value;
    }
  });
});

// 加減乘除
let nowNum = 0;
let changeCal = false;
calEasyBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    calItem = e.target.value;
    if (!changeCal) {
      nowNum = inputBox.value;
      upperShow.innerText = `${inputBox.value}${e.target.value}`;
      inputBox.value = "";
      special = false;
      changeCal = true;
    }
    else{
      upperShow.innerText = `${nowNum}${calItem}`;
    }
  });
});

// 計算
let special = false;
let oldValue = 0;
equalBtn.addEventListener("click", (e) => {
  let temp = Array.from(upperShow.innerText);
  temp.splice(-1, 1);
  temp = Number(temp.join(""));
  upperShow.innerText = `${temp}${calItem}${inputBox.value}=`;
  if (special == false) {
    oldValue = Number(inputBox.value);
    switch (calItem) {
      case "+":
        inputBox.value = temp + Number(inputBox.value);
        break;
      case "-":
        inputBox.value = temp - Number(inputBox.value);
        break;
      case "×":
        inputBox.value = temp * Number(inputBox.value);
        break;
      case "÷":
        inputBox.value = temp / Number(inputBox.value);
        break;
      case "":
        upperShow.innerText = `${inputBox.value}=`;
        break;
    }
    textbox.innerHTML += `<div><p>${upperShow.innerText}</p><p>${inputBox.value}</p></div>`;
    special = true;
  }

  //連續按=
  else {
    switch (calItem) {
      case "+":
        console.log(inputBox.value, oldValue);
        upperShow.innerText = `${inputBox.value}${calItem}${oldValue}=`;
        inputBox.value = Number(inputBox.value) + Number(oldValue);
        break;
      case "-":
        upperShow.innerText = `${inputBox.value}${calItem}${oldValue}=`;
        inputBox.value = Number(inputBox.value) - Number(oldValue);
        break;
      case "×":
        upperShow.innerText = `${Number(inputBox.value)}${calItem}${oldValue}=`;
        inputBox.value = Number(inputBox.value) * Number(oldValue);
        break;
      case "÷":
        upperShow.innerText = `${Number(inputBox.value)}${calItem}${oldValue}=`;
        inputBox.value = Number(inputBox.value) / Number(oldValue);
        break;
    }
  }
});

//特殊符號
calHardBtn.forEach((x) => {
  x.addEventListener("click", (e) => {
    calItem = e.target.value;
    switch (calItem) {
      case "²√x":
        upperShow.innerText = `√(${inputBox.value})=`;
        inputBox.value = Math.sqrt(Number(inputBox.value));
        break;
      case "x²":
        upperShow.innerText = `sqr(${inputBox.value})=`;
        inputBox.value = Math.pow(Number(inputBox.value), 2);
        break;
      case "1/x":
        upperShow.innerText = `1/(${inputBox.value})=`;
        inputBox.value = 1 / Number(inputBox.value);
        break;
    }
    textbox.innerHTML += `<div><p>${upperShow.innerText}</p><p>${inputBox.value}</p></div>`;
  });
});

// 倒退
backBtn.addEventListener("click", () => {
  let str = inputBox.value.slice(0, -1);
  inputBox.value = str;
});

// 按鈕取消輸入
cancelBtn.addEventListener("click", () => {
  inputBox.value = "";
  upperShow.innerText = "";
  calItem = "";
  special = false;
});

// 歷史紀錄出來
let show = true;
historyBtn.addEventListener("click", () => {
  if (show) {
    textbox.style.transform = "translateX(0px)";
    show = false;
  } else {
    textbox.style.transform = "translateX(336px)";
    show = true;
  }
});
