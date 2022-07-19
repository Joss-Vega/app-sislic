const { Router } = require("express");

const establecimientoRouter = Router();

const {
  insertEstablecimiento,
  insert_actividades_de_establecimiento,
  obtener_datos_Establecimiento,
  obtener_datos_de_actividad_de_establecimiento,
} = require("../controllers/establecimiento.controller");

establecimientoRouter.post("/insertar_establecimiento", insertEstablecimiento);
establecimientoRouter.post(
  "/insert_actividades_establecimiento",
  insert_actividades_de_establecimiento
);

establecimientoRouter.get(
  "/obtener_datos_actividades_establecimiento",
  obtener_datos_de_actividad_de_establecimiento
);
establecimientoRouter.get(
  "/obtener_datos_establecimiento",
  obtener_datos_Establecimiento
);

module.exports = establecimientoRouter;
