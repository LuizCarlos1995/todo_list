
import mysql from "mysql2";

const connection = mysql.createConnection({  // configuração de coneção com BD, nome, senha            
  host: process.env.DB_HOST || "localhost", // atrazer variaveis de ambiente.
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: parseInt(process.env.DB_PORT || "3306"),
});

export default connection;