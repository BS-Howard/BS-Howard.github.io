const second = document.querySelector(".second")
const minute = document.querySelector(".minute")
const hour = document.querySelector(".hour")

const numSecond = document.querySelector(".numS")
const numMinute = document.querySelector(".numM")
const numHour = document.querySelector(".numH")

function timer() {
  let time = new Date();

  let nowSecond = time.getSeconds();
  let secondDeg = ((nowSecond/60)*360);
  second.style.transform = `translateX(.5rem) rotate(${secondDeg}deg)`

  let nowMinute = time.getMinutes();
  let minuteDeg = (nowMinute/60)*360 + (nowSecond/60)*6;
  minute.style.transform = `translateX(.6rem) translateY(2rem) rotate(${minuteDeg}deg)`

  let nowHour = time.getHours();
  let hourDeg = (nowHour/12)*360 + (nowMinute/60)*30;
  hour.style.transform = `translateX(.05rem) translateY(5rem) rotate(${hourDeg}deg)`
}

function Numtimer(){
    let time = new Date();
    let nowSecond = time.getSeconds();
    let nowMinute = time.getMinutes();
    let nowHour = time.getHours();
    numSecond.innerText = nowSecond
    numMinute.innerText = nowMinute
    numHour.innerText = nowHour
}

setInterval(timer,1000);
setInterval(Numtimer,1000);
Numtimer()
timer()