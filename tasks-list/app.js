// Storage
let LIST;
let id;

// Elements Date
const dateDay = document.querySelector('#date-day');
const dateMonth = document.querySelector('#date-month');
const dateYear = document.querySelector('#date-year');
const dateText = document.querySelector('#date-text');

const dateHours = document.querySelector('#date-hours');
const dateMinutes = document.querySelector('#date-minutes');

// Task Container
const tasksContainer = document.querySelector('#tasks');

// Tasks


// Buttons
const addTaskBtn = document.querySelector("#btn-task");



// Functions
const setDate = () => {
    const date = new Date();
    dateDay.textContent = date.toLocaleString('en-US', { day: 'numeric' });
    dateMonth.textContent = date.toLocaleString('en-US', { month: 'short' });
    dateYear.textContent = date.toLocaleString('en-US', { year: 'numeric' })
    dateText.textContent = date.toLocaleString('en-US', { weekday: 'long' })
    dateHours.textContent = date.toLocaleString('en-US', { hour: '2-digit' })
    dateMinutes.textContent = date.toLocaleString('en-US', { minute: '2-digit' })
}

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskInput
    if (!value) return;
    const task = document.createElement('div')
    task.setAttribute('id', id);

    id++;

    task.classList.add('task', 'roundBorder');
    // task.addEventListener('click', changeTaskState)

    const taskText = document.createElement('p')
    taskText.textContent = value;

    // Edit (Ver como sacar esto de acá)
    taskText.addEventListener('dblclick', editTask);
    taskText.addEventListener('focusout', focusOut);
    taskText.addEventListener('keydown', skipJump);

    task.appendChild(taskText)

    let icons = document.createElement('div');
    icons.classList.add('icons');

    task.appendChild(icons);

    let done = document.createElement('i');
    done.classList.add('bi', 'bi-check-square-fill', 'i-done');
    // Done
    done.addEventListener('click', changeTaskState)

    let eliminate = document.createElement('i');
    eliminate.classList.add('bi', 'bi-trash3-fill', 'i-eliminate');
    // Eliminate
    eliminate.addEventListener('click', eliminateTask)

    icons.append(done, eliminate);

    tasksContainer.prepend(task);

    event.target.reset();
    // LIST.push({
    //     task: taskText.textContent,
    //     id: id,
    // });
    // console.log(LIST);
}

const editTask = event => {
    if (!event.target.parentNode.classList.contains('done')) {
        const task = event.target;
        task.classList.add('editing');
        task.contentEditable = true;
        task.focus()
    }
}

const focusOut = event => {
    const task = event.target;
    task.contentEditable = false;
    task.classList.remove('editing');
}

const skipJump = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = event.target;
        task.blur();
        task.contentEditable = false;
        task.classList.remove('editing');
    }
}

const changeTaskState = event => {
    event.target.parentNode.parentNode.classList.toggle('done');
}

const eliminateTask = event => {
    let task = event.target.parentNode.parentNode;
    task.remove();
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
addTaskBtn.addEventListener('click', () => {
    console.log("moco");
});