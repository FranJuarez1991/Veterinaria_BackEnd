/*const usuarios = [
  {
    id: 1,
    nombreUsuario: "francisco",
    contrasenia: 123456,
  },
  {
     id: 2,
     nombreUsuario: "Gerardo",
     contrasenia: 123456,
  },
];*/
const UserModel = require("../models/usuarios.schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FavModel = require("../models/favoritos.schema");
const CartModel = require("../models/carrito.schema");
const { darBienvenidaAlUsuario } = require("../helpers/mensajes.mails");

const obtenerUsuarios = async () => {
  //const usuarios = await UserModel.find({}, "-contrasenia");
  const usuarios = await UserModel.find();

  return {
    usuarios,
    statusCode: 200,
  };
};
const obtenerUsuario = async (idUsuario) => {
  const usuario = await UserModel.findOne({ _id: idUsuario });
  /* const usuario = usuarios.find((user) => user.id === Number(idUsuario));*/
  return {
    usuario,
    statusCode: 200,
  };
};
const crearUsuario = async (body) => {
  const usuarioExiste = await UserModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });

  if (usuarioExiste) {
    return {
      msg: "usuario No Disponible",
      StatusCode: 400,
    };
  }

  if (
    (body?.rol && body?.rol !== "admin") ||
    (body?.rol && body?.rol !== "user")
  ) {
    return {
      msg: "Rol Incorrecto. Solo se Puede elegir User/Admin",
      StatusCode: 400,
    };
  }
  const usuario = new UserModel(body);
  const carrito = new CartModel({ idUsuario: usuario._id });
  const favorito = new FavModel({ idUsuario: usuario._id });

  usuario.idCarrito = carrito._id;
  usuario.idFavorito = favorito._id;
  /*Generar el hasheo de contraseña */
  const salt = await bcrypt.genSalt(10);
  usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);

  await carrito.save();
  await favorito.save();
  await usuario.save();

  await darBienvenidaAlUsuario(usuario.emailUsuario, usuario.nombreUsuario);

  /* const nuevoUsuario = {
    id: usuarios[usuarios.length - 1]?.id + 1 || 1,
    ...body,
  };
  usuarios.push(nuevoUsuario);*/
  return {
    msg: "Usuario Creado con Éxito",
    statusCode: 201,
  };
};
const actualizarUsuario = async (idUsuario, body) => {
    await UserModel.findByIdAndUpdate({_id: idUsuario},body);

     /*const posicionUsuario = usuarios.findIndex(
       (user) => user.id === Number(idUsuario)
     );
     const usuarioActualizado = {
       id: Number(idUsuario),
       ...body,
     };
     usuarios[posicionUsuario] = usuarioActualizado;*/
       return {
         msg: "Usuario Actualizado con Éxito",
         statusCode: 200,
       };
};
const eliminarUsuario = async (idUsuario) => {
    await UserModel.findByIdAndDelete({_id:idUsuario});
    /*const posicionUsuario = usuarios.findIndex(
      (user) => user.id === Number(idUsuario)
    );
    usuarios.splice(posicionUsuario, 1);*/
    return {
    msg: "Usuario Eliminado con Éxito",
    statusCode: 200,
    };
};

const iniciarSesion =async (body) => {
  const usuarioExiste = await UserModel.findOne({nombreUsuario: body.nombreUsuario}) ;

  if(!usuarioExiste){
    return {
      msg: "Usuario y/o contaseña incorrecta",
      statusCode: 400,
    };
  }
  const compararContrasenias = await bcrypt.compare(body.contrasenia, usuarioExiste.contrasenia);

  if(compararContrasenias){
      const payload = {
        idUsuario : usuarioExiste._id,
        rol: usuarioExiste.rol,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);


    return {
      msg: "Usuario Logueado",
      token,
      statusCode: 200,
    };
  }
  return {
    msg: "Usuario y/o contaseña incorrecta",
    statusCode: 400,
  };
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion,
};
