
import "dotenv/config";  // Para carrega as variáveis de ambiente
import express from "express";
import cors from "cors";
import db from "./config/database";
import taskRoutes from "./routes/tasks"; 

const app = express();
const PORT: number = parseInt(process.env.PORT || "5000");

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/tasks", taskRoutes);

// Testar conexão com o banco
db.connect((err: any) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
