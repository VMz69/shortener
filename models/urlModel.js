const pool = require("../config/pool")

const agregarDireccion = async(nombreDeDireccion, direccionReal, direccionAcortada) => {
    await pool.execute("INSERT INTO direcciones (link_name, link_short, link_real) VALUES (?, ?, ?)", [nombreDeDireccion, direccionAcortada, direccionReal])
}
module.exports = { agregarDireccion }
// Borrar por ID
const borrarPorId = async (id) => {
    const [result] = await pool.execute("DELETE FROM direcciones WHERE id = ?", [id]);
    return result;
  };
  
  // Borrar por short code
  const borrarPorShort = async (short) => {
    const [result] = await pool.execute("DELETE FROM direcciones WHERE link_short = ?", [short]);
    return result;
  };
  
  module.exports = { agregarDireccion, borrarPorId, borrarPorShort };
  
