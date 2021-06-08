const Add = document.querySelector("form button");
const Section = document.querySelector("section");
Add.addEventListener("click", (e) => {
  e.preventDefault();
  const Form = Add.parentElement;
  let todoItem = Form.children[0].value;
  let todoMonth = Form.children[1].value;
  let todoDate = Form.children[2].value;

  if (todoItem === "" || todoMonth === "" || todoDate === "") {
    alert("Please Enter Some Text.");
    return;
  }

  // Section - add todo list
  let div = document.createElement("div");
  div.classList.add("todo-Item");
  let todoText = document.createElement("p");
  todoText.innerText = todoItem;
  let todoTime = document.createElement("p");
  todoTime.innerText = `${todoMonth} / ${todoDate}`;
  div.append(todoText, todoTime);

  // Complete
  let completed = document.createElement("button");
  completed.classList.add("completed");
  completed.innerHTML = `<i class="fas fa-check"></i>`;
  completed.addEventListener("click", (e) => {
    div.classList.toggle("todo-Done");
  });

  // Delete
  let trash = document.createElement("button");
  trash.classList.add("trash");
  trash.innerHTML = `<i class="fas fa-trash"></i>`;
  trash.addEventListener("click", (e) => {
    let item = e.target.parentElement;
    item.addEventListener("animationend", () => {
      Section.removeChild(item);
    });
    item.style.animation = "scaledown .3s";
    let text = div.children[0].innerText;
    let myListArray = JSON.parse(localStorage.getItem("list"));
    myListArray.forEach((item, index) => {
      if (item.todoItem == text) {
        myListArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myListArray));
      }
    });
  });
  div.style.animation = "scaleup .3s";
  div.append(completed, trash);

  // Local Storage
  let myTodo = {
    todoItem: todoItem,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  let myList = localStorage.getItem("list");
  if (myList === null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  // Form.children[0].value = ""
  Section.appendChild(div);
});

function reSort() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      // Section - add todo list
      let div = document.createElement("div");
      div.classList.add("todo-Item");
      let todoText = document.createElement("p");
      todoText.innerText = item.todoItem;
      let todoTime = document.createElement("p");
      todoTime.innerText = `${item.todoMonth} / ${item.todoDate}`;
      div.append(todoText, todoTime);

      // Complete
      let completed = document.createElement("button");
      completed.classList.add("completed");
      completed.innerHTML = `<i class="fas fa-check"></i>`;
      completed.addEventListener("click", (e) => {
        div.classList.toggle("todo-Done");
      });

      // Delete
      let trash = document.createElement("button");
      trash.classList.add("trash");
      trash.innerHTML = `<i class="fas fa-trash"></i>`;
      trash.addEventListener("click", (e) => {
        let item = e.target.parentElement;
        item.addEventListener("animationend", () => {
          Section.removeChild(item);
        });
        item.style.animation = "scaledown .3s";
        let text = div.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoItem == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
      });
      div.append(completed, trash);
      Section.appendChild(div);
    });
  }
}
reSort();
// localStorage.removeItem("list")

let SortButton = document.querySelector("#sort button");
SortButton.addEventListener("click", (e) => {
  var myList = localStorage.getItem("list");
  var myListArray = JSON.parse(myList);
  for (let i = 0; i < myListArray.length-1; i++) {
    if (Number(myListArray[i]["todoMonth"]) > Number(myListArray[i + 1]["todoMonth"])) {
      let temp = myListArray[i];
      myListArray[i] = myListArray[i + 1];
      myListArray[i + 1] = temp;
    }
  }
  localStorage.setItem("list", JSON.stringify(myListArray));
//   console.log(Section.children)
  for (let i = 0; i < Section.children.length; i++){
      Section.children[0].remove()
//   reSort();
  }
});