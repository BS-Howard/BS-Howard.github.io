var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();

window.addEventListener("load",function(e){
    Init();
    SaveTodoItem();
})

function Init() {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    document.getElementById("year-month").innerText = `${new Date(year,month,1).getFullYear()}年 - ${new Date(year,month,1).getMonth() + 1}月`;

    let firstDay = new Date(year,month,1).getDay();

    let dayofMonth = new Date(year,month + 1, 0).getDate();

    let day = 1;
    let nextMonthDay = 1
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
                    if(localStorage.getItem(`${year}-${month + 1}-${day}`) != null){
                        let ul = document.createElement("ul");
                        let todoList = JSON.parse(localStorage.getItem(`${year}-${month + 1}-${day}`));
                        todoList.forEach(item => {
                            let li = document.createElement("li");
                            li.innerText = item.title;

                            // 事件綁定，修改行程
                            li.addEventListener("click",function(e){
                                editItem = e.target
                                $('#infoModal').modal('show');
                                document.getElementById('info-date').value = `${year}-${month + 1}-${e.target.offsetParent.childNodes[0].data}`;
                                document.getElementById('info-todo-item').value = `${e.target.innerText}`;
                            })

                            ul.appendChild(li)
                        })
                        td.appendChild(ul)
                    }
                    // 事件綁定，增加行程
                    td.addEventListener("click",function(e){
                        let target;
                        if(e.target.localName == "li" || e.target.localName == "ul"){
                            return
                        }else{
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

    let todoObj = {
        title: todoItem
    }

    let todoList = []

    if(localStorage.getItem(date) == null){
        todoList.push(todoObj)
        // 今天沒有代辦事項
    }
    else{
        todoList = JSON.parse(localStorage.getItem(date))
        todoList.push(todoObj)
        // 今天已有代辦事項
    }
    localStorage.setItem(date, JSON.stringify(todoList));
    Init();
}

function EditTodoItem(){
    let date = document.getElementById('info-date').value;
    let todoItem = document.getElementById('info-todo-item').value;

    let todoList = []

    // 今天已有代辦事項
    todoList = JSON.parse(localStorage.getItem(date))
    let edit = todoList.find(x => x.title == editItem.innerText)
    edit.title = todoItem
    localStorage.setItem(date, JSON.stringify(todoList));
    Init();
}

function DeleteTodoItem(){
    let date = document.getElementById('info-date').value;

    let todoList = []

    todoList = JSON.parse(localStorage.getItem(date))
    let edit = todoList.find(x => x.title == editItem.innerText)
    todoList.splice(todoList.indexOf(edit),1)
    localStorage.setItem(date, JSON.stringify(todoList));
    Init();
}

function AddMonth(){
    month++;
    Init();
}

function MinMonth(){
    month--;
    Init();
}