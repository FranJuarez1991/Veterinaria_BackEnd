const PacienteModel = require("../models/pacientes.schema");

const obtenerPacientes = async () => {
  try {
    const pacientes = await PacienteModel.find();
    return { pacientes, statusCode: 200 };
  } catch (error) {
    return { msg: "Error al obtener los pacientes", statusCode: 500, error };
  }
};

const obtenerPaciente = async (idPaciente) => {
  try {
    const paciente = await PacienteModel.findById(idPaciente);
    if (!paciente) {
      return { msg: "Paciente no encontrado", statusCode: 404 };
    }
    return { paciente, statusCode: 200 };
  } catch (error) {
    return { msg: "Error al obtener el paciente", statusCode: 500, error };
  }
};

const nuevoPaciente = async (body) => {

    const nuevoPaciente = new PacienteModel(body);
    await nuevoPaciente.save();
     return {
    msg: "Paciente Creado con Éxito",
    statusCode: 201,
 }
};

const actualizarPaciente = async (body, idPaciente) => {
  try {
    const pacienteActualizado = await PacienteModel.findByIdAndUpdate(
      { _id: idPaciente },
      body,
      { new: true } // Devuelve el paciente actualizado
    );
    if (!pacienteActualizado) {
      return { msg: "Paciente no encontrado", statusCode: 404 };
    }
    return { msg: "Paciente Actualizado con Éxito", statusCode: 200 };
  } catch (error) {
    return { msg: "Error al actualizar el paciente", statusCode: 500, error };
  }
};

const eliminarPaciente = async (idPaciente) => {
  try {
    const pacienteEliminado = await PacienteModel.findByIdAndDelete(idPaciente);
    if (!pacienteEliminado) {
      return { msg: "Paciente no encontrado", statusCode: 404 };
    }
    return { msg: "Paciente Eliminado con Éxito", statusCode: 200 };
  } catch (error) {
    return { msg: "Error al eliminar el paciente", statusCode: 500, error };
  }
};

module.exports = {
  obtenerPacientes,
  obtenerPaciente,
  nuevoPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
