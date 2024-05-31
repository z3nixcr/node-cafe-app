const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";

    // Inicializar mi app
    this.init();
  }

  init() {
    console.log("Initializing server...");
    // Conectar a la base de datos
    this.dbConnect();
    // Middlewares
    this.middlewares();
    // Rutas de mi app
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(
      this.userPath,
      require("../routes/user")
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        "Server running on port:",
        this.port
      );
    });
  }
}

module.exports = Server;
