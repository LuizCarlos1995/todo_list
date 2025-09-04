const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Minha API",
    description: "Documentação automática da API",
    version: "1.0.0",
  },
  host: "localhost:5000",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: 'Tasks',
      description: 'Operações relacionadas a tarefas'
    }
  ],
  definitions: {
    Task: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'ID único da tarefa'
        },
        title: {
          type: 'string',
          description: 'Título da tarefa'
        },
        description: {
          type: 'string',
          description: 'Descrição da tarefa'
        },
        status: {
          type: 'string',
          description: 'Status da tarefa',
          enum: ['pending', 'completed', 'in_progress']
        },
        created_at: {
          type: 'string',
          format: 'date-time',
          description: 'Data de criação'
        }
      }
    }
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/server.ts"]; // Arquivo principal que importa as rotas

swaggerAutogen(outputFile, endpointsFiles, doc);
