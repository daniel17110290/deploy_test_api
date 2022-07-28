const { Router } = require("express");
const axios = require("axios");
const { Text } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const text = require("./textRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/iecho", text);

module.exports = router;
