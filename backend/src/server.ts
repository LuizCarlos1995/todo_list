
import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/database";
import taskRoutes from "./routes/tasks";

const app = express();
const PORT: number = parseInt(process.env.PORT || "5000");

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api", taskRoutes);

// Importação condicional do Swagger (só se os módulos existirem)
try {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('../swagger-output.json');
  
  // Rota da documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger configurado com sucesso!');
} catch (error) {
  console.log('Swagger não configurado:');
}

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
