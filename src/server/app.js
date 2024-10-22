require('dotenv').config();
require('../DB/config');
const express = require("express"); /*conmojs */
const path = require("path");
const morgan = require("morgan")

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
    this.middlewares();/*habilitar formato json para luego las rutas sino no found */
    this.rutas();
  }

  middlewares() {
    /*middlewares */
    this.app.use(morgan ("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname + "/public")));
  }

  rutas() {
    this.app.use("/productos", require("../routes/productos.routes"));
    this.app.use("/usuarios", require("../routes/usuarios.routes"));
    this.app.use("/pacientes", require("../routes/pacientes.routes"));
    this.app.use("/turnos", require("../routes/turnos.routes"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor levantado", this.port);
    });
  }
}

module.exports = Server;