// Seleciona os elementos da página
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const employeeInput = document.getElementById('employeeInput');
const nextTaskInput = document.getElementById('nextTaskInput');

// Função para formatar a data e hora
function formatDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Função para criar uma nova tarefa
function createTask(taskText, employeeName, nextTaskDate) {
    const li = document.createElement('li');
    
    // Cria a descrição da tarefa
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskText;

    // Cria o nome do funcionário
    const employee = document.createElement('span');
    employee.classList.add('employee-name');
    employee.textContent = `Responsável: ${employeeName}`;

    // Cria a data/hora de criação da tarefa
    const taskDate = document.createElement('span');
    taskDate.classList.add('task-date');
    taskDate.textContent = `Criada em: ${formatDate()}`;

    // Cria a data/hora da próxima tarefa
    const nextTask = document.createElement('span');
    nextTask.classList.add('next-task');
    nextTask.textContent = `Próxima tarefa agendada para: ${nextTaskDate}`;

    // Adiciona o botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => li.remove(); // Remove a tarefa ao clicar

    // Adiciona os elementos ao li
    li.appendChild(taskContent);
    li.appendChild(employee);
    li.appendChild(taskDate);
    li.appendChild(nextTask);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Função para adicionar tarefa
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const employeeName = employeeInput.value.trim();
    const nextTaskDate = nextTaskInput.value.trim();

    if (taskText !== '' && employeeName !== '' && nextTaskDate !== '') {
        createTask(taskText, employeeName, nextTaskDate); // Cria a tarefa
        taskInput.value = ''; // Limpa o campo de entrada
        employeeInput.value = ''; // Limpa o campo do funcionário
        nextTaskInput.value = ''; // Limpa o campo de próxima tarefa
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Permite adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTaskButton.click(); // Simula o clique do botão
    }
});
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
