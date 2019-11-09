// UI Elements
addBtn = document.getElementById('add');
inputTask = document.getElementById('name');
clearBtn = document.getElementById('clear');
taskList = document.getElementById('task-items');

// Event Listeners
addBtn.addEventListener('click',addTask);
clearBtn.addEventListener('click',clearTasks);
taskList.addEventListener('click',manageTask);

// Functions
function addTask(e){
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

  // clear input field of text
  inputTask.value = '';
  e.preventDefault();
}

function clearTasks(){
  let child = taskList.firstElementChild;
  while (child){
    child.remove();
    child = taskList.firstElementChild;
  }
}

function manageTask(e){
  if (e.target.classList.contains('delete')){
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('check')){
    li = e.target.parentElement.parentElement;
    li.classList.add('strike');
  }
  console.log(e.target.parentElement.parentElement)
}