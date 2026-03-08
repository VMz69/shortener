const { generarCodigo } = require("../services/generarIdService");
const { agregarDireccion } = require("../models/urlModel")

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

module.exports = { agregar, redireccionar };
