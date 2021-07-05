// 標題及按鈕 變數
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById("deleteBtn");
let yearMonth = document.getElementById("year-month");
let tbody = document.getElementsByTagName("tbody")[0];

// Modal Add 變數
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');
let todoItem = document.getElementById('todo-item');
let todoStartTime = document.getElementById('todo-startTime');
let todoEndTime = document.getElementById('todo-endTime');
let todoPosition = document.getElementById('todo-position');
let remarkItem = document.getElementById('remark-item');
let level = document.querySelectorAll(".level");


// Modal Info 變數
let infoStartDate = document.getElementById('info-start-date');
let infoEndDate = document.getElementById('info-end-date');
let infoTodoItem = document.getElementById('info-todo-item');
let infoStartTime = document.getElementById('info-todo-startTime');
let infoEndTime = document.getElementById('info-todo-endTime');
let infoRemarkItem = document.getElementById('info-remark-item');
let infoTodoPosition = document.getElementById('info-todo-position');
let InfoLevel = document.querySelectorAll(".info-level");

// sideNav 變數
let sideNav = document.querySelector(".side-nav");
let slide = document.querySelector(".slide");
let closeBtn = document.querySelector(".closeBtn");
let googleMap = document.querySelector(".google-map");
let schedule = document.querySelector(".schedule")

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let tdMonth = today.getMonth();
let date = today.getDate();

window.addEventListener("load",function(){
    Init();
})

