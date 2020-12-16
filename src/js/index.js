'use strict';

const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const control = document.querySelector('.control-panel');
let storage = {};
let max = 0;

if(localStorage.getItem('Ukey')){
  storage = JSON.parse(localStorage.getItem('Ukey'));
  recount();
}

for(let j = 0; j <= max ; j++){
  for(let [key ,index] of Object.entries(storage)){
    if(index == j){
        let inner = localStorage.getItem(key);
        printList(key, inner);
    }
  }
}

counter();

input.addEventListener('change', (event) => {
  buildUl(event);
});

function buildUl(event){
  const key = (event.target.value).slice(0, 8);
  printList(key, event.target.value);
  const panel = document.querySelector('.control-panel');
  panel.classList.remove('hide');
  const todoitems = document.querySelectorAll('.tdl-item');
  todoitems.forEach((item, index) =>{
    storage[key] = (index);
    converseToStorage();
    recount();
  });

  localStorage.setItem(`${key}`, event.target.value);

  event.target.value = '';
}

function deleteFromList(element){
  const cros = document.querySelectorAll('.crist');
  element.addEventListener('mouseenter', (e) =>{
    e.target.firstElementChild.lastElementChild.classList.remove('hide');
  });
  element.addEventListener('mouseleave', (e) =>{
    e.target.firstElementChild.lastElementChild.classList.add('hide');  
  });
  cros.forEach((item) =>{
    item.addEventListener('click', (event) =>{
      removeFromStorage(event.target.previousElementSibling.dataset.local);
      converseToStorage();
      event.target.parentElement.parentElement.remove();
      counter();
    });
  });
}

function checkboxStroke(){
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(item =>{
    item.addEventListener('change', (e) =>{
      if(e.target.checked){
        e.target.parentElement.parentElement.classList.add('pop');
        counter();
      } else{
        e.target.parentElement.parentElement.classList.remove('pop');
        counter();
      }
      counter();
    });
  });
}

function counter(some){
  const counter = document.querySelector('.counter');
  const items = document.querySelectorAll('.tdl-item');
  const number = [];
  items.forEach(item =>{
    if(!item.classList.contains('hide') && item.firstElementChild.firstElementChild.checked == false){
        number.push(item);
    } else if(some && item.classList.contains('pop')){
      number.push(item);
    }
  });
  const counts = document.createElement('span');
  counts.innerHTML = `${number.length}`;
  counter.prepend(counts);
  const tempus = counter.querySelectorAll('span');
  if(tempus.length >= 2){
    counter.removeChild(tempus[1]);
  }
  const panel = document.querySelector('.control-panel');
  if(items.length == 0){
    panel.classList.add('hide');
  }
}

function recount(){
  let res = [];
    for(let [key ,index] of Object.entries(storage)){
      res.push(index);
      for(let i = 0; i < res.length; i++){
        storage[key] = i;
      }
      converseToStorage();
    }

  max = Math.max(...res);
}

function printList(key, text){
  const element = document.createElement('li');
  element.classList.add('tdl-item');
  element.innerHTML = `
  <label>
    <input class="checkbox" type="checkbox">
    <span data-local='${key}' class="text">${text}</span>
    <img class="crist hide" src="./img/crist.png" alt="crist">
  </label>
  `;
  ul.insertBefore(element, control);
  checkboxStroke(ul);
  deleteFromList(element);
  counter();
}

function removeFromStorage(key){
  localStorage.removeItem(key);
  delete storage[key];
}

function converseToStorage(){
  let convers = JSON.stringify(storage);
  localStorage.setItem(`Ukey`, convers);
}

const btnAll = document.querySelector('.all');
btnAll.addEventListener('click', () => showAll());
function showAll(){
  const localTdl = document.querySelectorAll('.tdl-item');
  localTdl.forEach((item, index) =>{
    item.classList.remove('hide');
    counter();
  });
}

const btnActive = document.querySelector('.active');
btnActive.addEventListener('click', () =>{
  const localTdl = document.querySelectorAll('.tdl-item');
  localTdl.forEach(item =>{
    if(item.classList.contains('pop')){
      item.classList.add('hide');
      counter();
    } else{
      item.classList.remove('hide');
      counter();
    }
  });
});

const btnComplete = document.querySelector('.complete');
btnComplete.addEventListener('click', () =>{
  const localTdl = document.querySelectorAll('.tdl-item');
  localTdl.forEach(item =>{
    if(item.classList.contains('pop')){
      item.classList.remove('hide');
      counter(1);
    } else{
      item.classList.add('hide');
      counter(1);
    }
  });
});

const btnClearCompleted = document.querySelector('.clear');
btnClearCompleted.addEventListener('click', () =>{
  const localItems = document.querySelectorAll('.tdl-item');
  localItems.forEach(item =>{
    if(item.classList.contains('pop')){
      removeFromStorage(item.firstElementChild.children[1].dataset.local);
      converseToStorage();
      item.remove();
      counter();
    }
  });
});

const arrow = document.querySelector('.arrow');
arrow.addEventListener('click', () =>{
  const all = document.querySelectorAll('.checkbox');
  all.forEach(item =>{
  if(item.checked == true){
    item.checked = false; 
    item.parentElement.classList.remove('pop');
    counter();
  } else{
    item.checked = true;
    item.parentElement.classList.add('pop');
    counter();
  }
  });
});