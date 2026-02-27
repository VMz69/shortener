require("dotenv").config();
const express = require("express");
const urlRouter = require("./routers/urlRouter")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ server: "ok" })
})

app.use("/url", urlRouter)

app.listen(3000, () => {
    console.log("Servidor corriendo")
})