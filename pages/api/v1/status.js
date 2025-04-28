import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  //const result = await database.query("SELECT 1+1;");
  //console.log(result);
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DATABASE;
  const databaseOpenedConnectionResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  //"SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'postgres';",

  const databaseOpenedConnectionValue =
    databaseOpenedConnectionResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionValue,
      },
    },
  });
}

export default status;
