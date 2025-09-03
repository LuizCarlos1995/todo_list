
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // substitua pelo seu usuário do MySQL
  // usa vazio se não existir - substitua pela sua senha do MySQL
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
});

export default connection;