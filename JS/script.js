const todo = document.getElementById('todo');
const form = todo.querySelector('.addForm');
const input = form.querySelector('#input_form');
const submitBtn = form.querySelector('#add');
const ulActive = todo.querySelector('.activeList');

const ulInActive = todo.querySelector('.inActiveList');

form.addEventListener('submit', submitFormHandler);
const toDoItems = [];
const toDo = {id: 1};

function submitFormHandler(event) {
   event.preventDefault();

   if (input.value && input.value !== ' ') {
      toDo.text = input.value;
      toDo.checked = true;
      toDoItems.push(toDo);
      console.log(toDo.checked);
      renderActive();
   }
   input.value = '';
}

todo.addEventListener('click', event => {

   let btnType = event.target.dataset.btn;
   let li = todo.querySelector('li');

   if (btnType === 'delete') {
      li.parentNode.removeChild(li);
   } else if (btnType === 'checked') {
      checkedTodo(toDo);
   } else if (btnType === 'remove') {
      removeTodo(toDo)
      console.log('remove');
   }
});

function removeTodo(toDo) {
   toDo.checked = true;
   let li = ulInActive.querySelector('li');
   ulActive.appendChild(li);
   renderActive();
}

function checkedTodo(toDo) {
   toDo.checked = false;
   let li = ulActive.querySelector('li');
   ulInActive.appendChild(li);
   render();
}

const toHtml = toDo => `
   <li data-id="${toDo.id}">${toDo.text}
   <button type="submit" ${toDo.checked ? ` class="buttonList checked" data-btn="checked"> <svg data-btn="checked" class="svgChecked"></svg></button>` : `<button type="submit" class="buttonList remove" data-btn="remove"><svg class="svgAdd" data-btn="remove"></svg>
   </button>`}
   </button>
   <button type="submit" data-btn="delete" class="buttonList delete">
   <svg data-btn="delete" class="svgDelete"></svg>
   </button>
   </li>`;

function renderActive () {
   ulActive.innerHTML = toDoItems.map(toHtml).join('');
}
function render () {
   ulInActive.innerHTML = toDoItems.map(toHtml).join('');
}