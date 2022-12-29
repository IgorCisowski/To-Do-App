// HTML ELEMENTS
const inputTodo = document.getElementById("inputTodo");
const add = document.getElementById("div__input__button--addToDo");
const ul = document.getElementById("storeToDo");
const li = document.getElementsByTagName("li");

// TOGGLE UTTON OR MESSAGE
const displayDefault = document.getElementById("display-default-message");
const deleteAll = document.getElementById("deleteAll");

// COUNTING TODOS VARIABLES
const active = document.querySelector("#left-todos-counter");
const completed = document.querySelector("#completed-todos-counter");

// SAVE TODOS
const saveToDo = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [];
}
// VARIABLES
let id = 0;

// ADD
const addToDo = () => {
  // MESSAGE THE USER if theres no value in the input
  if (inputTodo.value == "") {
    alert("You need to add a task first!");
    return false;
  } else {
    todos.push({
      title: inputTodo.value,
      id: ++id,
      completed: false,
    });
  }
  render();
  saveToDo();
};
// APPEND OnCLick
add.addEventListener("click", addToDo);

// DELETE
const deleteToDo = (e) => {
  const clickedButtonId = e.target.id;
  todos = todos.filter((li) => li.id != clickedButtonId);
  render();
  saveToDo();
};

// COMPLETE
const done = (e) => {
  const clickedCheckboxId = e.target.id;
  todos = todos.map((li) => {
    if (li.id == clickedCheckboxId) {
      li.completed = !li.completed;
    }
    return li;
  });
  render();
  saveToDo();
};

// ENTER APPEND
inputTodo.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addToDo();
    e.target.blur();
  }
});

// COUNT
const countTasks = () => {
  let completedTodos = todos.filter((li) => {
    return li.completed == true;
  });
  active.textContent = todos.length - completedTodos.length;
  completed.textContent = completedTodos.length;
  saveToDo();
};

// DELETE ALL
const clearAllToDo = () => {
  todos.splice(0, todos.length);
  render();
  saveToDo();
};

deleteAll.addEventListener("click", clearAllToDo);

// RENDER
const render = () => {
  ul.textContent = "";
  todos.forEach(({ title, id, completed }) => {
    // ADD li to ul
    const li = document.createElement("li");
    li.textContent = title;
    ul.appendChild(li);

    //DELETE li from ul
    const liDeleteButton = document.createElement("button");
    liDeleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    liDeleteButton.classList.add("deleteIcon");
    li.appendChild(liDeleteButton);

    liDeleteButton.id = id;
    liDeleteButton.onclick = deleteToDo;

    // // MARK li as done
    const checkbox = document.createElement("input");
    li.appendChild(checkbox);
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    checkbox.id = id;
    checkbox.onchange = done;

    if (checkbox.checked == true) {
      li.style.textDecoration = "line-through";
      checkbox.classList.add("tod");
    }
  });
  // Clear INPUT after added TODO
  inputTodo.value = "";
  // TOGGLE BUTTON AND MESSAGE DEPENDING HOW MANY TODOS ARE IN THE ARRAY
  if (li.length == 0) {
    displayDefault.style.display = "block";
    deleteAll.style.display = "none";
  } else if (li.length > 0) {
    displayDefault.style.display = "none";
    deleteAll.style.display = "block";
  }
  countTasks();
};
render();
