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

module.exports = { agregarDireccion, editarDireccion }