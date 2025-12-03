const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Read todos from todos.json on startup
let todos = [];
try {
    const data = fs.readFileSync('todos.json', 'utf8');
    todos = JSON.parse(data);
} catch (err) {
    if (err.code === 'ENOENT') {
        // file does not exist, create it with an empty array
        fs.writeFileSync('todos.json', '[]', 'utf8');
    } else {
        console.error(err);
    }
}

app.use(express.static('public'));
app.use(express.json());

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todo = { id: Date.now(), text: req.body.text, completed: false };
    todos.push(todo);
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(t => t.id !== id);
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Todo app running at http://localhost:${port}`);
});
