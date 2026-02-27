const { nanoid } = require("nanoid");

const generarCodigo = () => {
    const code = nanoid(8);
    return code
}

module.exports = { generarCodigo }