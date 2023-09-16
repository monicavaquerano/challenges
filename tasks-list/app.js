// Storage
let LIST;
let id;

// Elements
const dateDay = document.querySelector('#date-day');
const dateMonth = document.querySelector('#date-month');
const dateYear = document.querySelector('#date-year');
const dateText = document.querySelector('#date-text');

const dateHours = document.querySelector('#date-hours');
const dateMinutes = document.querySelector('#date-minutes');

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
    dateHours.textContent = date.toLocaleString('en-US', { hour: '2-digit' })
    dateMinutes.textContent = date.toLocaleString('en-US', { minute: '2-digit' })
}

const addNewTask = (id, task, done, eliminated) => {
    if (eliminated) { return }
    const DONE = done ? 'done' : '';
    const element = `<div class="task roundBorder ${DONE}">
                        <p contenteditable="false" data="editable">${task}</p>
                        <div class="icons">
                            <i id="${id}" data="done" class="${check}"></i>
                            <i id="${id}" data="eliminated" class="${trash}"></i>
                        </div>
                    </div>`
    tasksContainer.insertAdjacentHTML('beforeend', element);
}

const changeTaskState = element => {
    console.log(element.parentNode.parentNode.classList)
    element.parentNode.parentNode.classList.toggle('done');
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

const eliminateTask = element => {
    console.log(element.parentNode.parentNode);
    element.parentNode.parentNode.remove();

    LIST[element.id].eliminated = true;
}

const editTask = element => {
    if (!element.parentNode.classList.contains('done')) {
        const task = element;
        task.classList.add('editing');
        task.contentEditable = true;
        task.focus()

        LIST[element.id].task = task.innerText;
    }
}

const focusOut = element => {
    const task = element;
    if (!task.innerText == '') {
        task.contentEditable = false;
        task.classList.remove('editing');

        console.log(`Con focus out: ${task.innerText}`);
        LIST[element.id].task = task.innerText;

    } else {
        task.innerText = "It can't be an empty task"
        window.alert("It can't be an empty task");
    }
}

const skipJump = element => {
    // element.preventDefault();
    const task = element;
    task.blur();
    task.contentEditable = false;
    task.classList.remove('editing');

    console.log(`Con enter: ${task.innerText}`);
    LIST[element.id].task = task.innerText;
}


// const changeTaskState = event => {
//     event.target.parentNode.parentNode.classList.toggle('done');
// }


// const addNewTask = event => {
//     event.preventDefault();
//     const { value } = event.target.taskInput
//     if (!value) return;
//     const task = document.createElement('div')
//     task.setAttribute('id', id);

//     id++;

//     task.classList.add('task', 'roundBorder');
//     // task.addEventListener('click', changeTaskState)

//     const taskText = document.createElement('p')
//     taskText.textContent = value;

//     // Edit (Ver como sacar esto de acá)
//     taskText.addEventListener('dblclick', editTask);
//     taskText.addEventListener('focusout', focusOut);
//     taskText.addEventListener('keydown', skipJump);

//     task.appendChild(taskText)

//     let icons = document.createElement('div');
//     icons.classList.add('icons');

//     task.appendChild(icons);

//     let done = document.createElement('i');
//     done.classList.add('bi', 'bi-check-square-fill', 'i-done');
//     // Done
//     done.addEventListener('click', changeTaskState)

//     let eliminate = document.createElement('i');
//     eliminate.classList.add('bi', 'bi-trash3-fill', 'i-eliminate');
//     // Eliminate
//     eliminate.addEventListener('click', eliminateTask)

//     icons.append(done, eliminate);

//     tasksContainer.prepend(task);

//     event.target.reset();
//     // LIST.push({
//     //     task: taskText.textContent,
//     //     id: id,
//     // });
//     // console.log(LIST);
// }

// const eliminateTask = event => {
//     let task = event.target.parentNode.parentNode;
//     task.remove();
// }
// const editTask = event => {
//     if (!event.target.parentNode.classList.contains('done')) {
//         const task = event.target;
//         task.classList.add('editing');
//         task.contentEditable = true;
//         task.focus()
//     }
// }

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
    console.log(task.value)
    if (task.value) {
        addNewTask(id, task.value, false, false);
        LIST.push({
            id: id,
            task: task,
            done: false,
            eliminated: false,
        });
        localStorage.setItem('toDoList', JSON.stringify(LIST));
        id++;
        task.value = '';
    }
});

orderBtn.addEventListener('click', () => {
    console.log("ordenando...");
    order();
    renderOrderedTasks();
    console.log("ya ordene")
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
        console.log("Me editan!!!");
        editTask(element);
    }
    else {
        console.log("Aquí no hago nada :(");
    }

    localStorage.setItem('toDoList', JSON.stringify(LIST));
});

tasksContainer.addEventListener('focusout', (event) => {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData == 'editable') {
        console.log("Me editaron con focusout!!!");
        focusOut(element);
    }
    else {
        console.log("Aquí no hago nada :(");
    }

    localStorage.setItem('toDoList', JSON.stringify(LIST));
});

tasksContainer.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        const element = event.target;
        const elementData = element.attributes.data.value;

        if (elementData == 'editable') {
            console.log("Presionaron enter!!!");
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




// let data = localStorage.getItem('toDoList');
// if (data) {
//     LIST = JSON.parse(data);
//     console.log(LIST);
//     id = LIST.length;
//     loadList(LIST);
// }

// function loadList(arr) {
//     arr.forEach(function (item) {
//         addNewTask(item.id, item.task, item.done, item.eliminated);
//     })
// }