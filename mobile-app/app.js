import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-fda0b-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

// Elements
const inputField = document.querySelector('#input-field');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#shopping-list');

// Events
onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val());
        clearShoppingList();
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i];
            appendItemToList(currentItem);
        }
    } else {
        list.innerHTML = '<div class="container" style="margin-top: 25px;"><strong>No items here... yet.</strong></div>';
    }
});

addBtn.addEventListener('click', () => {
    let inputValue = inputField.value;
    if (inputValue) {
        push(shoppingListInDB, inputValue);
        clearInputField();
    }
});

inputField.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        let inputValue = inputField.value;
        if (inputValue) {
            push(shoppingListInDB, inputValue);
            clearInputField();
        }
    }
});

// Funtions
function appendItemToList(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let itemEl = document.createElement('div');
    itemEl.classList.add('list-item');
    itemEl.textContent = itemValue;

    itemEl.addEventListener('dblclick', () => {
        deleteItem(itemID);
    });

    list.appendChild(itemEl);
}

function clearInputField() {
    inputField.value = '';
}
function clearShoppingList() {
    list.innerHTML = '';
}

function deleteItem(itemID) {
    let exactLocationInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationInDB);
}