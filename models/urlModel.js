const pool = require("../config/pool");

// Crear 
const agregarDireccion = async (nombreDeDireccion, direccionReal, direccionAcortada) => {
  await pool.execute(
    "INSERT INTO direcciones (link_name, link_short, link_real) VALUES (?, ?, ?)",
    [nombreDeDireccion, direccionAcortada, direccionReal]
  );
};

// Borrar por ID XD
const eliminarPorId = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM direcciones WHERE id = ?",
    [id]
  );
  return result.affectedRows; // 0 si no encontró, >0 si borró
};

// Borrar por link_short XD
const eliminarPorShort = async (shortCode) => {
  const [result] = await pool.execute(
    "DELETE FROM direcciones WHERE link_short = ?",
    [shortCode]
  );
  return result.affectedRows;
};

module.exports = {
  agregarDireccion,
  eliminarPorId,
  eliminarPorShort,
};