require("dotenv").config();
const express = require("express");
const urlRouter = require("./routers/urlRouter");
const { redireccionar } = require("./controllers/urlController");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ACORTADOR URL",
      version: "1.0.0",
      description: "API para acortar URLs"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routers/*.js", "./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Redirecciona una URL corta
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Código corto de la URL
 *     responses:
 *       302:
 *         description: Redirección exitosa
 *       404:
 *         description: URL no encontrada
 */
app.get("/:id", redireccionar);

app.get("/", (req, res) => {
  res.status(200).json({ server: "ok" });
});

app.get("/:id", redireccionar);
app.use("/url", urlRouter);

//Mensaje que muestra que el servidor está corriendo y dónde encontrar la documentación de Swagger
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
  console.log("📚 Swagger disponible en http://localhost:3000/docs");
});