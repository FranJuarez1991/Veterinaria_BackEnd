const { Schema, model } = require("mongoose");

const PacienteSchema = new Schema({
  nombreDueño: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo permite letras y espacios
    minlength: 4,
    maxlength: 30,
  },
  apellidoDueño: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo permite letras y espacios
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validar formato de email
  },
  telefono: {
    type: String, // Cambiado a String
    required: true,
    trim: true,
    unique: true,
    match: /^\+?\d{7,15}$/, // Acepta números de 7 a 15 dígitos con prefijo opcional
  },
  nombreMascota: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 30,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
  },
  especieMascota: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
  },
  razaMascota: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
  },
});

const PacienteModel = model("paciente", PacienteSchema);
module.exports = PacienteModel;
