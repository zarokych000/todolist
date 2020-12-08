'use strict';

const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const control = document.querySelector('.control-panel');

counter();

input.addEventListener('change', (event) => {
    buildUl(event);
});

function buildUl(event){
    const element = document.createElement('li');
    element.classList.add('tdl-item');
    element.innerHTML = `
        <input class="checkbox" type="checkbox">${event.target.value}
        <img class="crist hide" src="./img/crist.png" alt="crist">
    `;
    ul.insertBefore(element, control);
    event.target.value = '';
    let parent = event.target.parentElement.parentElement;
    const panel = document.querySelector('.control-panel');
    panel.classList.remove('hide');
    checkboxStroke(parent);
    deleteFromList(element);
    counter();
}

function deleteFromList(element){
    const cros = document.querySelectorAll('.crist');
    element.addEventListener('mouseenter', (e) =>{
        e.target.lastElementChild.classList.remove('hide');
    });
    element.addEventListener('mouseleave', (e) =>{
        e.target.lastElementChild.classList.add('hide');
    });
    cros.forEach((item) =>{
        item.addEventListener('click', (event) =>{
            event.target.parentElement.remove();
            counter();
        });
    });
}

function checkboxStroke(){
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(item =>{
        item.addEventListener('change', (e) =>{
            if(e.target.checked){
                e.target.parentElement.classList.add('pop');
                counter();
            } else{
                e.target.parentElement.classList.remove('pop');
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
        if(!item.classList.contains('hide') && item.firstElementChild.checked == false){
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