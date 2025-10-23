
//conexão com MySql
import mysql from "mysql2";

const db = mysql.createConnection({  // configuração de coneção com BD, nome, senha            
  host: process.env.DB_HOST,  // atrazer variaveis de ambiente.
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || ''),
});

//Teste conexão com oracle e knex
// import knex, { Knex } from 'knex'

// const config: Knex.Config = {
//   client: 'oracledb',
//   connection: {
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "",
//     connectString: `${process.env.DB_HOST || 'localhost'}:
//     ${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`,
//   },
// };

// const db =knex(config)

 export default db;