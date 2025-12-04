async function loadTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo => {
        const status = todo.completed ? 'Completed' : 'Active';
        const buttonText = todo.completed ? 'Activate' : 'Complete';
        return `<li class="${status.toLowerCase()}">${todo.text} <small>ID: ${todo.id}</small> - <i>${status}</i> <button onclick="toggleStatus(${todo.id})">${buttonText}</button> <button onclick="deleteTodo(${todo.id})">Delete</button></li>`;
    }).join('');
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    });
    input.value = '';
    loadTodos();
}

loadTodos();

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });
    loadTodos();
}

async function toggleStatus(id) {
    await fetch(`/api/todos/${id}`, {
        method: 'PUT',
    });
    loadTodos();
}
