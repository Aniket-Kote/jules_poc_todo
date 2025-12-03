const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// BUG: Todos array not persisted or initialized properly
let todos = []; // Empty - Jules can fix persistence

app.use(express.static('public'));
app.use(express.json());

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todo = { id: Date.now(), text: req.body.text, completed: false };
    todos.push(todo);
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Todo app running at http://localhost:${port}`);
});
