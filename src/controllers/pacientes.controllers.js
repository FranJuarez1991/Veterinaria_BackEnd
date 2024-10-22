const serviciosPacientes = require("../services/pacientes.services");

const obtenerTodosLosPacientes = async (req, res) => {
  const result = await serviciosPacientes.obtenerPacientes();
  res.status(result.statusCode).json(result.pacientes || { msg: result.msg });
};

const obtenerUnPaciente = async (req, res) => {
  const result = await serviciosPacientes.obtenerPaciente(
    req.params.idPaciente
  );
  res.status(result.statusCode).json(result.paciente || { msg: result.msg });
};

const crearUnPaciente = async (req, res) => {
  const result = await serviciosPacientes.nuevoPaciente(req.body);
  res.status(result.statusCode).json({ msg: result.msg });
};

const actualizarUnPaciente = async (req, res) => {
  const result = await serviciosPacientes.actualizarPaciente(
    req.body,
    req.params.idPaciente
  );
  res.status(result.statusCode).json({ msg: result.msg });
};

const eliminarUnPaciente = async (req, res) => {
  const result = await serviciosPacientes.eliminarPaciente(
    req.params.idPaciente
  );
  res.status(result.statusCode).json({ msg: result.msg });
};

module.exports = {
  obtenerTodosLosPacientes,
  obtenerUnPaciente,
  crearUnPaciente,
  actualizarUnPaciente,
  eliminarUnPaciente,
};
