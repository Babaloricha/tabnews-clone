const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres_dev pg_isready", handleReturn);

  function handleReturn(error, stdout) {
    console.log(stdout);
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("Postgres esta pronto e aceitando conexoes!");
  }
}

console.log("Aguardando Postgres aceitar conexoes");
checkPostgres();
