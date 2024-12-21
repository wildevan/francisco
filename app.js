// Refatoração do app.js

// Seleciona os elementos da página
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const employeeInput = document.getElementById('employeeInput');
const nextTaskInput = document.getElementById('nextTaskInput');

// Função para formatar a data e hora
function formatDate() {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Função utilitária para criar um elemento com classe e texto
function createElement(tag, className, textContent = '') {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (textContent) element.textContent = textContent;
    return element;
}

// Função para criar uma nova tarefa
function createTask(taskText, employeeName, nextTaskDate) {
    const li = document.createElement('li');

    const taskContent = createElement('div', 'task-content', taskText);
    const employee = createElement('span', 'employee-name', `Responsável: ${employeeName}`);
    const taskDate = createElement('span', 'task-date', `Criada em: ${formatDate()}`);
    const nextTask = createElement('span', 'next-task', `Próxima tarefa agendada para: ${nextTaskDate}`);

    const deleteButton = createElement('button', 'delete', 'Excluir');
    deleteButton.setAttribute('aria-label', 'Excluir tarefa');
    deleteButton.onclick = () => removeTask(li);

    li.append(taskContent, employee, taskDate, nextTask, deleteButton);
    taskList.appendChild(li);

    saveTasks();
}

// Função para remover uma tarefa
function removeTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map((task) => {
        return {
            taskText: task.querySelector('.task-content').textContent,
            employeeName: task.querySelector('.employee-name').textContent.replace('Responsável: ', ''),
            nextTaskDate: task.querySelector('.next-task').textContent.replace('Próxima tarefa agendada para: ', '')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ taskText, employeeName, nextTaskDate }) => {
        createTask(taskText, employeeName, nextTaskDate);
    });
}

// Adiciona evento ao botão de adicionar tarefa
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const employeeName = employeeInput.value.trim();
    const nextTaskDate = nextTaskInput.value.trim();

    if (taskText && employeeName && nextTaskDate) {
        createTask(taskText, employeeName, nextTaskDate);
        taskInput.value = '';
        employeeInput.value = '';
        nextTaskInput.value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Permite adicionar tarefa ao pressionar Enter
[taskInput, employeeInput, nextTaskInput].forEach((input) => {
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTaskButton.click();
    });
});

// Registra o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch((error) => {
                console.log('Erro ao registrar o Service Worker:', error);
            });
    });
}

// Carrega as tarefas ao iniciar
loadTasks();
