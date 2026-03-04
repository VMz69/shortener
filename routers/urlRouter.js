const express = require("express");
const { agregar, borrarUrlPorId, borrarUrlPorShort } = require("../controllers/urlController");

const router = express.Router();

// para Endpoint para crear una URL corta 
router.post("/crear", agregar);

// y paraEndpoint para borrar por ID
router.delete("/:id", borrarUrlPorId);

// Endpoint para borrar por código corto
router.delete("/code/:short", borrarUrlPorShort);

module.exports = router;
