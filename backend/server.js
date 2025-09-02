// Adicione esta linha no início do arquivo
require("dotenv").config(); // Para variáveis de ambiente

const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/tasks", require("./routes/tasks"));

// Testar conexão com o banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
