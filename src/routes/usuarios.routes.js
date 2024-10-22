const { Router } = require("express");
const {
  obtenerUnUsuario,
  crearUnUsuario,
  actualizarUnUsuario,
  eliminarUnUsuario,
  obtenerTodosLosUsuarios,
  inicioDeSesionUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();

// Definir rutas
router.get("/", obtenerTodosLosUsuarios);
router.get("/:idUsuario", obtenerUnUsuario); 

router.post("/", crearUnUsuario);
router.post("/iniciarSesion", inicioDeSesionUsuario);


router.put("/:idUsuario", actualizarUnUsuario);

router.delete("/:idUsuario", eliminarUnUsuario);

module.exports = router;
