document.addEventListener('DOMContentLoaded', loadTasks);

let currentEditIndex = null;

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    renderTasks();
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task' + (task.done ? ' done' : '');

        const span = document.createElement('span');
        span.textContent = task.text;

        const doneButton = document.createElement('button');
        doneButton.textContent = task.done ? 'Undo' : 'Done';
        doneButton.onclick = () => toggleDone(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => openModal(index);

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(doneButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function updateTask(index, newTaskText) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].text = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleDone(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function openModal(index) {
    currentEditIndex = index;
    const tasks = getTasksFromLocalStorage();
    document.getElementById('edit-task-input').value = tasks[index].text;
    document.getElementById('edit-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    currentEditIndex = null;
}

function saveTaskEdit() {
    const newTaskText = document.getElementById('edit-task-input').value.trim();
    if (newTaskText === '') {
        alert('Task text cannot be empty.');
        return;
    }

    updateTask(currentEditIndex, newTaskText);
    closeModal();
}