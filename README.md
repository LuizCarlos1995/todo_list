# 📝 Todo List - Gerenciador de Tarefas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 📖 Sobre o Projeto

Uma aplicação completa de gerenciamento de tarefas construída com tecnologias modernas. O projeto demonstra a implementação de uma arquitetura full-stack robusta, com separação clara entre frontend e backend, tipagem forte com TypeScript e uma API RESTful bem estruturada.

## ✨ Funcionalidades

- ➕ **Adicionar tarefas** - Criar novas tarefas com título e descrição
- ✏️ **Editar tarefas** - Modificar tarefas existentes
- 🗑️ **Excluir tarefas** - Remover tarefas desnecessárias
- ✅ **Marcar como concluída** - Controle de status das tarefas
- 🔍 **Filtrar tarefas** - Visualizar por status (todas, pendentes, concluídas)
- 📱 **Interface responsiva** - Compatível com dispositivos móveis e desktop

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Superset do JavaScript com tipagem estática
- **MySQL** - Sistema de gerenciamento de banco de dados relacional
- **Cors** - Middleware para controle de acesso
- **Dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React.js** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para o frontend
- **CSS3** - Estilização responsiva
- **Axios** - Cliente HTTP para requisições à API

## 🎥 Demonstração

[Assista ao vídeo no YouTube](https://youtu.be/EILEyR2yvCw)

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8.0 ou superior)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/LuizCarlos1995/todo_list.git
cd todo_list
```

### 2. Configuração do Backend

```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3001
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=todo_list_db
```

### 3. Configuração do Banco de Dados

```sql
-- Crie o banco de dados
CREATE DATABASE todo_list_db;

-- Execute as migrations (se houver)
-- Ou crie as tabelas necessárias conforme o schema do projeto
```

### 4. Configuração do Frontend

```bash
# Em um novo terminal, acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install
```

## 🏃‍♂️ Como Executar

### Backend
```bash
cd backend
npm run dev
```
O servidor será iniciado em `http://localhost:5000`

### Frontend
```bash
cd frontend
npm start
```
A aplicação será aberta em `http://localhost:3000`

## 📚 Documentação da API

Este projeto inclui documentação interativa da API usando Swagger UI, gerada automaticamente com swagger-autogen.
Acessando a Documentação
Após iniciar o servidor, acesse a documentação em:
`http://localhost:5000/api-docs`
Como Atualizar a Documentação
Sempre que adicionar ou modificar rotas, execute:
bashnpm run swagger  # Gera/atualiza a documentação
npm run dev      # Inicia o servidor

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/tasks` | Lista todas as tarefas |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `PUT` | `/api/tasks/:id` | Atualiza uma tarefa específica |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa específica |
| `PATCH` | `/api/tasks/:id/complete` | Marca/desmarca tarefa como concluída |

Testando a API
A interface Swagger permite testar todos os endpoints diretamente no navegador, sem necessidade de ferramentas externas como Postman.

### Exemplo de Uso

```javascript
// GET - Listar tarefas
fetch('http://localhost:3001/api/tasks')
  .then(response => response.json())
  .then(data => console.log(data));

// POST - Criar tarefa
fetch('http://localhost:3001/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nova tarefa',
    description: 'Descrição da tarefa'
  })
});
```

## 🗂️ Estrutura do Projeto

```
todo_list/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🧪 Testes em fase de implementação

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📦 Build para Produção

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luiz Carlos**

- GitHub: [@LuizCarlos1995](https://github.com/LuizCarlos1995)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/luiz-desenvolvedor/)

## 🙏 Agradecimentos

- Comunidade React por toda documentação
- Equipe do Express.js
- Comunidade TypeScript
- E todos que contribuem com o ecossistema Node.js

---

⭐ **Deixe uma estrela se este projeto te ajudou!**
