import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    dataBaseURL: "https://playground-fda0b-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings);
// const db = getDatabase();

// Elements
const inputField = document.querySelector('#input-field');
const addBtn = document.querySelector('#add-btn');

// Events
addBtn.addEventListener('click', () => {
    let inputValue = inputField.value;
    console.log(`${inputValue} added to database`);
    inputField.value = '';
});

inputField.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        let inputValue = inputField.value;
        console.log(`${inputValue} added to database`);
        inputField.value = '';
    }
});
