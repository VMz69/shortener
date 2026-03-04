const { generarCodigo } = require("../services/generarIdService");
const { agregarDireccion, borrarPorId, borrarPorShort } = require("../models/urlModel");

const agregar = async (req, res) => {
  try {
    const { nombreDeDireccion, direccionReal } = req.body;
    if (!nombreDeDireccion || !direccionReal) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const codigo = generarCodigo();
    await agregarDireccion(nombreDeDireccion, direccionReal, codigo);

    res.status(201).json({
      estado: "ok",
      link_real: direccionReal,
      link_short: codigo,
      mensaje: "URL acortada exitosamente"
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno", message: e.message });
  }
};

const borrarUrlPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await borrarPorId(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "URL no encontrada" });
    }

    res.json({ mensaje: "URL eliminada correctamente" });
  } catch (e) {
    res.status(500).json({ error: "Error interno", message: e.message });
  }
};

const borrarUrlPorShort = async (req, res) => {
  try {
    const { short } = req.params;
    const result = await borrarPorShort(short);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "URL no encontrada" });
    }

    res.json({ mensaje: "URL eliminada correctamente" });
  } catch (e) {
    res.status(500).json({ error: "Error interno", message: e.message });
  }
};

module.exports = { agregar, borrarUrlPorId, borrarUrlPorShort };
