const express = require("express");
const router = express.Router();
const { agregar, editar } = require("../controllers/urlController")


router.post("/crear", agregar)
router.put("/editar/:codigo", editar)

module.exports = router