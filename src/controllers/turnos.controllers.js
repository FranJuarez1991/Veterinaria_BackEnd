const serviciosTurnos = require("../services/turnos.services");

const obtenerTodosLosTurnos = async (req, res) => {
  const result = await serviciosTurnos.obtenerTurnos();
  res.status(result.statusCode).json(result.turnos || { msg: result.msg });
};

const obtenerUnTurno = async (req, res) => {
  const result = await serviciosTurnos.obtenerTurno(req.params.idTurno);
  res.status(result.statusCode).json(result.turno || { msg: result.msg });
};

const crearUnTurno = async (req, res) => {
  const result = await serviciosTurnos.nuevoTurno(req.body);
  res.status(result.statusCode).json({ msg: result.msg });
};

const actualizarUnTurno= async (req, res) => {
  const result = await serviciosTurnos.actualizarTurno(
    req.body,
    req.params.idTurno
  );
  res.status(result.statusCode).json({ msg: result.msg });
};

const eliminarUnTurno = async (req, res) => {
  const result = await serviciosTurnos.eliminarTurno(req.params.idTurno);
  res.status(result.statusCode).json({ msg: result.msg });
};

module.exports = {
  obtenerTodosLosTurnos,
  obtenerUnTurno,
  crearUnTurno,
  actualizarUnTurno,
  eliminarUnTurno,
};
