const { Router } = require("express");
const actividadEconomicaRouter = Router();

const {
  obtener_lista_actividad_economico,
  insertActividadesEconomicas,
} = require("../controllers/actividad.economica.controller");

actividadEconomicaRouter.get(
  "/obtener_actividad_economico",
  obtener_lista_actividad_economico
);
actividadEconomicaRouter.post(
  "/bulk/:id_establecimiento",
  insertActividadesEconomicas
);


module.exports = actividadEconomicaRouter;
