  const express = require("express");
  const router = express.Router();
const {
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
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

/*GET  - Solo obtener - todos los productos */
router.get("/", auth("user"), obtenerTodosLosProductos);
/*Obtener un producto */
router.get("/:idProducto", obtenerUnProducto);
router.get("/todosProductosCarrito", auth("user"), obtenerProductosCarrito);
router.get("/todosProductosFavoritos", auth("user"), obtenerProductosFavoritos);
/*POST - Crear un Producto */
router.post("/", crearUnProducto);
router.post(
  "/agregarProductoCarrito/:idProducto",
  auth("user"),
  agregarUnProductoAlCarrito
);
router.post(
  "/agregarProductoFavorito/:idProducto",
  auth("user"),
  agregarUnProductoAFavorito
);
/*PUT - Actualizar un producto */
router.put("/:idProducto", actualizarUnProducto);
/*DELETE- Eliminar un producto */
router.delete("/:idProducto", eliminarUnProducto);
router.delete(
  "/borrarProductoCarrito/:idProducto",
  auth("user"),
  borrarUnProductodelCarrito
);
router.delete(
  "/borrarProductoFavorito/:idProducto",
  auth("user"),
  borrarUnProductodeFavorito
);

router.post(
  "/agregarImagen/:idProducto",
  multer.single("image"),
  agregarImagenProducto
);
router.post("/pagarCarritoProductos", pagarProductos); // pagar productos del carrito


module.exports = router;
