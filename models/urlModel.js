const pool = require("../config/pool")

const agregarDireccion = async(nombreDeDireccion, direccionReal, direccionAcortada) => {
    await pool.execute("INSERT INTO direcciones (link_name, link_short, link_real) VALUES (?, ?, ?)", [nombreDeDireccion, direccionAcortada, direccionReal])
}

const buscarPorCodigo = async (codigo) => {
  const [rows] = await pool.execute(
    "SELECT link_real FROM direcciones WHERE link_short = ?",
    [codigo]
  );

  return rows[0];
};

module.exports = { agregarDireccion, buscarPorCodigo };