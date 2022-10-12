//Selector
const todoInput= document.querySelector(".todo-input");
const todoButton= document.querySelector(".todo-button");
const todoList= document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Function
function addtodo(event){
    
    // Prevent Form from submitting...
    event.preventDefault();

    
    // todo div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add("todo");
    
    // Create li
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText=todoInput.value;
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
   
    // Check mark button
    const completedButton= document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  
    // Check tash button
    const trashButton= document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
   
    //append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value
    todoInput.value="";

}

function deleteCheck(e){
    const item=e.target;
    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo=item.parentElement;
        removeLocalTodos(todo);
        todo.classList.add("fall");
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
    }
    //completed
    if(item.classList[0] === "complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos =todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }
                else{
                    todo.style.display ="none";
                }
                break;
            
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }
                else{
                    todo.style.display ="none";
                }
                break;        
        }
    })
}
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }