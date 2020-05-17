const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

const addTodo = e => {
  e.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');
  todoItem.innerText = todoInput.value;
  todoDiv.appendChild(todoItem);
  saveLocalTodos(todoInput.value);

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement('button');
  trashButton.classList.add('trash-btn');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = '';
};

const deleteCheck = e => {
  const item = e.target;

  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    deleteTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
};

const filterTodo = e => {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
};

const saveLocalTodos = todo => {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', (JSON.stringify(todos)));
};

const getTodos = () => {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = todo;
    todoDiv.appendChild(todoItem);

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
};

const deleteTodos = todo => {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.splice(todos.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
};

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);