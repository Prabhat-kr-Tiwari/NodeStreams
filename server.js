const express = require("express");

const os = require("os");
const PORT=process.env.PORT||4000

const cluster = require("cluster");
const cpuNums = os.cpus().length;
// console.log(cpuNums);

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNums; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();
  

  app.get("/", async (request, response) => {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += i;
    }
    return response.json({ processId: process.pid, result });
  });
  app.listen(PORT, (request, response) => {
    console.log(`Server listening on ${PORT} and PID ${process.pid}`);
  });
}
