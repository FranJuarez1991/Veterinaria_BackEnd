
const { url } = require("../helpers/cloudinary.config");
const serviciosProductos = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  /*request - esto es la solicitud que me manda el cliente(front) al server(back) */
  /*response - esto es la resp del servidor al cliente*/
  const result = await serviciosProductos.obtenerProductos();

  if (result.statusCode === 200) {
    res.status(200).json(result.productos);
  } else {
    res.status(500).json({ msg: "Error al traer los productos" });
  }
};
const obtenerUnProducto = async (req, res) => {
  /*req : Request -> header - body - params - query */
  const result = await serviciosProductos.obtenerProducto(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json(result.producto);
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};
const crearUnProducto = async (req, res) => {
  const result = await serviciosProductos.nuevoProducto(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al Crear un producto" });
  }
};
const actualizarUnProducto = async (req, res) => {
  const result = await serviciosProductos.actualizarProducto(
    req.body,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al Crear un producto" });
  }
};
const eliminarUnProducto = async (req, res) => {
  const result = await serviciosProductos.eliminarProducto(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al Eliminar un producto" });
  }
};

const agregarUnProductoAlCarrito = async (req, res) => {
  const result = await serviciosProductos.cargarProductoCarrito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar un producto del Carrito" });
  }
};

const borrarUnProductodelCarrito = async (req, res) => {
  const result = await serviciosProductos.borrarProductoCarrito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar un producto del Carrito" });
  }
};

const agregarUnProductoAFavorito = async (req, res) => {
  const result = await serviciosProductos.cargarProductoFavorito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al cargar un producto a Favorito" });
  }
};

const borrarUnProductodeFavorito = async (req, res) => {
  const result = await serviciosProductos.borrarProductoFavorito(
    req.idUsuario,
    req.params.idProducto
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar un producto de Favorito" });
  }
};
const obtenerProductosCarrito = async (req, res) => {
  try {
    const result = await serviciosProductos.obtenerProductosDelCarritoUsuario(
      req.idUsuario
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos del Carrito" });
  }
};

const obtenerProductosFavoritos = async (req, res) => {
  try {
    const result = await serviciosProductos.obtenerProductosDeFavoritosUsuario(
      req.idUsuario
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos de Favoritos" });
  }
};

const agregarImagenProducto = async (req, res) => {
  const result = await serviciosProductos.agregarImagen(
    req.params.idProducto,
    req.file
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la imagen al producto" });
  }
};

const pagarProductos = async (req, res) => {
  const result = await serviciosProductos.pagarMercadoPago();

  if (result.statusCode === 200) {
    res.status(200).json({ url: result.url });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  crearUnProducto,
  actualizarUnProducto,
  eliminarUnProducto,
  agregarUnProductoAlCarrito,
  agregarUnProductoAFavorito,
  borrarUnProductodelCarrito,
  borrarUnProductodeFavorito,
  obtenerProductosCarrito,
  obtenerProductosFavoritos,
  agregarImagenProducto,
  pagarProductos,
};