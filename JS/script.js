let input = document.querySelector("input[type='text']");
let ulActive = document.querySelector("ul.activeList");
let buttonAdd = document.getElementById("add");
let ulInActive = document.querySelector("ul.inActiveList");

const createTodo = (todo) => {
   let li = document.createElement("li");
   li.innerText = todo;

   let buttonCheck = document.createElement("button");
   buttonCheck.type = "submit";
   buttonCheck.classList = ("buttonList checked");
   buttonCheck.innerHTML = "<svg class='svgChecked'></svg>";

   let buttonDelete = document.createElement("button");
   buttonDelete.type = "submit";
   buttonDelete.classList = ("buttonList delete");
   buttonDelete.innerHTML = "<svg class='svgDelete'></svg>";


   li.appendChild(buttonCheck);
   li.appendChild(buttonDelete);
   return li;
}

const addTodo = () => {
   if (input.value && input.value !== " ") {
      let li = createTodo(input.value);
      ulActive.appendChild(li);
      bindTodoEvents(li, checkedTodo);
      input.value = "";
   }
}

function checkedTodo() {
   let li = this.parentNode;
   ulInActive.appendChild(li);
   let buttonChecked = document.querySelector("button.checked");
   buttonChecked.classList = ("buttonList remove");
   buttonChecked.innerHTML = "<svg class='svgAdd'></svg>"
   bindTodoEvents(li, removeTodo);
}

function removeTodo() {
   let li = this.parentNode;
   ulActive.appendChild(li);
   let removeButton = li.querySelector("button.remove");
   removeButton.classList = ("buttonList checked");
   removeButton.innerHTML = "<svg class='svgChecked'></svg>"
   bindTodoEvents(li, checkedTodo);
}

function deleteTodo() {
   let li = this.parentNode;
   let ul = li.parentNode;
   ul.removeChild(li);
}

function editTodo() {
   let editLi = this;
   let li = this.parentNode;
   console.log("1");
}

const bindTodoEvents = (li, buttonEvent) => {
   let chekedButton = li.querySelector("button.checked");
   let deleteButton = li.querySelector("button.delete");
   let editList = li;

   editList.ondblclick = editTodo;
   chekedButton.onclick = checkedTodo;
   deleteButton.onclick = deleteTodo;
}

input.addEventListener("keypress", (event) => {
   if (event.keyCode == 13) {
      addTodo();
      event.preventDefault();
   }
});

buttonAdd.addEventListener("click", (event) => {
   addTodo();
   event.preventDefault();
});

let textInactiv = document.querySelector("label.inActiveText");
textInactiv.addEventListener("click", (event) => {
   let icon = document.getElementsByClassName("inActiveIcon")[0];
   icon.classList.toggle("open");
});
