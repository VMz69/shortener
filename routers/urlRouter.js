const express = require("express");
const router = express.Router();
const {
  agregar,
  editar,
  borrarUrlPorId,
  borrarUrlPorShort,
  listar
} = require("../controllers/urlController");

/**
 * @openapi
 * /url/crear:
 *   post:
 *     summary: Crear una URL corta
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreDeDireccion
 *               - direccionReal
 *             properties:
 *               nombreDeDireccion:
 *                 type: string
 *                 example: Google
 *               direccionReal:
 *                 type: string
 *                 example: https://www.google.com
 *     responses:
 *       201:
 *         description: URL creada exitosamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error interno
 */
router.post("/crear", agregar);

/**
 * @openapi
 * /url/editar/{codigo}:
 *   put:
 *     summary: Editar una URL por su código corto
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código corto de la URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreDeDireccion:
 *                 type: string
 *                 example: Google actualizado
 *               direccionReal:
 *                 type: string
 *                 example: https://www.google.com.sv
 *     responses:
 *       200:
 *         description: URL editada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: URL no encontrada
 *       500:
 *         description: Error interno
 */
router.put("/editar/:codigo", editar);


/**
 * @openapi
 * /url/listar:
 *   get:
 *     summary: Listar todas las URLs creadas
 *     tags:
 *       - URL
 *     responses:
 *       200:
 *         description: Lista de URLs
 *       500:
 *         description: Error interno
 */
router.get("/listar", listar);

/**
 * @openapi
 * /url/{id}:
 *   delete:
 *     summary: Borrar una URL por ID
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la URL
 *     responses:
 *       200:
 *         description: URL eliminada correctamente
 *       404:
 *         description: URL no encontrada
 *       500:
 *         description: Error interno
 */
router.delete("/:id", borrarUrlPorId);

/**
 * @openapi
 * /url/code/{short}:
 *   delete:
 *     summary: Borrar una URL por código corto
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: short
 *         required: true
 *         schema:
 *           type: string
 *         description: Código corto de la URL
 *     responses:
 *       200:
 *         description: URL eliminada correctamente
 *       404:
 *         description: URL no encontrada
 *       500:
 *         description: Error interno
 */
router.delete("/code/:short", borrarUrlPorShort);



module.exports = router;