async function loadTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo =>
        `<li>${todo.text} <small>ID: ${todo.id}</small> <button onclick="deleteTodo(${todo.id})">Delete</button></li>`
    ).join('');
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
