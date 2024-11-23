const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3003;

const db = new sqlite3.Database('./piadas.db');

app.get('/piadas', (req, res) => {
  db.all('SELECT * FROM piadas', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'Successo',
      data: rows
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
