document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const taskInput = document.querySelector('#task-input');
    const btnTask = document.querySelector('#btn-task');
    const tasks = document.querySelector('#tasks');

    btnTask.disabled = true;

    taskInput.onkeyup = () => {
        if (taskInput.value.length > 0) {
            btnTask.disabled = false;
        } else {
            btnTask.disabled = true;
        }
    }

    // Events
    // Load tasks event
    window.addEventListener('load', loadTasks);
    // Add tasks events
    btnTask.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    // Save tasks before leaving event
    // window.addEventListener('beforeunload', saveTasks);

    // PREUABAAAAAA
    const savedTasks = localStorage.getItem('savedTaskList');
    if (savedTasks) {
        const taskList = document.getElementById('tasks');

        const text = document.getElementsByClassName('txt');
        const doneBtn = document.getElementsByClassName('done');
        const eliminateBtn = document.getElementsByClassName('eliminate');

        taskList.innerHTML = savedTasks;

        console.log(taskList);
        console.log(savedTasks);
        console.log(text[0].innerText);
        console.log(doneBtn)
        console.log(doneBtn.length)

        for (const done of doneBtn) {

            console.log(done)
            done.addEventListener('click', function (e) { console.log("aaaaaaaaaaaaaaaaaaaaffffffff") })
        }
    }

    // FIN PRUEBAAAA



    // Functions
    function addTask() {
        if (taskInput.value) {
            let newTask = document.createElement('div');
            newTask.classList.add('task');

            let text = document.createElement('p');
            // Revisar esto 
            text.classList.add('txt');
            text.contentEditable = false;
            text.innerText = taskInput.value;
            newTask.appendChild(text);

            // Edit
            text.addEventListener('dblclick', editTask);
            text.addEventListener('focusout', (e) => {
                const task = e.target;
                task.contentEditable = false;
                task.classList.remove('editing');
            });
            text.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const task = e.target;
                    task.blur(); // Quita el enfoque para evitar el salto de línea
                    task.contentEditable = false;
                    task.classList.remove('editing');
                }
            });

            let icons = document.createElement('div');
            icons.classList.add('icons');
            newTask.appendChild(icons);

            let done = document.createElement('i');
            done.classList.add('bi', 'bi-check-square-fill', 'i-done', 'done');
            // Done
            done.addEventListener('click', completeTask)

            let eliminate = document.createElement('i');
            eliminate.classList.add('bi', 'bi-trash3-fill', 'i-eliminate', 'eliminate');
            // Eliminate
            eliminate.addEventListener('click', eliminateTask);

            icons.append(done, eliminate);

            tasks.appendChild(newTask);

            saveTasks()

            taskInput.value = '';
            btnTask.disabled = true;

        } else {
            alert('Prompt a task.')
        }
    }

    function completeTask(e) {
        let task = e.target.parentNode.parentNode;
        task.classList.toggle('done');
    }

    function eliminateTask(e) {
        let task = e.target.parentNode.parentNode;
        task.remove();
    }

    function editTask(e) {
        let task = e.target;
        task.classList.add('editing');
        task.contentEditable = true;
        task.focus()
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('savedTaskList');
        if (savedTasks) {
            const taskList = document.getElementById('tasks');
            taskList.innerHTML = savedTasks;
            console.log(taskList)

        }
    }

    function saveTasks() {
        const taskList = document.getElementById('tasks').innerHTML;
        localStorage.setItem('savedTaskList', taskList);

    }
});