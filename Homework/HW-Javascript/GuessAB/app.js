const challenge = [
  {name: "easy",num : 4,str:"一共四個不相同數字，請開始挑戰"},
  {name: "hard",num : 5,str:"一共五個不相同數字，請開始挑戰"}
]

const startButton = document.querySelector("#start");
const guessButton = document.querySelector("#guess");
const userGuess = document.querySelector("#userGuess");
const section = document.querySelector("section");
const challengeButton = document.querySelectorAll(".challenge button")

challengeButton.forEach(item=>{
  item.addEventListener("click",(e)=>{
    //難度說明
    challenge.forEach(x=>{
      if(item.innerText == x.name){
        alert(x.str)
        challengeNum = x.num;
      }
    })
    // 關閉挑戰按鈕
    challengeButton.forEach((x) => {
      x.disabled = true;
    });
    //開始按鈕
    startButton.addEventListener("click", () => {
      startButton.disabled = true;
      //產生亂數
      function getRandom(min, max) {
        return Math.floor(Math.random() * max + min);
      }
      var list = [];
      while (list.length != challengeNum) {
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

      //show answer
      const showAnswer = document.querySelector("#showAnswer");
      showAnswer.addEventListener("click", () => {
        let answerDiv = document.createElement("div");
        answerDiv.style.backgroundColor = "#fa0";
        answerDiv.innerText = `Answer is ${randomNum}`;
        section.append(answerDiv);
      });
    
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
            for (let i = 0; i < challengeNum; i++) {
              if (x == result[i] && index != i) {
                bool = true;
              }
            }
          });
          return bool;
        }
    
        if (
          userGuess.value.length != challengeNum ||
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
        for (let i = 0; i < challengeNum; i++) {
          if (userGuess.value[i] == randomNum[i]) {
            countA += 1;
          } else {
            for (let j = 0; j < challengeNum; j++) {
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
      });
    });
  })
})

//reset
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  window.location.replace(window.location.href);
});
