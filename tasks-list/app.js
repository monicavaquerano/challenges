
// Elements Date
const dateDay = document.querySelector('#date-day');
const dateMonth = document.querySelector('#date-month');
const dateYear = document.querySelector('#date-year');
const dateText = document.querySelector('#date-text');

const dateHours = document.querySelector('#date-hours');
const dateMinutes = document.querySelector('#date-minutes');

// Task Container
const tasksContainer = document.querySelector('#tasks');

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
    task.classList.add('task', 'roundBorder');
    // task.addEventListener('click', changeTaskState)

    const taskText = document.createElement('p')
    taskText.textContent = value;
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
}


const changeTaskState = event => {
    event.target.parentNode.parentNode.classList.toggle('done');
}

const eliminateTask = event => {
    event.target.parentNode.parentNode.classList.toggle('eliminate');
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
