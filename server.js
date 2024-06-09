const express = require("express");
const path = require("path");

module.exports = function () {
  const app = express()
  const port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Servidor web rodando em: ${port}`)
  })
}