function removeBGC(e){
  // if (e.propertyName !== 'transform') return;
  e.target.classList.remove("playing")
}

function playSound(e){
  let audio = document.querySelector(`audio#${e.key}`)
  let button = document.querySelector(`.button[data-key = ${e.key}]`)
  if (!audio) {return}
  button.classList.add("playing")
  audio.currentTime = 0
  audio.play();
}

function show(e){
  let audio = document.querySelector(`audio#${e.target.getAttribute("data-key")}`)
  if (!audio) {return}
  e.target.classList.add("playing")
  audio.currentTime = 0
  audio.play();
}

let buttons = document.querySelectorAll(".button")
window.addEventListener("keydown",playSound)
buttons.forEach(item => {
  item.addEventListener("transitionend",removeBGC)
  item.addEventListener("click",show)
});

