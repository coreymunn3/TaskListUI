// Script for Task List

// UI Elements
addBtn = document.getElementById('add');
inputTask = document.getElementById('name');
clearBtn = document.getElementById('clear');
taskList = document.getElementById('task-items');
errorMsg = document.getElementById('error');

// Event Listeners
addBtn.addEventListener('click',addTask);
clearBtn.addEventListener('click',clearTasks);
taskList.addEventListener('click',manageTask);
document.addEventListener('DOMContentLoaded',getTasks)

// Functions
function getTasks(){
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create list item element
    const li = document.createElement('li');
    li.className = 'task';
    // add list item text content
    const taskName = document.createTextNode(task);
    li.appendChild(taskName);
    // create list item children
    const checkIcon = document.createElement('i');
    checkIcon.className = 'fas fa-check fa-1x check'
    const editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit fa-1x'
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-minus-circle fa-1x delete'
    // span element with icons appended
    const span = document.createElement('span')
    span.className = 'task-manage'
    span.appendChild(checkIcon);
    span.appendChild(editIcon);
    span.appendChild(deleteIcon);
    // append span to li
    li.appendChild(span);
    // append li to ul
    taskList.appendChild(li);
  })
}
function addTask(e){
  // if no task name is entered, display error
  if (inputTask.value === ''){
    displayErrorMessage("Please First Enter a Task Name")
    setTimeout(clearErrorMessage,3000)
  } else {
    // create list item element
    const li = document.createElement('li');
    li.className = 'task';
    // add list item text content
    const taskName = document.createTextNode(inputTask.value);
    li.appendChild(taskName);
    // create list item children
    const checkIcon = document.createElement('i');
    checkIcon.className = 'fas fa-check fa-1x check'
    const editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit fa-1x'
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-minus-circle fa-1x delete'
    // span element with icons appended
    const span = document.createElement('span')
    span.className = 'task-manage'
    span.appendChild(checkIcon);
    span.appendChild(editIcon);
    span.appendChild(deleteIcon);
    // append span to li
    li.appendChild(span);
    // append li to ul
    taskList.appendChild(li);

    // push to local storage
    pushToLocalStorage(inputTask.value);

    // clear input field of text
    inputTask.value = '';
    e.preventDefault();
  }
}

function clearTasks(){
  // if there are no tasks in the list, display error
  let numListChildren = document.querySelectorAll('.task').length
  if (numListChildren === 0) {
    displayErrorMessage("No Tasks in List");
    setTimeout(clearErrorMessage,3000);
  } else {
    // clear from UI
    let child = taskList.firstElementChild;
    while (child){
      child.remove();
      child = taskList.firstElementChild;
    }
    // clear from local storage
    localStorage.removeItem('tasks')
  }
}

function manageTask(e){
  // delete button removes the li and removes from local storage
  let li = e.target.parentElement.parentElement;
  if (e.target.classList.contains('delete')){
    li.remove();
    removeFromLocalStorage(li.textContent)
  }
  // check button toggles a strikethrough effect
  else if (e.target.classList.contains('check')){
    if (li.classList.contains('strike')){
      li.classList.remove('strike');
    } else {
      li.classList.add('strike');
    }
  }
  // edit button allows you to change text - build this feature
  
  // console.log(e.target.parentElement.parentElement)
}

function pushToLocalStorage(task){
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // add current task to the array
  tasks.push(task);

  // commit changes to local storage
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeFromLocalStorage(taskToRemove){
  let tasks;
  tasks = JSON.parse(localStorage.getItem('tasks'));
  // remove from task list if they match
  for(let i =0; i < tasks.length; i++){
    if (tasks[i] === taskToRemove){
      tasks.splice(i,1)
    }
  }
  // commit changes to local storage
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

function displayErrorMessage(message){
  errorMsg.textContent = message;
  errorMsg.classList.add('standard-padding')
}
function clearErrorMessage(){
  errorMsg.textContent = '';
  errorMsg.classList.remove('standard-padding')
}