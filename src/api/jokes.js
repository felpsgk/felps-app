const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3003;

const db = new sqlite3.Database(
  "/home/felpsgk/Documents/react/felps-app/src/db/piadas.db"
);

app.get("/piadas", (req, res) => {
  db.get("SELECT * FROM piadas ORDER BY RANDOM() LIMIT 1", [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Successo",
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
