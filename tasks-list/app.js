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
    btnTask.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Functions
    function addTask() {
        if (taskInput.value) {
            let newTask = document.createElement('div');
            newTask.classList.add('task');

            let text = document.createElement('p');
            text.innerText = taskInput.value;
            newTask.appendChild(text);

            let icons = document.createElement('div');
            icons.classList.add('icons');
            newTask.appendChild(icons);

            let done = document.createElement('i');
            done.classList.add('bi', 'bi-check-square-fill', 'i-done');
            done.addEventListener('click', completeTask)

            let eliminate = document.createElement('i');
            eliminate.classList.add('bi', 'bi-trash3-fill', 'i-eliminate');
            eliminate.addEventListener('click', eliminateTask);

            icons.append(done, eliminate);

            tasks.appendChild(newTask);

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

    /* ToDo: Editar Tarea */
    function editTask(e) {
        let task = e.target.parentNode.parentNode;
    }
});