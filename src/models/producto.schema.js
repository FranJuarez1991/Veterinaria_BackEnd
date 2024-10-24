const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true /*sacar espacios vacios en parte adelante y atras */,
    // match: /^[a-zA-Z\s]+$/, // Solo letras y espacios
  },
  precio: {
    type: Number,
    require: true,
    /* validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) =>
        `${props.value} no es un precio válido! El precio debe ser positivo.`,
    },*/
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    // minlength: 10, // Descripción mínima de 10 caracteres
    // maxlength: 500, // Descripción máxima de 500 caracteres
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, "La cantidad debe ser al menos 1"],

    // minlength: 10, // Descripción mínima de 10 caracteres
    // maxlength: 500, // Descripción máxima de 500 caracteres
  },
  imagen: {
    type: String,
    default: "",
    trim: true,
  } /*completar y agregar mas validacion de moong como exp regular etc */,
  bloqueado: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel; 