const express = require("express");
const router = express.Router();
const { agregar, editar, borrarUrlPorId, borrarUrlPorShort } = require("../controllers/urlController")


router.post("/crear", agregar)
router.put("/editar/:codigo", editar)
// para Endpoint para crear una URL corta 
router.post("/crear", agregar);

router.delete("/:id", borrarUrlPorId);

// Endpoint para borrar por código corto
router.delete("/code/:short", borrarUrlPorShort);

module.exports = router
