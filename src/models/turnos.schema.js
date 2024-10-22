const { Schema, model } = require("mongoose");

const TurnoSchema = new Schema({
  detalle: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  nombreVeterinario: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 30,
  },
  nombreMascota: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
  },
    fecha: {
    type: Date, // Cambiado a Date para manejar fechas
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date(); // Verifica que la fecha sea futura
      },
      message: (props) => `${props.value} no es una fecha válida o es pasada!`,
    },
  },
  hora: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        const regex = /^(0[9]|1[0-9]|20):[0-5][0-9]$/; // HH:MM formato 24 horas
        return regex.test(value); // Verifica el formato
      },
      message: (props) => `${props.value} no es una hora válida!`,
    },
  },
}, {
  // Agrega este objeto para crear el índice compuesto
  timestamps: true,
});
// Índice compuesto para evitar duplicados en fecha y hora
TurnoSchema.index({ fecha: 1, hora: 1 }, { unique: true });


const TurnosModel = model("turno", TurnoSchema);
module.exports = TurnosModel;
