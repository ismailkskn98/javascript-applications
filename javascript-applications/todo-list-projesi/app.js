let addTodoButton = document.querySelector("#addToDo");
let clearTodoButton = document.querySelector("#clearToDo");
let inputText = document.querySelector("#inputText");
let todoList = document.querySelector(".todoList");

//tıkladığımızda addTodo method'u çalışsın
addTodoButton.addEventListener("click", addTodo);

function addTodo(e){
    //input'un içindeki değeri todoText'değişkenine atadık
    let todoText = inputText.value.trim();

    //p element'i oluşturup todoList div'in içine koyduk ve css yazdık
    let paragraph = document.createElement("p");
    paragraph.classList.add("paragraph_style");
    paragraph.innerHTML = todoText;
    todoList.appendChild(paragraph);

    //tek tıklama üstü çizilen todo
    paragraph.addEventListener("click", finishedWork);
    function finishedWork(){
        paragraph.style.textDecoration = "line-through";

    }

    //çift tıkladığımızda silinen todo
    paragraph.addEventListener("dblclick", deleteTodo);
    function deleteTodo(){
        paragraph.remove();
    }

    //clear buttonu
    clearTodoButton.addEventListener("click", todoClear);
    function todoClear(e){
        paragraph.remove();
        e.preventDefault();
    };

    //text eklendiğinde input'un içi boşalsın
    inputText.value = "";

    //button submit ettiğinde sayfa f5 atmasın
    e.preventDefault();
};

