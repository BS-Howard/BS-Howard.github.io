const video = document.querySelector("video")
const toggle = document.querySelector(".toggle")
const timeupDate = document.querySelector(".progress__filled")
const speed = document.querySelectorAll(".player__button")
const input = document.querySelectorAll("input")
const progress = document.querySelector(".progress")

function TogglePlay(){
    const run = video.paused ? "play" : "pause"
    video[run]();
}

function ChangeIcon(){
    const icon = video.paused ? " ► " : " || "
    toggle.textContent = icon
}

function ProgressFilled(){
    const percent = (video.currentTime / video.duration) * 100
    timeupDate.style.flexBasis = `${percent}%`
}

function Skip(e){
    video.currentTime += parseFloat(e.target.dataset.skip)
}

function RangeChange(e){
    video[this.name] = this.value
}

function move(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

video.addEventListener("click",TogglePlay)
video.addEventListener("play",ChangeIcon)
video.addEventListener("pause",ChangeIcon)
video.addEventListener("timeupdate",ProgressFilled)

toggle.addEventListener("click",TogglePlay)
speed.forEach(item=>item.addEventListener("click",Skip))
input.forEach(item=>item.addEventListener("mousemove",RangeChange))
input.forEach(item=>item.addEventListener("change",RangeChange))

let control = false
progress.addEventListener("click",move)
progress.addEventListener("mousemove",(e)=>{control && move(e)})
progress.addEventListener("mousedown",()=>{control = true})
progress.addEventListener("mouseup",()=>{control = false})
