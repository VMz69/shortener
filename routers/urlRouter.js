const express = require("express");
const router = express.Router();
const { agregar, editar } = require("../controllers/urlController")


router.post("/crear", agregar)
router.put("/editar/:codigo", editar)
// para Endpoint para crear una URL corta 
router.post("/crear", agregar);

// y paraEndpoint para borrar por ID
router.delete("/:id", borrarUrlPorId);

module.exports = router
