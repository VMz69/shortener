const urlModel = require('../models/urlModel');

// Crear nueva URL
const agregar = async (req, res) => {
  try {
    const { originalUrl, short } = req.body;
    const result = await urlModel.insertUrl(originalUrl, short);
    res.status(201).json({ message: 'URL creada', data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la URL' });
  }
};

// Eliminar por ID
const borrarUrlPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await urlModel.deleteUrl(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'URL no encontrada' });
    }

    res.status(200).json({ message: 'URL eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la URL' });
  }
};

// Eliminar por short
const borrarUrlPorShort = async (req, res) => {
  try {
    const { short } = req.params;
    const result = await urlModel.deleteUrlByShort(short);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'URL no encontrada' });
    }

    res.status(200).json({ message: 'URL eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la URL' });
  }
};

module.exports = {
  agregar,
  borrarUrlPorId,
  borrarUrlPorShort
};