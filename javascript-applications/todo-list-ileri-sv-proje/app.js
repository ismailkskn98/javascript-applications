//! Selectors
const inputText = document.querySelector(".todoInput");
const addButton = document.querySelector("#addBtn");
const todoList = document.querySelector(".todoList");
const todoFilter = document.querySelector(".filter-todo");

//! Alerts
const alertSuccess = document.querySelector(".alert-success");
const alertWarning = document.querySelector(".alert-warning");

//! Events
document.addEventListener("DOMContentLoaded", getTodo);
addButton.addEventListener("click", todoAddButton);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);

//! Function

//! Todo Ekleme Start
//AddButton
function todoAddButton(e){
    //sayfa f5 atmaması için
    e.preventDefault();
    //input'dan text'i alalım
    let value = inputText.value.trim();

    // boş değer göndermemeleri için
    if(value == ""){
        Warning();
        //input içerisi boş kalması için
        inputText.value = "";
    }else{
        Success();
        todoCreate(value);
        saveLocalStorage(value);
    }  
}

//todo oluşturalım
function todoCreate(value){
    //todo oluşturalım
    //create todo div
    let todo = document.createElement("div");
     todo.classList.add("todo");
    //check mark button
    let completeButton = document.createElement("button");
    completeButton.classList.add("completeBtn");
    let completeIcon = document.createElement("i");
    completeIcon.classList.add("bi");
    completeIcon.classList.add("bi-check-circle-fill");
    //create todo li
    let li = document.createElement("li");
    li.classList.add("todoItem");
    li.innerHTML = value;
    // check trash button
    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trashBtn");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("bi");
    trashIcon.classList.add("bi-dash-circle-fill");

    //todoları birbirinin içine ekleyelim
    completeButton.appendChild(completeIcon);
    todo.appendChild(completeButton);
    todo.appendChild(li);
    trashBtn.appendChild(trashIcon);
    todo.appendChild(trashBtn);

    todoList.appendChild(todo);

    //input içerisi boş kalması için
    inputText.value = "";
}

//! Todo Ekleme End

//! Alert Function Start
function Warning(){
    alertWarning.style.display = "block";
    setTimeout(function(){
        alertWarning.style.display = "none";
    }, 2000);
}
function Success(){
    alertSuccess.style.display = "block";
    setTimeout(function(){
        alertSuccess.style.display = "none";
    }, 2000);
}
//! Alert Function End

//deleteCheck (silme veya onaylama)
function deleteCheck(e){
    const item = e.target;
    console.log(item);
    //delete todo
    if(item.classList[0] == "trashBtn"){
        let todo = item.parentElement;
        todo.remove();
        removeLocalStorage(todo);
    }

    //check mark
    if(item.classList[0] == "completeBtn"){
        const todo = item.parentElement;
        // toggle = tıkladıkça eklenip kaldıralacak
        todo.classList.toggle("complete");
    }
}

// filterTodo
function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    for(let todo of todos){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("complete")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!(todo.classList.contains("complete"))){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    }
}

//! Locale Storage Start

// local Stroge Kontrol
function controlLocalStorage(){
    let todos;
    let value = localStorage.getItem("todos");
    if(value == null){
        //boş ise öyle bir değer yoksa
        todos = [];
    }else{
        //varsa todos'un içine dizi halinde çekme
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// todosları çekme ve gönderme
function saveLocalStorage(todo){
    let todos = controlLocalStorage();
    // ekleyip gönderme dizimiş gibi gönderme
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//

// todo silme
function removeLocalStorage(todo){
    let todos = controlLocalStorage();
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// todoları çekme
function getTodo(){
    let todos = controlLocalStorage();
    for(let todo of todos){
        todoCreate(todo);
    }
}

//! Locale Storage End