const express = require("express");

const licenciaRouter = express.Router();

const {
  ObtenerLicencias,
  generarLicencia,
} = require("../controllers/licencia.controller");

licenciaRouter.get("/obtenerlicencias", ObtenerLicencias);
licenciaRouter.post("/genearLicencia", generarLicencia);

module.exports = licenciaRouter;
