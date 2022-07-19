const { Router } = require("express");
const actividadEconomicaRouter = Router();

const {
  obtener_lista_actividad_economico,
} = require("../controllers/actividad.economica.controller");

actividadEconomicaRouter.get(
  "/obtener_actividad_economico",
  obtener_lista_actividad_economico
);

module.exports = actividadEconomicaRouter;
