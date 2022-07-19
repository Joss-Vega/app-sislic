const express = require("express");

const licenciaRouter = express.Router();

const { ObtenerLicencias } = require("../controllers/licencia.controller");

licenciaRouter.get("/obtenerlicencias", ObtenerLicencias);

module.exports = licenciaRouter;
