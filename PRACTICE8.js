// CHAPTER 95 /97 /98/ 99/ 100/ 101/ 102/ 103/ 104/ 105/ 106 
// CHAPTER 96 Is SETTING a GITHUB 


const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}


function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem =  itemInput.value;

    // Validate Input 
    if (newItem === '') {
      alert('Please add an item');
      return;
    }
     
    // Check for edit mode 
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('This Item Already Exists!');
            return;
        }
    }
    
    // Create item DOM element 
    addItemToDom(newItem);

    // Add item to local Storage 
    addItemToStorage(newItem);

    checkUI();
    itemInput.value = '';
}


function addItemToDom (item) {
    console.log(item);
    // CREATE LIST ITEM 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode (item));

    const button = creteButton('remove-item btn-link text-red');
    li.appendChild(button);

    // ADD LI TO THE DOM 
    itemList.appendChild(li);
}



function creteButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}


function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


function addItemToStorage (item) {
    const itemsFromStorage = getItemsFromStorage();


    // add New item to array 
    itemsFromStorage.push(item);

    // convert to JSON string and set to local storage 
    localStorage.setItem('item',JSON.stringify (itemsFromStorage));
}


function getItemsFromStorage() {
    let itemsFromStorage;
    
    if (localStorage.getItem('item') === null) {
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse (localStorage.getItem('item'));
    }
    
    return itemsFromStorage
}
// localStorage.removeItem('item');


function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }

}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228b22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
   if(confirm('Are You Sure?')){

    // Remove item from DOM 
    item.remove();

    // Remove item ffrom Storage
    removeItemFromStorage (item.textContent); 

    checkUI();
   }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed 
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to localStorage 
    localStorage.setItem('item', JSON.stringify(itemsFromStorage));
}


function clearItems () {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from localStorage 
    localStorage.removeItem('item');
    checkUI();
}


function filterItems (e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

       if (itemName.indexOf(text)!= -1) {
        item.style.display = 'flex';
    }else{
        item.style.display = 'none';
       }
    });
}

function checkUI () {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if (items.length === 0 ) {
     clearBtn.style.display = 'none';
     itemFilter.style.display = 'none';
    } else {
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
     }

formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
formBtn.style.backgroundColor = '#333';

     isEditMode = false;
}


//Initialize app
function init() {

// Event Listners 
itemForm.addEventListener('submit', onAddItemSubmit); 
itemList.addEventListener('click', onClickItem); 
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}
init();



