/*const productos = [
  {
    id: 1,
    nombre: "cel",
    precio: 1500,
  },
  {
    id: 2,
    nombre: "cel 2",
    precio: 1600,
  },
];*/

const CartModel = require("../models/carrito.schema");
const FavModel = require("../models/favoritos.schema");
const ProductModel = require("../models/producto.schema");
const UserModel = require("../models/usuarios.schema");
    

const obtenerProductos = async () => {
const productos = await ProductModel.find();

  return {
    productos,
    statusCode: 200,
  };
};

const obtenerProducto = async (idProducto) => {
    const producto = await ProductModel.findOne({ _id: idProducto });
    /*const producto = productos.find((prod) => prod.id === Number(idProducto));*/

    return{
        producto, 
        statusCode: 200,

    };
};

const nuevoProducto = async (body) => {
    const nuevoProducto = new ProductModel(body);
    await nuevoProducto.save();
    /* const nuevoProducto = {
       id: productos[productos.length - 1]?.id + 1 || 1,
       ...body,
     };
     productos.push(nuevoProducto);*/

     return {
        msg: "Producto Creado con Éxito",
        statusCode: 201,
     }
};

const actualizarProducto = async (body, idProducto) => {
    const productoActualizado = await ProductModel.findByIdAndUpdate({_id: idProducto}, body, /*{new:true} /*nuevo elemento actualizado si necesito enviar como resp por consola*/);
   /* const posicionProducto = productos.findIndex(
      (prod) => prod.id === Number(idProducto)
    );
    const productoActualizado = {
      id: Number(idProducto),
      ...body,
    };
    productos[posicionProducto] = productoActualizado;*/

      return {
        msg: "Producto Actualizado con Éxito",
        statusCode: 200,
      };

};

const eliminarProducto = async (idProducto) => {
    await ProductModel.findByIdAndDelete({_id: idProducto});
    /*const posicionProducto = productos.findIndex(
      (prod) => prod.id === Number(idProducto)
    );
    productos.splice(posicionProducto, 1);*/

     return {
       msg: "Producto Eliminado con Éxito",
       statusCode: 200,
     };

};
const cargarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UserModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const carrito = await CartModel.findOne({_id: usuario.idCarrito});

  const productoExiste = carrito.productos.find(
    (prod) => prod._id.toString() === idProducto.toString() //toString transforma en un string
  );

  if(productoExiste){
    return {
      msg: 'Producto ya existe en el carrito',
      statusCode: 400,
    };
  }

  carrito.productos.push(producto);
  await carrito.save();

  return {
    msg:'Producto cargado en el carrito',
    statusCode: 200,
  };
};

const borrarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UserModel.findById(idUsuario);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });
  const posicionProducto = carrito.productos.findIndex(
    (prod) => prod._id.toString() === idProducto.toString()
  );

  carrito.productos.splice(posicionProducto, 1);
  await carrito.save();

  return {
    msg: "Producto eliminado del carrito",
    statusCode: 200,
  };
};

const cargarProductoFavorito = async (idUsuario, idProducto) => {
  const usuario = await UserModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const favorito = await FavModel.findOne({ _id: usuario.idFavorito });

  const productoExiste = favorito.productos.find(
    (prod) => prod._id.toString() === idProducto.toString()
  );


  if (productoExiste) {
    return {
      msg: "Producto ya existe en Favorito",
      statusCode: 400,
    };
  }

  favorito.productos.push(producto);
  await favorito.save();

  return {
    msg: "Producto cargado en Favoritos",
    statusCode: 200,
  };
};

const borrarProductoFavorito = async (idUsuario, idProducto) => {
  const usuario = await UserModel.findById(idUsuario);
  const favorito = await FavModel.findOne({ _id: usuario.idFavorito });
  const posicionProducto = favorito.productos.findIndex(
    (prod) => prod._id.toString() === idProducto.toString()
  );

  favorito.productos.splice(posicionProducto,1);
  await favorito.save();

  return {
    msg: "Producto eliminado de Favoritos",
    statusCode: 200,
  };
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  cargarProductoCarrito,
  cargarProductoFavorito,
  borrarProductoCarrito,
  borrarProductoFavorito,
};
