var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var tdMonth = today.getMonth();
var date = today.getDate();

window.addEventListener("load",function(e){
    Init();
})

function Init() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let dt = document.getElementById('date')

    tbody.innerHTML = "";
    document.getElementById('todo-item').value = "";
    document.getElementById('todo-time').value = "";
    document.getElementById('remark-item').value = "";
    document.getElementById('todo-position').value = "";
    dt.setAttribute("readonly",true);
    dt.setAttribute("type","text")

    document.getElementById("year-month").innerText = `${new Date(year,month,1).getFullYear()} 年 ${new Date(year,month,1).getMonth() + 1} 月`;

    let firstDay = new Date(year,month,1).getDay();

    let dayofMonth = new Date(year,month + 1, 0).getDate();

    let day = 1;
    let nextMonthDay = 1;
    let lastMonthDay = new Date(year,month, 0).getDate();
    let rows = Math.ceil((dayofMonth + firstDay) / 7)

    for(let row = 0; row < rows; row++){
        let tr = document.createElement('tr');
        for(let col = 0; col < 7; col++){
            let td = document.createElement('td');
            if(row == 0 && col < firstDay){
                // 上個月
                td.style.color = 'red'
                td.innerText = lastMonthDay-(firstDay-1)+col;
            }else{
                if(day <= dayofMonth){
                    let showAllBtn = document.createElement("span");
                    showAllBtn.classList.add("showAll")
                    showAllBtn.innerText = day;
                    td.appendChild(showAllBtn)

                    // 顯示sideNav
                    let slide = document.querySelector(".slide")

                    showAllBtn.addEventListener("click",function(e){
                        let sideNav = document.querySelector(".side-nav");
                        let spanTime = document.querySelectorAll("li span")
                        let closeBtn = document.querySelector(".closeBtn")
                        let googleMap = document.querySelector(".google-map")

                        spanTime.forEach(x => x.style.marginRight = "2.5rem")
                        sideNav.style.width = "25rem";
                        slide.classList.add("slide-open")
                        closeBtn.setAttribute("style","display:block; margin:1rem; align-self: flex-end;")
                        googleMap.style.display = "block"

                        // 顯示所有行程
                        let schedule = document.querySelector(".schedule")
                        schedule.style.display = "block"
                        if(localStorage.getItem(`${year}-${month + 1}-${showAllBtn.innerText}`) != null){
                            let todoList = JSON.parse(localStorage.getItem(`${year}-${month + 1}-${showAllBtn.innerText}`));
                            todoList.forEach(item => {
                                let ul = document.createElement("ul")
                                ul.style.border = `5px solid ${item.level}`
                                ul.innerHTML=`
                                <li>標題: ${item.title}</li>
                                <li>時間: ${item.time == "" ? "無備註" : item.time}</li>
                                <li>地點: ${item.position == "" ? "無備註" : item.position}</li>
                                <li>備註: ${item.remark == "" ? "無備註" : item.remark}</li>
                                <li>重要程度: ${item.level == "#039be5" ? "普通" : (item.level == "#f8db36" ? "重要" : "非常重要")}</li>
                                `
                                schedule.appendChild(ul)
                            })
                        }
                    })

                    // 今天日期標註
                    if(date == day && (document.getElementById("year-month").innerText.includes(year)) && (document.getElementById("year-month").innerText.includes(`${tdMonth+1} 月`))){
                        td.style.backgroundColor = "rgba(83, 194, 250, 0.178)"
                    }

                    if(localStorage.getItem(`${year}-${month + 1}-${day}`) != null){
                        
                        let ul = document.createElement("ul");
                        let todoList = JSON.parse(localStorage.getItem(`${year}-${month + 1}-${day}`));
                        todoList.forEach(item => {
                            let li = document.createElement("li");
                            let span = document.createElement("span")

                            span.innerText = item.time
                            let temp = item.title;
                            li.innerText = temp.length > 6 ? `${item.title.slice(0,6)}...` : temp
                            li.style.backgroundColor = `${item.level}`;

                            // 事件綁定，修改行程
                            li.addEventListener("click",function(e){
                                editItem = temp
                                $('#infoModal').modal('show');
                                document.getElementById('info-date').value = `${year}-${month + 1}-${e.target.offsetParent.childNodes[0].innerText}`;
                                document.getElementById('info-todo-item').value = `${temp}`;
                                document.getElementById('info-todo-time').value = `${item.time}`;
                                document.getElementById('info-remark-item').value = `${item.remark}`;
                                document.getElementById('info-todo-position').value = `${item.position}`;
                                document.querySelectorAll(".info-level").forEach(x => {
                                    if(x.getAttribute("value") == item.level){
                                        x.checked = true
                                    }
                                })
                            })
                            if(span.innerText == undefined){}else{li.append(span)}
                            
                            ul.appendChild(li)
                        })
                        td.appendChild(ul)
                    }
                    // 事件綁定，增加行程
                    td.addEventListener("click",function(e){
                        let target;
                        if(e.target.localName == "ul"){
                            target = e.target.offsetParent
                        }else if(e.target.localName == "li"){
                            return
                        }else if(e.target.localName == "span"){
                            return
                        }
                        else{
                            target = e.target
                        }
                        $('#inputModal').modal('show');
                        document.getElementById('date').value = `${year}-${month + 1}-${target.childNodes[0].innerText}`;
                    })
                }else{
                    // 下個月
                    td.style.color = 'red'
                    td.innerText = nextMonthDay;
                    nextMonthDay++
                }
                day++;
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }
}

function SaveTodoItem(){
    let date = document.getElementById('date').value;
    let todoItem = document.getElementById('todo-item').value;
    let todoTime = document.getElementById('todo-time').value;
    let remarkItem = document.getElementById('remark-item').value;
    let todoPosition = document.getElementById('todo-position').value;
    let level = document.querySelectorAll(".level");
    let todoLevel;
    let array;
    let newStr;

    array = date.split('-')
    let newArr = array.map(x => {
        if(x[0] == 0){
            let str = x.slice(1);
            return str
        }else{
            return x
        }
    })
    newStr = newArr.join('-')

    level.forEach(x => {
        if(x.checked){todoLevel = x.getAttribute("value")}
    })


    if(todoItem == ""){
        alert("請填入標題");
        return
    }

    let todoObj = {
        title: todoItem,
        time: todoTime,
        level: todoLevel,
        remark: remarkItem,
        position: todoPosition
    }

    let todoList = []

    if(localStorage.getItem(newStr) == null){
        todoList.push(todoObj)
        // 今天沒有代辦事項
    }
    else{
        todoList = JSON.parse(localStorage.getItem(newStr))
        todoList.push(todoObj)
        // 今天已有代辦事項
    }
    localStorage.setItem(newStr, JSON.stringify(todoList));
    Init();
}

function EditTodoItem(){
    let date = document.getElementById('info-date').value;
    let todoItem = document.getElementById('info-todo-item').value;
    let todoTime = document.getElementById('info-todo-time').value;
    let remarkItem = document.getElementById('info-remark-item').value;
    let todoPosition = document.getElementById('info-todo-position').value;
    let level = document.querySelectorAll(".info-level");
    let todoLevel;

    level.forEach(x => {
        if(x.checked){todoLevel = x.getAttribute("value")}
    })

    let todoList = []

    // 今天已有代辦事項
    todoList = JSON.parse(localStorage.getItem(date));
    let edit = todoList.find(x => x.title == editItem);
    edit.title = todoItem;
    edit.time = todoTime;
    edit.level = todoLevel;
    edit.remark = remarkItem;
    edit.position = todoPosition;
    localStorage.setItem(date, JSON.stringify(todoList));
    Init();
}

function DeleteTodoItem(){
    let date = document.getElementById('info-date').value;

    let todoList = []

    todoList = JSON.parse(localStorage.getItem(date))
    localStorage.removeItem(date);
    let edit = todoList.find(x => x.title == editItem.innerText)
    todoList.splice(todoList.indexOf(edit),1)
    if(todoList.length >= 1){
        localStorage.setItem(date, JSON.stringify(todoList));
    }
    Init();
}

function AddMonth(){
    month++;
    document.querySelector("table").classList.toggle("toggle-left")
    Init();
    document.querySelector("table").addEventListener("animationend",()=>{
        document.querySelector("table").classList.remove("toggle-left")
    })
}

function MinMonth(){
    month--;
    document.querySelector("table").classList.toggle("toggle-right")
    Init();
    document.querySelector("table").addEventListener("animationend",()=>{
        document.querySelector("table").classList.remove("toggle-right")
    })
}

function BackToday(){
    location.replace(location)
}

function AddTodo(){
    let dt = document.getElementById('date')

    $('#inputModal').modal('show');

    dt.removeAttribute("readonly");
    dt.setAttribute("type","date")
}

function readOnlyToggle() {
    let dt = document.getElementById('date')
    dt.setAttribute("readonly",true);
    dt.setAttribute("type","text")
}

// window.addEventListener("mousewheel",function(e){
//     if(e.deltaY > 0){AddMonth()}
//     if(e.deltaY < 0){MinMonth()}
// })

let canOpen = true
document.querySelector(".closeBtn").addEventListener("click",(e)=>{
    let schedule = document.querySelector(".schedule")
    let googleMap = document.querySelector(".google-map")
    canOpen = true
    let slide = document.querySelector(".slide")
    let spanTime = document.querySelectorAll("li span")
    e.target.style.display = "none"
    e.target.parentNode.style.width = "3rem"
    e.target.parentNode.addEventListener("transitionend",()=>{
        if(canOpen){
            slide.classList.remove("slide-open")
            canOpen = !canOpen;
        }
    })
    spanTime.forEach(x => x.style.marginRight = "1rem")
    schedule.innerHTML = ""
    schedule.style.display = "none"
    googleMap.style.display = "none"
})

let speakBtn;
//語音
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'zh-TW';

recognition.addEventListener('result', e => {
const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    speakBtn.parentNode.querySelector("input").value = transcript;
    
});

document.querySelectorAll(".microphone").forEach(item =>{
    item.addEventListener("click",function(e){
        speakBtn = e.target
        e.target.style.backgroundColor = "rgb(170, 170, 170)"
        recognition.start();
        recognition.addEventListener('end', function(){
            recognition.stop()
            speakBtn.style.backgroundColor = "rgb(236, 236, 236)"
        });
    })
})

// 排序
function Sort() {
    let i = 0
    while(localStorage.key(i) != null){
        let sortedArr = [];
        let arr = JSON.parse(localStorage.getItem(localStorage.key(i)))

        let newArr = [...arr].map(x => {
            if(x == ""){return }
            let str = x.time.split(':')
            return str
        })

        newArr.sort(function(a,b) {
            if(Number(a[0]) != Number(b[0])){
                return Number(a[0]) - Number(b[0])
            }else{
                return Number(a[1]) - Number(b[1])
            }
        })

        newArr.map(x => {return x.join(':')}).forEach(x =>{
            arr.forEach(y =>{
                if(x == y.time){
                    sortedArr.push(y)
                }
            })
        })

        localStorage.setItem(localStorage.key(i),JSON.stringify(sortedArr));
        i++
    }
    Init();
}