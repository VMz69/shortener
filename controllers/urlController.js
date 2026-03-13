const { generarCodigo } = require("../services/generarIdService");
const { agregarDireccion, editarDireccion, borrarPorId, borrarPorShort } = require("../models/urlModel")

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
};

const editar = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombreDeDireccion, direccionReal } = req.body;
        await editarDireccion(codigo, nombreDeDireccion, direccionReal);
        res.status(200).json({
            estado: "ok",
            mensaje: "URL actualizada exitosamente"
        });
    } catch (e) {
        res.status(500).json({ ok: false, error: "Error interno", message: e.message });
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


const { buscarPorCodigo } = require("../models/urlModel");

const redireccionar = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await buscarPorCodigo(id);

    if (!resultado) {
      return res.status(404).json({
        error: "URL no encontrada"
      });
    }

    res.redirect(resultado.link_real);

  } catch (e) {
    res.status(500).json({
      error: "Error interno"
    });
  }
};

module.exports = { agregar, redireccionar, editar, borrarUrlPorId, borrarUrlPorShort };
