import { Client } from "pg";

async function query(queryObject) {
  const { Client } = require("pg");

  const client = new Client({
    host: "localhost", // ou o nome do container, tipo 'postgres'
    port: 5432,
    user: "postgres",
    password: "localpassword",
    database: "postgres",
  });

  client
    .connect()
    .then(() => console.log("Conectado ao PostgreSQL!"))
    .catch((err) => console.error("Erro de conexão:", err.stack));

  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
