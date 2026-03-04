require("dotenv").config();
const express = require('express');
require('dotenv').config();

const app = express();
const urlRouter = require('./routers/urlRouter');

app.use(express.json());
app.use('/url', urlRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});