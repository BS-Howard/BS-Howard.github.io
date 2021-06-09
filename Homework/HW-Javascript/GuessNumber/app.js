let challenge = [
  {
    name: "easy",
    str: "你總共有15次機會，按下產生數字後開始遊戲!",
    num: 15,
    color: "green",
  },
  {
    name: "medium",
    str: "你總共有10次機會，按下產生數字後開始遊戲!",
    num: 10,
    color: "yellow",
  },
  {
    name: "hard",
    str: "你總共有5次機會，按下產生數字後開始遊戲!",
    num: 5,
    color: "red",
  },
];

const randomButton = document.querySelector(".number > button");
const inputText = document.querySelector("input");
const h1 = document.querySelector(".show h1");
const challengeButton = document.querySelectorAll(".challenge button");

// 不同層級
challengeButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    // 提醒機會
    challenge.forEach((x) => {
      if (x.name == item.innerText) {
        alert(x.str);
        guessNum = x.num;
        guessColor = x.color;
        item.disabled = true;
      }
    });
    // 關閉挑戰按鈕
    challengeButton.forEach((x) => {
      x.disabled = true;
    });
    // 計算猜的次數
    let count = 0;
    randomButton.addEventListener("click", (e) => {
      randomButton.disabled = true;
      // 產生亂數
      function getRandom(min, max) {
        return Math.floor(Math.random() * max + min);
      }
      const randomNumber = getRandom(0, 100);
      console.log(randomNumber);
      // 按鈕輸出到Input
      let allButton = document.querySelectorAll(".numButton button");
      allButton.forEach((x) => {
        x.addEventListener("click", () => {
          inputText.value += x.value;
        });
      });

      var min = 0;
      var max = 100;
      // 開始判斷數字
      const checkButton = document.querySelector("#check");
      checkButton.addEventListener("click", () => {
        if (Number(inputText.value) > max || Number(inputText.value) < min) {
          alert("請輸入正確範圍內的數字");
          inputText.value = "";
          return;
        } else {
          count++;
          // 顯示猜的次數
          let span = document.querySelector("span");
          span.innerText = `剩下${guessNum - count}次機會`;
          // 背景變換
          let show = document.querySelector(".show");
          let col = (count / guessNum) * 100;
          show.style.backgroundImage = `linear-gradient(90deg, ${guessColor} ${col}% , #fff 10%)`;
          // 判斷輸贏
          if (inputText.value == randomNumber || count == guessNum) {
            if (count == guessNum) {
              alert("你輸了!!");
            } else {
              alert("你贏了!!");
            }
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
  });
});
