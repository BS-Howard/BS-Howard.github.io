const timerBtn = document.querySelectorAll("button")
const timeLeft = document.querySelector(".display__time-left")
const endTime = document.querySelector(".display__end-time")
let timer,allTime;

function setTime(){
    //清空所有計時
    clearInterval(timer)

    //倒數計時開始
    let minute = Math.floor(allTime/60)
    let second = minute > 0 ? "00" : allTime
    timeLeft.innerText = `${doubleZero(minute)}:${doubleZero(second)}`;

    //回來時間
    let now = new Date()
    let backHour = now.getHours()
    let backMinute = now.getMinutes() + minute
    if( backMinute >= 60){
        backHour += Math.floor(backMinute/60)
        if (backHour >= 24){
            backHour = Math.floor(backMinute/60)
        }
        backMinute %= 60
    }
    endTime.innerText = `Come back in ${doubleZero(backHour)}:${doubleZero(backMinute)}`

    //進入區間前初始
    if(minute > 0){second = 60}

    //進入區間
    timer = setInterval(()=>{
    allTime--
    let minute = Math.floor(allTime/60)
    if(second <= 0){second = 60}
    second--
    timeLeft.innerText = `${doubleZero(minute)}:${doubleZero(second)}`;
    if(allTime <= 0) clearInterval(timer)
    },1000) 
}

function doubleZero(x){
    return x.toString().padStart(2,"0")
}

timerBtn.forEach(timer=>timer.addEventListener("click",()=>{
    allTime = timer.dataset.time
    setTime()
}))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    allTime = e.target.minutes.value * 60
    setTime()
    this.reset();
  });