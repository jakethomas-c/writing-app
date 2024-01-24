const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all files
app.get('/files', (req, res) => {
  db.all('SELECT * FROM files', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single file by id
app.get('/files/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM files WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create a new file
app.post('/files', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO files (title, content) VALUES (?, ?)', [title, content], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { id: this.lastID }
    });
  });
});

// Update a file
app.patch('/files/:id', (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;
  db.run('UPDATE files SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { changes: this.changes }
    });
  });
});

// Delete a file
app.delete('/files/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM files WHERE id = ?', id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'deleted', changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
