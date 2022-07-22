const { Router } = require("express");

const nivelRiesgoRouter = Router();
const {
  getNivelRiesgo,
  evaluarRiesgo,
} = require("../controllers/nivel.riesgo.controller");
nivelRiesgoRouter.get("/", getNivelRiesgo);
nivelRiesgoRouter.put("/solicitud/:id_solicitud", evaluarRiesgo);

module.exports = nivelRiesgoRouter;
