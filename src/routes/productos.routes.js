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
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");


  
  
  /*GET  - Solo obtener - todos los productos */
  router.get("/", auth("user") , obtenerTodosLosProductos);
  /*Obtener un producto */
  router.get("/:idProducto", obtenerUnProducto);
  /*POST - Crear un Producto */
  router.post("/", crearUnProducto);
  router.post(
    "/agregarProductoCarrito/:idProducto",
    auth("user"),
    agregarUnProductoAlCarrito);
  router.post(
    "/agregarProductoFavorito/:idProducto",
    auth("user"),
    agregarUnProductoAFavorito);
  /*PUT - Actualizar un producto */
  router.put("/:idProducto", actualizarUnProducto);
  /*DELETE- Eliminar un producto */
  router.delete("/:idProducto", eliminarUnProducto);
  router.post(
    "/borrarProductoCarrito/:idProducto",
    auth("user"),
    borrarUnProductodelCarrito
  );
  router.post(
    "/borrarProductoFavorito/:idProducto",
    auth("user"),
    borrarUnProductodeFavorito
  );

module.exports = router;
