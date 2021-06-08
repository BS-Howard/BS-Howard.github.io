const startButton = document.querySelector("#start");
const guessButton = document.querySelector("#guess");
const userGuess = document.querySelector("#userGuess");
const section = document.querySelector("section");
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  //產生亂數
  function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  var list = [];
  while (list.length != 4) {
    var randomNumber = getRandom(0, 9);
    if (
      !list.some((x) => {
        return x == randomNumber;
      })
    ) {
      list.push(randomNumber);
    }
  }
  var randomNum = "";
  list.forEach((x) => {
    randomNum += x;
  });
  console.log(randomNum);

  //猜數字
  guessButton.addEventListener("click", () => {
    //判斷輸入的正確性
    function isNumber(input) {
      let result = !!Number(input);
      return result;
    }

    function isRepeat(input) {
      result = input.split("");
      var bool = false;
      result.forEach((x, index) => {
        for (let i = 0; i < 4; i++) {
          if (x == result[i] && index != i) {
            bool = true;
          }
        }
      });
      return bool;
    }

    if (
      userGuess.value.length != 4 ||
      !isNumber(userGuess.value) ||
      isRepeat(userGuess.value)
    ) {
      alert("請輸入正確格式");
      userGuess.value = "";
      return;
    }

    //幾A幾B
    var countA = 0,
      countB = 0;
    for (let i = 0; i < 4; i++) {
      if (userGuess.value[i] == randomNum[i]) {
        countA += 1;
      } else {
        for (let j = 0; j < 4; j++) {
          if (userGuess.value[i] == randomNum[j]) {
            countB += 1;
          }
        }
      }
    }
    let div = document.createElement("div");
    div.innerText = `${countA}A${countB}B - ${userGuess.value}`;
    section.append(div);

    //判斷是否獲勝
    if (userGuess.value == randomNum) {
      div.style.backgroundColor = "green";
      userGuess.value = "";
      alert("恭喜成功猜中!");
    } else {
      div.style.backgroundColor = "red";
      userGuess.value = "";
    }
    //show answer
    const showAnswer = document.querySelector("#showAnswer");
    showAnswer.addEventListener("click", () => {
      let div = document.createElement("div");
      div.style.backgroundColor = "yellow";
      div.innerText = `Answer is ${randomNum}`;
      section.append(div);
    });
  });
});

//reset
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  window.location.replace(window.location.href);
});
