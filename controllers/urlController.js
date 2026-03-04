const { generarCodigo } = require("../services/generarIdService");
const { agregarDireccion, editarDireccion } = require("../models/urlModel")

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

module.exports = { agregar, editar }