// 初始化
function Init() {
    
    // 清空上次新增後的值
    tbody.innerHTML = "";
    todoItem.value = "";
    todoStartTime.value = "";
    todoEndTime.value = "";
    remarkItem.value = "";
    todoPosition.value = "";
    endDate.value = "";

    // 按加號按鈕後需要重新設定唯讀
    startDate.setAttribute("readonly",true);
    startDate.setAttribute("type","text");

    // 年月份
    yearMonth.innerText = `${new Date(year,month,1).getFullYear()} 年 ${new Date(year,month,1).getMonth() + 1} 月`;

    // 區域變數
    let firstDay = new Date(year,month,1).getDay();
    let dayofMonth = new Date(year,month + 1, 0).getDate();
    let rows = Math.ceil((dayofMonth + firstDay) / 7)
    let lastMonthDay = new Date(year,month, 0).getDate();
    let nextMonthDay = 1;
    let day = 1;
    

    // 產生table裡面的日期
    for(let row = 0; row < rows; row++){
        let tr = document.createElement('tr');
        for(let col = 0; col < 7; col++){
            let td = document.createElement('td');
            if(row == 0 && col < firstDay){
                // 上個月推算並標記紅色
                td.style.color = 'red';
                td.innerText = lastMonthDay - (firstDay-1) + col;
            }else{
                // 這個月的日期
                if(day <= dayofMonth){

                    // 每天的按鈕，按下去會顯示sideNav
                    let showAllBtn = document.createElement("span");
                    showAllBtn.classList.add("showAll");
                    showAllBtn.innerText = day;
                    td.appendChild(showAllBtn);

                    // 顯示sideNav
                    showAllBtn.addEventListener("click",function(e){
                        
                        // li裡的時間顯示往移
                        let spanTime = document.querySelectorAll("li span");
                        spanTime.forEach(x => x.style.marginRight = "2.5rem");

                        sideNav.style.width = "25rem";

                        // 圖示按鈕不顯示
                        slide.classList.add("slide-open");
                        closeBtn.setAttribute("style","display:block; margin:1rem; align-self: flex-end;")
                        googleMap.style.display = "block";

                        // 顯示所有行程
                        schedule.style.display = "block";
                        if(localStorage.getItem(`${new Date(year,month,1).getFullYear()}-${new Date(year,month,1).getMonth() + 1}-${showAllBtn.innerText}`) != null){
                            let todoList = JSON.parse(localStorage.getItem(`${new Date(year,month,1).getFullYear()}-${new Date(year,month,1).getMonth() + 1}-${showAllBtn.innerText}`));
                            todoList.forEach(item => {
                                let ul = document.createElement("ul");
                                ul.style.border = `5px solid ${item.level}`;
                                ul.style.backgroundColor = `${item.level}`;
                                ul.innerHTML=`
                                <li>標題: ${item.title}</li>
                                <li>開始日期: ${item.startDate} & 時間: ${item.startTime == "" ? "無備註" : item.startTime}</li>
                                <li>結束日期: ${item.endDate == "" ? "無備註" : item.endDate} & 時間: ${item.endTime == "" ? "無備註" : item.endTime}</li>
                                <li>地點: ${item.position == "" ? "無備註" : item.position}</li>
                                <li>備註: ${item.remark == "" ? "無備註" : item.remark}</li>
                                <li>重要程度: ${item.level == "#039be5" ? "普通" : (item.level == "#f8db36" ? "重要" : "非常重要")}</li>
                                `;
                                schedule.appendChild(ul);
                            })
                        }
                    })

                    // 今天日期標註
                    if(date == day && yearMonth.innerText.includes(year) && yearMonth.innerText.includes(`${tdMonth+1} 月`)){
                        td.style.backgroundColor = "rgba(83, 194, 250, 0.178)";
                    }
                    // 顯示所有待辦事項
                    if(localStorage.getItem(`${new Date(year,month,1).getFullYear()}-${new Date(year,month,1).getMonth() + 1}-${day}`) != null){
                        
                        let ul = document.createElement("ul");
                        let todoList = JSON.parse(localStorage.getItem(`${new Date(year,month,1).getFullYear()}-${new Date(year,month,1).getMonth() + 1}-${day}`));
                        
                        todoList.forEach(item => {
                            let li = document.createElement("li");
                            let span = document.createElement("span")
                            let temp = item.title;

                            // 標題超過指定數字就用...表示
                            li.innerText = temp.length > 6 ? `${item.title.slice(0,6)}...` : temp
                            li.style.backgroundColor = `${item.level}`;

                            // span顯示時間
                            if (Split(item.endDate,'-',2) == day && item.startDate != item.endDate && Split(item.endDate,'-',1) == (new Date(year,month,1).getMonth() + 1) && Split(item.endDate,'-',0) == new Date(year,month,1).getFullYear()){
                                if(item.endTime){span.innerText = `~${item.endTime}`;}
                                else{span.innerText = `end`;}
                            }else if(Split(item.startDate,'-',2) == day){
                                // 沒有跨日的顯示
                                if (item.endDate == "" || item.startDate == item.endDate){
                                    if (item.endTime == ""){span.innerText = `${item.startTime}`;}
                                    else{span.innerText = `${item.startTime}~${item.endTime}`;}
                                }else{
                                    if ( Split(item.startDate,'-',1) == (new Date(year,month,1).getMonth() + 1) && Split(item.startDate,'-',0) == new Date(year,month,1).getFullYear()){
                                        if(item.startTime){span.innerText = `${item.startTime}~`;}
                                        else{span.innerText = `start`;}}
                                }
                            }else{
                                span.innerText = "--:--";
                            }
                            

                            // 事件綁定，修改行程
                            li.addEventListener("click",function(e){

                                // 全域變數
                                editItemTitle = temp;
                                editItemLevel = item.level;

                                $('#infoModal').modal('show');
                                infoStartDate.value = `${item.startDate}`;
                                // 增加0在數字前
                                infoEndDate.value = `${addZero(item.endDate)}`;
                                infoTodoItem.value = `${temp}`;
                                infoStartTime.value = `${item.startTime}`;
                                infoEndTime.value = `${item.endTime}`;
                                infoRemarkItem.value = `${item.remark}`;
                                infoTodoPosition.value = `${item.position}`;
                                InfoLevel.forEach(x => {
                                    if(x.getAttribute("value") == item.level){
                                        x.checked = true;
                                    }
                                })
                            })

                            // 增加指定時間
                            if(span.innerText == undefined){}else{li.append(span)};
                            
                            ul.appendChild(li);
                        })
                        td.appendChild(ul);
                    }

                    // 事件綁定，增加行程
                    td.addEventListener("click",function(e){
                        let target;
                        if(e.target.localName == "ul"){
                            target = e.target.offsetParent;
                        }else if(e.target.localName == "li" || e.target.localName == "span"){
                            return;
                        }else{
                            target = e.target;
                        }
                        $('#inputModal').modal('show');
                        startDate.value = `${new Date(year,month,1).getFullYear()}-${new Date(year,month,1).getMonth() + 1}-${target.childNodes[0].innerText}`;
                    })

                }else{

                    // 下個月推算並標記紅色
                    td.style.color = 'red';
                    td.innerText = nextMonthDay;
                    nextMonthDay++;
                }
                day++;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

let saveObj = {};
function SaveTodoItem(newStartDate,record){
    let todoLevel;
    // 因為按到+按鈕可以自己選日期，所以要改格式
    newEndDate = checkDate(endDate.value);
    // 取得重要程度
    level.forEach(x => {
        if(x.checked){todoLevel = x.getAttribute("value")}
    })

    // 日期不符合
    if (newEndDate){
        if(Split(startDate.value,'-',0) > Split(endDate.value,'-',0)){
            alert("請填入正確年份");
            return
        }else if (Split(startDate.value,'-',0) == Split(endDate.value,'-',0)){
            if (Split(startDate.value,'-',1) > Split(endDate.value,'-',1)){
                alert("請填入正確月份");
                return
            }else if (Split(startDate.value,'-',1) == Split(endDate.value,'-',1)){
                if (Split(startDate.value,'-',2) > Split(endDate.value,'-',2)){
                    alert("請填入正確日期");
                    return
                }
            }
        }
    }

    // 時間不符合
    if( Split(startDate.value,'-',2) == Split(endDate.value,'-',2) || !endDate.value){
        if(Split(todoStartTime.value,':',0)  > Split(todoEndTime.value,':',0) && todoEndTime.value != ""){
            alert("請填入正確小時的時間");
            return
        }else{
            if(Split(todoStartTime.value,':',1)  > Split(todoEndTime.value,':',1)){
                alert("請填入正確分鐘的時間");
                return
            }
        }
    }

    let todoObj = {
        title: todoItem.value,
        startDate: record || newStartDate,
        endDate: newEndDate,
        startTime: todoStartTime.value,
        endTime: todoEndTime.value,
        level: todoLevel,
        remark: remarkItem.value,
        position: todoPosition.value,
        start: startDate.value == newStartDate? todoStartTime.value : "",
        end: newStartDate == newEndDate? todoEndTime.value : "",
        middle: todoStartTime.value,
    }

    Object.assign(saveObj,todoObj);

    // 沒填入標題跳出alert
    if(todoItem.value == ""){
        alert("請填入標題");
        return
    }

    let todoList = [];

    if(localStorage.getItem(newStartDate) == null){
        // 今天沒有代辦事項
        todoList.push(todoObj);
    }
    else{
        // 今天已有代辦事項
        todoList = JSON.parse(localStorage.getItem(newStartDate));
        todoList.push(todoObj);
    }
    localStorage.setItem(newStartDate, JSON.stringify(todoList));
}

saveBtn.addEventListener("click",function(){
    reviewAll(SaveTodoItem,saveObj)
})


// 日期去除0
function checkDate(date) {
    let array = date.split('-');
    let newArr = array.map(x => {
        if(x[0] == 0){
            return x.slice(1);
        }else{
            return x;
        }
    })
    return newArr.join('-');
}

// 日期加上0
function addZero(date) {
    let array = date.split('-');
    let newArr = array.map(x => {
        if(x[0] != 0 && x.length != 2){
            return `0${x}`
        }else{
            return x;
        }
    })
    return newArr.join('-');
}

let editObj = {};
function EditTodoItem(temp,record){
    let todoLevel;
    let todoList = [];

    InfoLevel.forEach(x => {
        if(x.checked){todoLevel = x.getAttribute("value")};
    })

    // 時間不符合
    if( Split(infoStartDate.value,'-',2) == Split(checkDate(infoEndDate.value),'-',2) || !checkDate(infoEndDate.value)){
        if(Split(infoStartTime.value,':',0)  > Split(infoEndTime.value,':',0) && infoEndTime.value != ""){
            alert("請填入正確小時的時間");
            return
        }else{
            if(Split(infoStartTime.value,':',1)  > Split(infoEndTime.value,':',1)){
                alert("請填入正確分鐘的時間");
                return
            }
        }
    }


    // 今天已有代辦事項
    todoList = JSON.parse(localStorage.getItem(temp));
    let edit = todoList.find(x => x.title == editItemTitle && x.level == editItemLevel);
    Object.assign(editObj,edit)

    if(infoTodoItem.value == ""){
        alert("請填入標題");
        return
    }

    edit.title = infoTodoItem.value;
    edit.startDate = record || temp,
    edit.startTime = infoStartTime.value;
    edit.endTime = infoEndTime.value;
    edit.endDate = checkDate(infoEndDate.value);
    edit.level = todoLevel;
    edit.remark = infoRemarkItem.value;
    edit.position = infoTodoPosition.value;
    edit.start = infoStartDate.value == temp? infoStartTime.value : "",
    edit.end = temp == checkDate(infoEndDate.value)? infoEndTime.value : "",
    edit.middle = infoStartTime.value,
    localStorage.setItem(temp, JSON.stringify(todoList));
}


editBtn.addEventListener("click",function(){
    reviewAll(EditTodoItem,editObj)
})

let deleteObj = {};
function DeleteTodoItem(temp){
    let todoList = [];

    todoList = JSON.parse(localStorage.getItem(temp));
    localStorage.removeItem(temp);
    let edit = todoList.find(x => x.title == editItemTitle && x.level == editItemLevel);
    Object.assign(deleteObj,edit)
    // 刪除所選事件
    todoList.splice(todoList.indexOf(edit),1);

    // 判斷是否為空陣列
    if(todoList.length >= 1){
        localStorage.setItem(temp, JSON.stringify(todoList));
    }
}

deleteBtn.addEventListener("click",function(){
    reviewAll(DeleteTodoItem,deleteObj)
})

let table = document.querySelector("table");

function AddMonth(){
    month++;
    table.classList.toggle("toggle-left");
    Init();
    table.addEventListener("animationend",function(e){
       e.target.classList.remove("toggle-left");
    })
}

function MinMonth(){
    month--;
    table.classList.toggle("toggle-right");
    Init();
    table.addEventListener("animationend",function(e){
        e.target.classList.remove("toggle-right");
    })
}

function BackToday(){
    location.replace(location);
}

function AddTodo(){
    $('#inputModal').modal('show');
    startDate.removeAttribute("readonly");
    startDate.setAttribute("type","date");
}

function readOnlyToggle() {
    startDate.setAttribute("readonly",true);
    startDate.setAttribute("type","text");
}

// 滑鼠滾動換頁
table.addEventListener("mousewheel",function(e){
    if(e.deltaY > 0){AddMonth()}
    if(e.deltaY < 0){MinMonth()}
})

let canOpen = true;

// 側邊關閉按鈕
document.querySelector(".closeBtn").addEventListener("click",(e)=>{
    let schedule = document.querySelector(".schedule");
    let googleMap = document.querySelector(".google-map");
    let slide = document.querySelector(".slide");
    let spanTime = document.querySelectorAll("li span");
    canOpen = true;
    e.target.style.display = "none";
    e.target.parentNode.style.width = "3rem";
    e.target.parentNode.addEventListener("transitionend",()=>{
        if(canOpen){
            slide.classList.remove("slide-open");
            canOpen = !canOpen;
        }
    })
    spanTime.forEach(x => x.style.marginRight = "1rem");
    schedule.innerHTML = "";
    schedule.style.display = "none";
    googleMap.style.display = "none";
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
            if(x.end == "" && x.start == "" && x.middle == ""){return ["25","25"]}
            let str = (x.end || x.start || x.middle).split(':')
            return str
        })
        

        newArr.sort(function(a,b) {
            if(Number(a[0]) != Number(b[0])){
                return Number(a[0]) - Number(b[0])
            }else{
                return Number(a[1]) - Number(b[1])
            }
        })
        let index = 0
        newArr.map(x => {return x.join(':')}).forEach(x =>{
            let newItem;
            if(x == ["25:25"]){
                newItem = arr.filter(y=> !y.end &&  !y.start && !y.middle)[index];
                index++;
            }else{
                newItem = arr.find(y=> x == y.end || x == y.start || x == y.middle);
            }
            sortedArr.push(newItem)
        })

        localStorage.setItem(localStorage.key(i),JSON.stringify(sortedArr));
        i++
    }
    Init();
}

function Split(str,x,number){
    return Number(str.split(`${x}`)[number]);
}

function reviewAll(callback,obj){
    let record = checkDate(startDate.value);
    callback(record);

    let startDay = Split(obj.startDate,'-',2);
    let endDay = Split(obj.endDate,'-',2);
    let startMonth = Split(obj.startDate,'-',1);
    let endMonth = Split(obj.endDate,'-',1);
    let startYear = Split(obj.startDate,'-',0);
    let endYear = Split(obj.endDate,'-',0);
    let dayofMonth = new Date(year,startMonth , 0).getDate();

    if(obj.title != ""){
        //有跨月份或年分
        if (startYear != endYear || startMonth != endMonth){
            while(endYear >= startYear){
                startDay++;
                if(startDay-1 != dayofMonth){
                    let newStartDay = `${startYear}-${startMonth}-${startDay}`;
                    callback(checkDate(newStartDay),record);
                }else{
                    startDay--;
                }
                if (startDay==dayofMonth){
                    if (startYear == endYear && startMonth == endMonth && startDay == endDay){break}
                    startDay = 0;
                    if(startMonth+1 > 12){startMonth = 1; startYear++;}
                    else{startMonth++;}
                    dayofMonth = endMonth == startMonth && startYear == endYear ? endDay : new Date(startYear,startMonth, 0).getDate();
                }
            }
        }else{
            // 沒有跨月份
            while(endDay > startDay){
                startDay++;
                let newStartDay = `${startYear}-${startMonth}-${startDay}`;
                callback(checkDate(newStartDay),record);
            }
        }
    }
    Init();
}