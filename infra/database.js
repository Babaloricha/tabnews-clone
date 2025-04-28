import { Client } from "pg";

async function query(queryObject) {
  const { Client } = require("pg");

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });

  client
    .connect()
    .then(() => console.log("Conectado ao PostgreSQL!"))
    .catch((err) => console.error("Erro de conexão:", err.stack));

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
