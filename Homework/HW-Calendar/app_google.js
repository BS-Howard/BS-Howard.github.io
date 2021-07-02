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
                    td.innerText = day;

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
                            li.innerText = temp.length > 10 ? `${item.title.slice(0,10)}...` : temp
                            li.style.backgroundColor = `${item.level}`;

                            // 事件綁定，修改行程
                            li.addEventListener("click",function(e){
                                editItem = temp
                                $('#infoModal').modal('show');
                                document.getElementById('info-date').value = `${year}-${month + 1}-${e.target.offsetParent.childNodes[0].data}`;
                                document.getElementById('info-todo-item').value = `${temp}`;
                                document.getElementById('info-todo-time').value = `${item.time}`;
                                document.querySelectorAll(".level").forEach(x => {
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
                        }
                        else{
                            target = e.target
                        }
                        $('#inputModal').modal('show');
                        document.getElementById('date').value = `${year}-${month + 1}-${target.childNodes[0].data}`;
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
        level: todoLevel
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
    let level = document.querySelectorAll(".level");
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

window.addEventListener("mousewheel",function(e){
    if(e.deltaY > 0){AddMonth()}
    if(e.deltaY < 0){MinMonth()}
})