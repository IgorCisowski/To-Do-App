// enter 13
// imported HTML elements
const input = document.querySelector("input");
const h2 = document.querySelector("h2");
const ul = document.querySelector("ul");
const li = document.getElementsByTagName("li");
const addToDoButton = document.getElementById("div__input__button--addToDo");
const deleteAll = document.getElementById("deleteAll");
const displayDefault = document.getElementById("displayDefault");
const editDelete = document.getElementById("editDelete");
// save TODOs to local storage
const saveToDo = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
// variables id, flag, todos
let flag = false;
let id = 1;
let todos;
const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [];
}
// creating a todo and adding it to the list
const create = (title) => {
  todos.push({
    title: title,
    id: ++id,
  });

  saveToDo();
};
// filtering throughout the todos list and removing the clicked one
const remove = (idToDelete) => {
  todos = todos.filter((todo) => todo.id != idToDelete);

  saveToDo();
};
// taking the value of the input and assigning it to the object title
const addToDo = () => {
  const title = input.value;
  if (input.value == "") {
    alert("You need to add a new task!");
    return false;
  }
  create(title);
  render();
};
addToDoButton.addEventListener("click", addToDo);
//add todo by button===============================================================================
// const enter = (key) => {
//   if (key.keyCode === "13") {
//     create();
//   }
// };

// click target assigned to a vatiable so it detects the todo id
const deleteToDo = (e) => {
  const deleteLi = e.target;
  const idToDelete = deleteLi.id;

  remove(idToDelete);
  render();
};
// function for clearing all the todos in the array
const clearAllToDo = () => {
  todos.splice(0, todos.length);
  render();
  saveToDo();
};
deleteAll.addEventListener("click", clearAllToDo);
// =========================
// const checkToDo = (li, checkbox) => {
//   if (!flag) {
//     flag = !flag;
//     checkbox.textContent = "✓";
//     li.style.textDecoration = "line-through";
//     li.style.color = "#ffffffCC";
//   } else {
//     flag = !flag;
//     checkbox.textContent = "";
//     li.style.textDecoration = "none";
//     li.style.color = "#ffffff";
//   }
//   saveToDo();
// };

// rendering the todos from the list on the website
const render = () => {
  ul.textContent = "";
  todos.forEach(({ title, id }) => {
    const li = document.createElement("li");
    li.textContent = title;
    // EDIT TODO
    // const edit = document.createElement("button");
    // edit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    // edit.classList.add("ul__li__button__editToDo");
    // li.appendChild(edit);
    // edit.addEventListener("click", editTodo);
    // DELETE TODO
    const deleteLi = document.createElement("button");
    deleteLi.onclick = deleteToDo;
    deleteLi.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteLi.classList.add("ul__li__button__deleteToDo");
    deleteLi.id = id;
    li.appendChild(deleteLi);
    // MARKED AS DONE TODO
    const checkToDo = () => {
      if (!flag) {
        flag = !flag;
        checkbox.textContent = "✓";
        li.style.textDecoration = "line-through";
        li.style.color = "#ffffffCC";
      } else {
        flag = !flag;
        checkbox.textContent = "";
        li.style.textDecoration = "none";
        li.style.color = "#ffffff";
      }
      saveToDo();
    };
    const checkbox = document.createElement("button");
    checkbox.onclick = checkToDo;
    checkbox.classList.add("ul__li__button__doneToDo");
    li.appendChild(checkbox);
    // ------------------------------------------------------
    ul.appendChild(li);
  });
  // Reset the input value to none and keep count of todos in the list
  input.value = "";
  h2.textContent = `TODOS (${li.length})`;
  // displaying a clear all button + short note if ther's no todos
  if (li.length == 0) {
    displayDefault.style.display = "block";
    deleteAll.style.display = "none";
  } else if (li.length > 0) {
    displayDefault.style.display = "none";
    deleteAll.style.display = "block";
  }
};
render();
