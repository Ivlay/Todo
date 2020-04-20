const todo = document.getElementById('todo');
const ulActive = todo.querySelector('[data-lists]');
const ulInActive = todo.querySelector('[data-lists-checked]')
const newListForm = todo.querySelector('[data-list-form]');
const newListInput = newListForm.querySelector('[data-list-input]');


const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_CHECKED_LIST = 'task.checked'

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let checkedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHECKED_LIST)) || [];

todo.addEventListener('click', event => {
   const btnType = event.target.dataset.btn;

   if (btnType === 'checked') {
      const li = todo.querySelector('li');
      const id = li.dataset.listId;
      checkedList = id;
      saveAndRender();
   } else if (btnType === 'delete') {
      const li = todo.querySelector('li');
      const id = li.dataset.listId;
      lists = lists.filter(list => list.id !== id);
      saveAndRender();
   } else if (btnType === 'remove') {
      
   }
});

newListForm.addEventListener('submit', event => {
   event.preventDefault();
   const listName = newListInput.value;
   if (listName == null || listName === '' || listName === ' ') {
      newListInput.value = '';
      return
   }
   const list = createList(listName);
   newListInput.value = '';
   lists.push(list);
   saveAndRender();
});

function createList(name) {
   return { id: Date.now().toString(), title: name, checked: false };
}


function saveAndRender() {
   save();
   renderList();
}

function save() {
   localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
   localStorage.setItem(LOCAL_STORAGE_CHECKED_LIST, JSON.stringify(checkedList));
}

function render() {
   renderList();
   // if (selectedListId === null) {
   //    labelMenu.classList.add("none")
   // } else {
   //    labelMenu.classList.remove("none")
   //    labelMenu.classList.add("block")
   // }
}

function renderList() {
   clearElement(ulActive);
   lists.forEach(list => {
      const listElement = document.createElement('li');

      listElement.dataset.listId = list.id;
      listElement.innerText = list.title;

      ulActive.appendChild(listElement);

      if (list.id === checkedList) {
         clearElement(ulInActive);
         list.checked = true;
         ulInActive.appendChild(listElement);
      }

      const html = `
      ${list.checked ? `<button data-btn="remove" class="buttonList remove"><svg class="svgAdd" data-btn="remove"></svg>
      </button>` : `<button data-btn="checked" class="buttonList checked"><svg data-btn="checked" class="svgChecked"></svg>`}
      <button data-btn="delete" class="buttonList delete">
      <svg data-btn="delete" class="svgDelete"></svg>
      </button>`;
      listElement.insertAdjacentHTML('beforeend', html);

   })
}

function clearElement(element) {
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }
}
render();
