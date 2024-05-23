// Import necessary modules
const express = require('express');
const fs = require('fs');

// Initialize express app
const app = express();
app.use(express.json());

// Read the database file
const readDatabase = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

// Write to the database file
const writeDatabase = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// API to get all todos
app.get('/todos', (req, res) => {
  const db = readDatabase();
  res.json(db.todos);
});

// API to add a new todo
app.post('/todos', (req, res) => {
  const db = readDatabase();
  db.todos.push(req.body);
  writeDatabase(db);
  res.status(201).send('Todo added successfully');
});

// API to update the status of todos with even IDs
app.patch('/todos/even-status', (req, res) => {
  const db = readDatabase();
  db.todos.forEach(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  writeDatabase(db);
  res.send('Updated status of todos with even IDs');
});

// API to delete todos with status true
app.delete('/todos', (req, res) => {
  const db = readDatabase();
  db.todos = db.todos.filter(todo => todo.status !== true);
  writeDatabase(db);
  res.send('Deleted todos with status true');
});

// Start the server
const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
