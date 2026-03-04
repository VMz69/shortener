const express = require("express");
const { borrarUrlPorId, borrarUrlPorShort, agregar } = require("../controllers/urlController");
const router = express.Router();

router.post("/crear", agregar);
router.delete("/:id", borrarUrlPorId);
router.delete("/code/:short", borrarUrlPorShort);

module.exports = router;
