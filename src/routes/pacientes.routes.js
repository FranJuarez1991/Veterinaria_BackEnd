const express = require("express");
const router = express.Router();
const {
  obtenerTodosLosPacientes,
  obtenerUnPaciente,
  crearUnPaciente,
  actualizarUnPaciente,
  eliminarUnPaciente,
} = require("../controllers/pacientes.controllers");

/*GET  - Solo obtener - todos los paciente */
router.get("/", obtenerTodosLosPacientes);
/*Obtener un paciente */
router.get("/:idPaciente", obtenerUnPaciente);
/*POST - Crear un paciente */
router.post("/", crearUnPaciente);
/*PUT - Actualizar un paciente */
router.put("/:idPaciente", actualizarUnPaciente);
/*DELETE- Eliminar un paciente */
router.delete("/:idPaciente", eliminarUnPaciente);

module.exports = router;
