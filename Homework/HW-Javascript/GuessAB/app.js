const challenge = [
  {name:"難度1",num : 1,str:"一共一個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度2",num : 2,str:"一共兩個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度3",num : 3,str:"一共三個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度4",num : 4,str:"一共四個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度5",num : 5,str:"一共五個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度6",num : 6,str:"一共六個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度7",num : 7,str:"一共七個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度8",num : 8,str:"一共八個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度9",num : 9,str:"一共九個不相同數字，按下開始挑戰後開始遊戲!"},
  {name:"難度10",num : 10,str:"一共十個不相同數字，按下開始挑戰後開始遊戲!"},
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
        var randomNumber = getRandom(0, 10);
        if (!list.some((x) => {return x == randomNumber;})
        ) { list.push(randomNumber);}
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
        answerDiv.innerHTML = `<h5>Answer</h5> <span>${randomNum}</span>`;
        answerDiv.firstChild.style.backgroundColor = "#fa0";
        section.append(answerDiv);
        showAnswer.disabled = true
      });
    
      //猜數字
      guessButton.addEventListener("click", () => {

        //判斷輸入的正確性
        function isNumber(input) {
          let result = !!Number(input);
          return result;
        }
    
        function isRepeat(input){
          result = input.split("");
          return result.sort().some((x,index)=>x==result[index+1])
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
        let guess = userGuess.value.split('')
        let countA = guess.filter((x,index) => x == list[index]).length
        let countB = guess.filter(x => Number(list.indexOf(Number(x))) !== -1 ).length -countA
        let div = document.createElement("div");
        div.innerHTML = `<h5>${countA}A${countB}B</h5>  <span>${userGuess.value}</span>`;
        section.append(div);
    
        //判斷是否獲勝
        if (userGuess.value == randomNum) {
          div.firstChild.style.backgroundColor = "green";
          userGuess.value = "";
          alert("恭喜成功猜中!");
          userGuess.disabled = true
        } else {
          div.firstChild.style.backgroundColor = "red";
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
