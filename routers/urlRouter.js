const express = require("express");
onst { borrarUrlPorId, borrarUrlPorShort } = require("../controllers/UrlController");
const router = express.Router();
const { agregar } = require("../controllers/urlController")

router.post("/crear", agregar)

// Esto para Eliminar por ID → DELETE /url/:id
router.delete("/:id", borrarUrlPorId);

// y este para  Eliminar por link_short → DELETE /url/code/:short
router.delete("/code/:short", borrarUrlPorShort);

module.exports = router;