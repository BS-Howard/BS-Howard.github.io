const randomButton = document.querySelector(".number > button");
const inputText = document.querySelector("input");
let h1 = document.querySelector(".show h1");
randomButton.addEventListener("click", (e) => {
  randomButton.disabled = true;
  //產生亂數
  function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  const randomNumber = getRandom(0, 100);
  console.log(randomNumber);
  //按鈕輸出到Input
  let allButton = document.querySelectorAll(".numButton button");
  allButton.forEach((x) => {
    x.addEventListener("click", () => {
      inputText.value += x.value;
    });
  });

  var min = 0;
  var max = 100;
  //開始判斷數字
  const checkButton = document.querySelector("#check");
  checkButton.addEventListener("click", () => {
    if (inputText.value > max || inputText.value < min) {
      alert("請輸入正確範圍內的數字");
      inputText.value = "";
      return;
    } else {
      if (inputText.value == randomNumber) {
        alert("Bingo");
        h1.innerText = "0~100";
        inputText.value = "";
        window.location.replace(window.location.href);
      } else if (inputText.value < randomNumber) {
        h1.innerText = `${inputText.value}~${max}`;
        min = inputText.value;
        inputText.value = "";
      } else {
        h1.innerText = `${min}~${inputText.value}`;
        max = inputText.value;
        inputText.value = "";
      }
    }
  });

  // 按鈕取消輸入
  const deleteButton = document.querySelector("#delete");
  deleteButton.addEventListener("click", () => {
    inputText.value = "";
  });
});
