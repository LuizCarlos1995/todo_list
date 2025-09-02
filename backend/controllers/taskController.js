const db = require("../config/database");

// Buscar todas as tarefas
exports.getAllTasks = (req, res) => {
  const { status } = req.query;
  let query = "SELECT * FROM tasks";

  if (status) {
    query += ` WHERE status = '${status}'`;
  }

  query += " ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

// Buscar tarefa por ID
exports.getTaskById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }
    res.json(results[0]);
  });
};

// Criar nova tarefa
exports.createTask = (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ id: results.insertId, title, description, status: "pending" });
    }
  );
};

// Atualizar tarefa
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  db.query(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.json({ message: "Tarefa atualizada com sucesso" });
    }
  );
};

// Deletar tarefa
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  });
};

// Atualizar status da tarefa
exports.updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.json({ message: "Status da tarefa atualizado com sucesso" });
    }
  );
};
