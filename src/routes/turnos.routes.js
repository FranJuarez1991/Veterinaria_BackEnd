const express = require("express");
const router = express.Router();
const {
  obtenerTodosLosTurnos,
  obtenerUnTurno,
  crearUnTurno,
  actualizarUnTurno,
  eliminarUnTurno,
} = require("../controllers/turnos.controllers");

/*GET  - Solo obtener - todos los paciente */
router.get("/", obtenerTodosLosTurnos);
/*Obtener un paciente */
router.get("/:idTurno", obtenerUnTurno);
/*POST - Crear un paciente */
router.post("/", crearUnTurno);
/*PUT - Actualizar un paciente */
router.put("/:idTurno", actualizarUnTurno);
/*DELETE- Eliminar un paciente */
router.delete("/:idTurno", eliminarUnTurno);

module.exports = router;
