let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click",e=>{
    e.preventDefault();

    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDay = form.children[2].value;
    // console.log(todoText , todoMonth , todoDay);

    if (todoText === ""){
        alert("Please Enter Some Text.");
        return;
    }
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDay;

    todo.appendChild(text);
    todo.appendChild(time);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click",e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })



    let trashbutton = document.createElement("button");
    trashbutton.classList.add("trash");
    trashbutton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    
    trashbutton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend",()=>{
        todoItem.remove();
        })
        todoItem.style.animation = "scaleDown .3s forwards"
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashbutton);
    
    todo.style.animation = "scaleUp .3s forwards";

    // let myTodo = {
    //     todoText: todoText,
    //     todoMonth: todoMonth,
    //     todoDay: todoDay
    // };

    // let myList = localStorage.getItem("list");
    // if (myList == null){
    //     localStorage.setItem("list",JSON.stringify([myTodo]));
    // }else{
    //     let myListArray = JSON.parse(myList);
    //     myListArray.push(myTodo);
    //     localStorage.setItem("list",JSON.stringify(myListArray));
    // }

    form.children[0].value = "";
    section.appendChild(todo);
});

let myList = localStorage.getItem("list");
if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.array.forEach(item => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMonth + " / " + item.todoDay;
    todo.appendChild(text);
    todo.appendChild(time);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click",e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashbutton = document.createElement("button");
    trashbutton.classList.add("trash");
    trashbutton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    
    trashbutton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend",()=>{
        todoItem.remove();
        })
        todoItem.style.animation = "scaleDown .3s forwards"
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashbutton);
    section.appendChild(todo);
    });
}


