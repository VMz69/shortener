const pool = require("../config/pool")

const agregarDireccion = async(nombreDeDireccion, direccionReal, direccionAcortada) => {
    await pool.execute("INSERT INTO direcciones (link_name, link_short, link_real) VALUES (?, ?, ?)", [nombreDeDireccion, direccionAcortada, direccionReal])
}
const editarDireccion = async (codigo, nombreDeDireccion, direccionReal) => {
    await pool.execute(
        "UPDATE direcciones SET link_name = ?, link_real = ? WHERE link_short = ?",
        [nombreDeDireccion, direccionReal, codigo]
    );
};

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

module.exports = { agregarDireccion, editarDireccion, borrarPorId, borrarPorShort }
