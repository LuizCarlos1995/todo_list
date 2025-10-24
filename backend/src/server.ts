
import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/database";
import userRoutes from "./routes/userRouter"
import taskRoutes from "./routes/tasksRouter";
import loginRoutes from "./routes/loginRouter";

const app = express();
const PORT: number = parseInt(process.env.PORT || '');

// Middleware
app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());

// Rotas da API
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", loginRoutes);

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

// Testar conexão com o banco mysql
db.connect((err: any) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
});

// Testar conexão com o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
