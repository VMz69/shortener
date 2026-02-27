const express = require("express");
const router = express.Router();
const { agregar } = require("../controllers/urlController")


router.post("/crear", agregar)

module.exports = router