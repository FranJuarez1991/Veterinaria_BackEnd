const {Schema, model} = require("mongoose");

const UsersSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/, // Solo permite letras, números y guiones bajos
    minlength: 4, // Longitud mínima de 4 caracteres
    maxlength: 30, // Longitud máxima de 30 caracteres
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validar formato de email
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    /* match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // Al menos una letra, un número y 8 caracteres
    message:
      "La contraseña debe contener al menos una letra, un número y tener un mínimo de 8 caracteres.",*/
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  idCarrito: {
    type: String,
  },
  idFavorito: {
    type: String,
  },
});
/*sacar el dato contraseña del esquema */
UsersSchema.methods.toJSON = function(){
  const {contrasenia, ...usuario} = this.toObject();

  return usuario; 
};

const UserModel = model("user", UsersSchema);
module.exports = UserModel;