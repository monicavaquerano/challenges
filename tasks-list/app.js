// Storage
let LIST;
let id;

// Elements
const dateDay = document.querySelector('#date-day');
const dateMonth = document.querySelector('#date-month');
const dateYear = document.querySelector('#date-year');
const dateText = document.querySelector('#date-text');

const dateHours = document.querySelector('#date-hours');

const addTaskForm = document.querySelector('form');
const orderBtn = document.querySelector("#btn-order");

const check = 'bi bi-check-square-fill i-done';
const trash = 'bi bi-trash3-fill i-eliminate';

const tasksContainer = document.querySelector('#tasks');

// Functions
const setDate = () => {
    const date = new Date();
    dateDay.textContent = date.toLocaleString('en-US', { day: 'numeric' });
    dateMonth.textContent = date.toLocaleString('en-US', { month: 'short' });
    dateYear.textContent = date.toLocaleString('en-US', { year: 'numeric' })
    dateText.textContent = date.toLocaleString('en-US', { weekday: 'long' })
    dateHours.textContent = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const addNewTask = (id, task, done, eliminated) => {
    if (eliminated) { return }
    const DONE = done ? 'done' : '';
    const element = `<div class="task roundBorder ${DONE}">
                        <p id="${id}" contenteditable="false" data="editable">${task}</p>
                        <div class="icons">
                            <i id="${id}" data="done" class="${check}"></i>
                            <i id="${id}" data="eliminated" class="${trash}"></i>
                        </div>
                    </div>`
    tasksContainer.insertAdjacentHTML('beforeend', element);
}

const changeTaskState = element => {
    element.parentNode.parentNode.classList.toggle('done');
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

const eliminateTask = element => {
    element.parentNode.parentNode.remove();
    LIST[element.id].eliminated = true;
}

const editTask = element => {
    if (!element.parentNode.classList.contains('done')) {
        element.classList.add('editing');
        element.contentEditable = true;
        element.focus()
    }
}

const focusOut = element => {
    if (!element.innerText == '') {
        element.contentEditable = false;
        element.classList.remove('editing');
        LIST[element.id].task = element.innerText;
    } else {
        element.innerText = "It can't be an empty task"
        window.alert("It can't be an empty task");
    }
}

const skipJump = element => {
    element.blur();
    element.contentEditable = false;
    element.classList.remove('editing');
}

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el));
}

// Events
setDate();

window.setInterval(setDate, 1000);

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = document.querySelector('input');
    if (task.value) {
        addNewTask(id, task.value, false, false);
        LIST.push({
            id: id,
            task: task.value,
            done: false,
            eliminated: false,
        });
        localStorage.setItem('toDoList', JSON.stringify(LIST));
        id++;
        task.value = '';
    }
});

orderBtn.addEventListener('click', () => {
    order();
    renderOrderedTasks();
})

tasksContainer.addEventListener('click', (event) => {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData == 'done') {
        changeTaskState(element);
    }
    else if (elementData == 'eliminated') {
        eliminateTask(element);
    }
    else if (elementData == 'editable') {
        editTask(element);
    }
    localStorage.setItem('toDoList', JSON.stringify(LIST));
});

tasksContainer.addEventListener('focusout', (event) => {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData == 'editable') {
        focusOut(element);
    }
    localStorage.setItem('toDoList', JSON.stringify(LIST));
});

tasksContainer.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        const element = event.target;
        const elementData = element.attributes.data.value;

        if (elementData == 'editable') {
            skipJump(element);
        }
        localStorage.setItem('toDoList', JSON.stringify(LIST));
    }
});

// Local Storage
let data = localStorage.getItem('toDoList')
if (data) {
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    id = 0
}

function loadList(array) {
    array.forEach(function (item) {
        addNewTask(item.id, item.task, item.done, item.eliminated)
    })
}
