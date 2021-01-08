function todo(){

  const input = document.querySelector('.input');
  const ul = document.querySelector('.ul');
  const control = document.querySelector('.control-panel');
  const btnComplete = document.querySelector('.complete');
  const btnActive = document.querySelector('.active');
  const btnAll = document.querySelector('.all');
  const btnClearCompleted = document.querySelector('.clear');

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

    initializeChanging();
    event.target.value = '';
    checkboxStroke();
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
        console.log();
        saveOrDelCheked(event.target.previousElementSibling, false, false);
        removeFromStorage(event.target.parentElement.nextElementSibling.dataset.local);
        converseToStorage();
        event.target.parentElement.parentElement.remove();
        counter();
      });
    });
  }


  function checkboxStroke(){
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(item =>{
      ifCheked(item);
      item.addEventListener('change', (e) =>{
        if(e.target.checked){
          e.target.parentElement.parentElement.classList.add('pop');
          showClearCompleted();
          counter();
          saveOrDelCheked(e.target, true, true);
        } else{
          e.target.parentElement.parentElement.classList.remove('pop');
          showClearCompleted();
          counter();
          saveOrDelCheked(e.target, true, false);
        }
        counter();
      }, false);
    });
  }


  function counter(some){
    const counter = document.querySelector('.counter');
    const items = document.querySelectorAll('.tdl-item');
    const number = [];
    items.forEach(item =>{
      if(btnAll.classList.contains('active-btn')){
        number.push(item);
      } else if(btnComplete.classList.contains('active-btn')){
        if(item.classList.contains('pop')){
          number.push(item);
        }
      } else if(btnActive.classList.contains('active-btn')){
        if(!item.classList.contains('hide') && item.firstElementChild.firstElementChild.checked == false){
            number.push(item);
        } 
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
      for(let [key, index] of Object.entries(storage)){
        res.push(index);
        for(let i = 0; i < res.length; i++){
          if(i != (res.length - 1)){
            continue;
          }
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
      <img class="crist hide" src="./img/crist.png" alt="crist">
    </label>
    <span data-local='${key}' class="text">${text}</span>
    `;
    ul.insertBefore(element, control);
    checkboxStroke(ul);
    deleteFromList(element);
    counter();
    initializeChanging();
  }

  function removeFromStorage(key){
    localStorage.removeItem(key);
    delete storage[key];
  }

  function converseToStorage(){
    let convers = JSON.stringify(storage);
    localStorage.setItem(`Ukey`, convers);
  }

  function changeText(e){
    const typus = document.createElement('input');
    let tdl = e.target.parentElement;
    typus.classList.add('changer');
    typus.value = `${tdl.lastElementChild.textContent}`;
    tdl.firstElementChild.style.display = 'none';
    tdl.lastElementChild.style.display = 'none';
    let span = tdl.lastElementChild.dataset.local;
    let index = storage[tdl.lastElementChild.dataset.local];
    tdl.append(typus);
    closeChangeInput(typus, e.target.parentElement, e.target.parentElement);
    typus.addEventListener('change', (e) =>{
      tdl.children[1].textContent = `${typus.value}`;
      storage[span] = index;
      localStorage.setItem(span, typus.value);
      converseToStorage();
      tdl.firstElementChild.style.display = 'block';
      tdl.children[1].style.display = 'block';
      e.target.remove();
      initializeChanging();
    });
  }

  function closeChangeInput(closingItem, retrieved, returned){
    document.addEventListener('keydown', (e) =>{
      if(e.code === 'Escape' && closingItem){
        closingItem.remove();
        retrieved.firstElementChild.style.display = 'block';
        returned.lastElementChild.style.display = 'block';
        initializeChanging();
      }
    });

    document.addEventListener('click', (event) => {
      if(event.target != closingItem){
        closingItem.remove();
        retrieved.firstElementChild.style.display = 'block';
        returned.lastElementChild.style.display = 'block';
        initializeChanging();
      }
    });
  }

  btnAll.addEventListener('click', () => showAll());
  function showAll(){
    const localTdl = document.querySelectorAll('.tdl-item');
    localTdl.forEach((item, index) =>{
      item.classList.remove('hide');
      counter();
    });
  }

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

  function showClearCompleted(){
    const tdItem = document.querySelector('.tdl-item.pop');
    if(tdItem){
      btnClearCompleted.classList.remove('hide');
    } else {
      btnClearCompleted.classList.add('hide');
    }
  }


  btnClearCompleted.addEventListener('click', () =>{
    const localItems = document.querySelectorAll('.tdl-item');
    localItems.forEach(item =>{
      if(item.classList.contains('pop')){
        saveOrDelCheked(item.firstElementChild.firstElementChild, true, false);
        removeFromStorage(item.lastElementChild.dataset.local);
        converseToStorage();
        item.remove();
        counter();
      }
    });
  });

  const arrow = document.querySelector('.arrow');
  const arrowCache = [false];
  arrow.addEventListener('click', () =>{
    const all = document.querySelectorAll('.checkbox');
    all.forEach(item =>{
      if(arrowCache[arrowCache.length - 1]){
        item.checked = false;
        item.parentElement.parentElement.classList.remove('pop');
      } else {
        item.checked = true;
        item.parentElement.parentElement.classList.add('pop');
      }
    });
    if(arrowCache[arrowCache.length - 1]){
      arrowCache.push(false);
    } else {
      arrowCache.push(true);
    }
  });


  function initializeChanging(){
    const todoI = document.querySelectorAll('.tdl-item .text');
    todoI.forEach(item =>{
      item.addEventListener('dblclick', changeText, {
        once: true
      });
      item.addEventListener('selectstart', (event) =>{
        event.preventDefault();
      });
    });
  }


  const controlBlok = document.querySelector('.control-block');

  const btns = controlBlok.querySelectorAll('button');
  btns.forEach(item => {
    item.addEventListener('click', (e) =>{
      btns.forEach(item => item.classList.remove('active-btn'));
      e.target.classList.toggle('active-btn');
      counter();
    });
  });

  function saveOrDelCheked(target, boolean, switcher){
    let parent = target.parentElement.parentElement;
    let id = `${parent.lastElementChild.dataset.local}isChecked`;
    if(switcher){
      if(!localStorage.getItem(id)){
        localStorage.setItem(id, boolean);
      }
    } else {
      localStorage.removeItem(id);
    }
  }

  function ifCheked(target){
    let parent = target.parentElement.parentElement;
    let id = `${parent.lastElementChild.dataset.local}isChecked`;
    if(localStorage.getItem(id)){
      target.checked = true;
      target.parentElement.parentElement.classList.add('pop');
      showClearCompleted();
    }
  }
}

export default todo;