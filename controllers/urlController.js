const { generarCodigo } = require("../services/generarIdService");
const { agregarDireccion } = require("../models/urlModel")
const { eliminarPorId, eliminarPorShort } = require("../models/UrlModel");

const agregar = async(req, res) => {
  try {
    const body = req.body;
    const { nombreDeDireccion, direccionReal } = body
    const codigo = generarCodigo()
    await agregarDireccion(nombreDeDireccion, direccionReal, codigo)

    const respuesta = {
        estado: "ok",
        link_real: direccionReal,
        link_short: codigo,
        mensaje: "URL acortada exitosamente"
    }
    res.status(200).json(respuesta)
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: "Error interno",
      message: e.message,
    });
  }

// DELETE /url/:id
const borrarUrlPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const affected = await eliminarPorId(Number(id));
    if (affected === 0) return res.status(404).json({ error: "URL no encontrada" });
    return res.json({ ok: true, message: "URL eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar por ID:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// DELETE /url/code/:short
const borrarUrlPorShort = async (req, res) => {
  try {
    const { short } = req.params;
    const re = /^[a-zA-Z0-9_-]{3,32}$/;
    if (!re.test(short)) {
      return res.status(400).json({ error: "Código corto inválido" });
    }
    const affected = await eliminarPorShort(short);
    if (affected === 0) return res.status(404).json({ error: "URL no encontrada" });
    return res.json({ ok: true, message: "URL eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar por short:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {agregar,
  borrarUrlPorId,
  borrarUrlPorShort,
};
