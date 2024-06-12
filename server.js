const express = require("express");
const path = require("path");
const os = require("os");

module.exports = function () {
  const app = express()
  const port = process.env.PORT || 3000;
  const networkInterfaces = os.networkInterfaces();
  const networkInterfaceZero = networkInterfaces[Object.keys(networkInterfaces)[0]];
  const ipv4Address = networkInterfaceZero.find(interface => interface.family === 'IPv4').address;

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Servidor web rodando em "${ipv4Address}:${port}".`)
  })
}