const addForm = document.querySelector('[data-add-todo]');
const addInput = addForm.querySelector('[data-add-input]');
const activeList = document.querySelector('[data-active-list]');
const spanArrow = document.querySelector('[data-span-arrow]');
const inActiveList = document.querySelector('[data-inactive-list]');

const LOCAL_STORAGE_ACTIVE_LISTS = 'active.lists';
const LOCAL_STORAGE_INACTIVE_LISTS = 'inActive.lists';

let activeLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVE_LISTS)) || [];
let inActiveLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_INACTIVE_LISTS)) || [];

addForm.addEventListener('submit', event => {
   event.preventDefault();
   const listName = addInput.value;

   if (listName.trim() !== '') {
      const list = createNewList(listName);
      activeLists.push(list);
      saveAndRender();
   }
   addInput.value = '';
   addInput.focus();
});

function createNewList(name) {
   return { id: Date.now().toString(), name: name }
}

activeList.addEventListener('click', event => {
   const btnType = event.target.dataset.btn;

   const id = event.target.dataset.listId;

   if (btnType === 'delete') {
      activeLists = activeLists.filter(list => list.id !== id);
      saveAndRender();
   } else if (btnType === 'check') {
      const checkItem = activeLists.find(list => list.id === id);
      activeLists = activeLists.filter(list => list.id !== id);
      inActiveLists.push(checkItem);
      saveAndRender();
   }
});

inActiveList.addEventListener('click', event => {
   const btnType = event.target.dataset.btn;
   const id = event.target.dataset.listId;

   if (btnType === 'delete') {
      inActiveLists = inActiveLists.filter(list => list.id !== id);
      saveAndRender();      
   } else if (btnType === 'remove') {
      const checkItem = inActiveLists.find(list => list.id ===id);
      inActiveLists = inActiveLists.filter(list => list.id !== id);
      activeLists.unshift(checkItem);
      saveAndRender();
   }
});

spanArrow.addEventListener('click', event => {
   const arrow = spanArrow.querySelector('.arrowDown');
   arrow.classList.toggle('open');
   if (arrow.classList.contains('open')) {
      inActiveList.style.display = "block";
   } else {
      inActiveList.style.display = "none";
   }
});

function render() {
   clearElement(activeList);
   activeLists.forEach(list => {
      const listElement = document.createElement('li');

      const buttonCheck = document.createElement('button');
      buttonCheck.dataset.btn = 'check';
      buttonCheck.dataset.listId = list.id;
      buttonCheck.classList.add('buttonList', 'check');
      buttonCheck.innerHTML = `
      <svg data-btn='check' data-list-id = '${list.id}' viewBox="0 0 24 24" height="24" width="24">
         <path data-btn='check' data-list-id='${list.id}' d="M0 0h24v24H0z" fill="none" />
         <path data-btn='check' data-list-id='${list.id}' d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
      `;

      const buttonDelete = document.createElement('button');
      buttonDelete.dataset.btn = 'delete';
      buttonDelete.dataset.listId = list.id;
      buttonDelete.classList.add('buttonList', 'delete');
      buttonDelete.innerHTML = `
      <svg data-btn='delete' data-list-id='${list.id}' viewBox="0 0 24 24" height="24" width="24">
         <path data-btn='delete' data-list-id='${list.id}' d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
         <path data-btn='delete' data-list-id='${list.id}' d="M0 0h24v24H0z" fill="none" />
      </svg>
      `;

      listElement.dataset.listId = list.id;
      listElement.innerText = list.name;
      listElement.appendChild(buttonCheck);
      listElement.appendChild(buttonDelete);

      activeList.appendChild(listElement);

   });
}

function renderInActive() {
   clearElement(inActiveList);
   inActiveLists.forEach(list => {
      const listElement = document.createElement('li');

      const buttonRemove = document.createElement('button');
      buttonRemove.dataset.btn = 'remove';
      buttonRemove.dataset.listId = list.id;
      buttonRemove.classList.add('buttonList', 'remove');
      buttonRemove.innerHTML = `
      <svg data-btn='remove' data-list-id = '${list.id}' viewBox="0 0 24 24" height="24" width="24">
         <path data-btn='remove' data-list-id='${list.id}' d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
         <path data-btn='remove' data-list-id='${list.id}' d="M0 0h24v24H0z" fill="none" />
      </svg>
      `;

      const buttonDelete = document.createElement('button');
      buttonDelete.dataset.btn = 'delete';
      buttonDelete.dataset.listId = list.id;
      buttonDelete.classList.add('buttonList', 'delete');
      buttonDelete.innerHTML = `
      <svg data-btn='delete' data-list-id='${list.id}' viewBox="0 0 24 24" height="24" width="24">
         <path data-btn='delete' data-list-id='${list.id}' d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
         <path data-btn='delete' data-list-id='${list.id}' d="M0 0h24v24H0z" fill="none" />
      </svg>
      `;

      listElement.dataset.listId = list.id;
      listElement.innerText = list.name;
      listElement.appendChild(buttonRemove);
      listElement.appendChild(buttonDelete);

      inActiveList.appendChild(listElement);
   });
}

function saveAndRender() {
   save();
   render();
   renderInActive();
}

function save() {
   localStorage.setItem(LOCAL_STORAGE_ACTIVE_LISTS, JSON.stringify(activeLists));
   localStorage.setItem(LOCAL_STORAGE_INACTIVE_LISTS, JSON.stringify(inActiveLists));
}

function clearElement(element) {
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }
}

render();
renderInActive();