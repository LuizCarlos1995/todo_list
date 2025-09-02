
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // substitua pelo seu usuário do MySQL
  password: "", // substitua pela sua senha do MySQL
  database: "todo_db",
});

module.exports = connection;
