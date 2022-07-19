const { Router } = require("express");

const solicitudEstadoRouter = Router();

const {
  modificar_actualizaciones_validados_estado_solicitud,
  obtener_consultas_estado,
  modificar_actualizaciones_estado_solicitud,
  modificar_estado_solicitud,
} = require("../controllers/solicitud.estado.controller");

solicitudEstadoRouter.get(
  "/obtener_consultas_estado",
  obtener_consultas_estado
);

solicitudEstadoRouter.put(
  "/modificar_actualizaciones_estado_solicitud",
  modificar_actualizaciones_estado_solicitud
);

solicitudEstadoRouter.put(
  "/modificar_actualizaciones_validados_estado_solicitud",
  modificar_actualizaciones_validados_estado_solicitud
);

solicitudEstadoRouter.put(
  "/modificar_estado_solicitud",
  modificar_estado_solicitud
);

router.exports = solicitudEstadoRouter;
