const TurnosModel = require("../models/turnos.schema");

const obtenerTurnos = async () => {
  try {
    const turnos = await TurnosModel.find();
    return { turnos, statusCode: 200 };
  } catch (error) {
    return { msg: "Error al obtener los turnos", statusCode: 500, error };
  }
};

const obtenerTurno = async (idTurno) => {
  try {
    const turno = await TurnosModel.findById(idTurno);
    if (!turno) {
      return { msg: "Turno no encontrado", statusCode: 404 };
    }
    return { turno, statusCode: 200 };
  } catch (error) {
    return { msg: "Error al obtener el Turno", statusCode: 500, error };
  }
};

const nuevoTurno = async (body) => {
  const nuevoTurno = new TurnosModel(body);
  await nuevoTurno.save();
  return {
    msg: "Turno Creado con Éxito",
    statusCode: 201,
  };
};

const actualizarTurno = async (body, idTurno) => {
  try {
    const turnoActualizado = await TurnosModel.findByIdAndUpdate(
      { _id: idTurno },
      body,
      { new: true } // Devuelve el turno actualizado
    );
    if (!turnoActualizado) {
      return { msg: "Turno no encontrado", statusCode: 404 };
    }
    return { msg: "Turno Actualizado con Éxito", statusCode: 200 };
  } catch (error) {
    return { msg: "Error al actualizar el turno", statusCode: 500, error };
  }
};

const eliminarTurno = async (idTurno) => {
  try {
    const turnoEliminado = await TurnosModel.findByIdAndDelete(idTurno);
    if (!turnoEliminado) {
      return { msg: "Turno no encontrado", statusCode: 404 };
    }
    return { msg: "Turno Eliminado con Éxito", statusCode: 200 };
  } catch (error) {
    return { msg: "Error al eliminar el turno", statusCode: 500, error };
  }
};

module.exports = {
  obtenerTurnos,
  obtenerTurno,
  nuevoTurno,
  actualizarTurno,
  eliminarTurno,
};
