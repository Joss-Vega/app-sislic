const { Router } = require("express");

const establecimientoRouter = Router();

const {
  insertEstablecimiento,
  insert_actividades_de_establecimiento,
  obtener_datos_Establecimiento,
  obtener_datos_de_actividad_de_establecimiento,
  getActividadesByEstablecimientoId,
} = require("../controllers/establecimiento.controller");

establecimientoRouter.post("/insertEstablecimiento", insertEstablecimiento);
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
establecimientoRouter.get("/actividad/:id_establecimiento", getActividadesByEstablecimientoId);

module.exports = establecimientoRouter;
