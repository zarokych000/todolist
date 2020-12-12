'use strict';

const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const control = document.querySelector('.control-panel');

for(let i = 0; localStorage.key(i); i++){
  const tempItem = document.createElement('li');
  tempItem.classList.add('tdl-item');
  const key = localStorage.key(i);
  const itemText = localStorage.getItem(key);
  tempItem.innerHTML = `
  <label>
    <input class="checkbox" type="checkbox">
    <span data-local='${key}' class="text">${itemText}</span>
    <img class="crist hide" src="./img/crist.png" alt="crist">
  </label>
  `;
  ul.insertBefore(tempItem, control);
  console.log('Ключ номер: ', i, localStorage.key(i));
  checkboxStroke(ul);
  deleteFromList(tempItem);
  counter();
}

counter();

input.addEventListener('change', (event) => {
  buildUl(event);
});
let obj = {};

function buildUl(event){
  const element = document.createElement('li');
  const key = (event.target.value).slice(0, 5);
  element.classList.add('tdl-item');
  element.innerHTML = `
    <label>
      <input class="checkbox" type="checkbox">
      <span data-local='${key}' class="text">${event.target.value}</span>
      <img class="crist hide" src="./img/crist.png" alt="crist">
    </label>
  `;

  ul.insertBefore(element, control);
  const panel = document.querySelector('.control-panel');
  panel.classList.remove('hide');
  checkboxStroke(ul);
  deleteFromList(element);
  counter();

  const todoitems = document.querySelectorAll('.tdl-item');
  todoitems.forEach((item, index) =>{
      localStorage.setItem(`${key}`, [index, event.target.value]);
  });

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
      localStorage.removeItem(event.target.previousElementSibling.dataset.local);

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
      localStorage.removeItem(item.firstElementChild.children[1].dataset.local);
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