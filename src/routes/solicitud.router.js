const { Router } = require("express");
const solicitudRouter = Router();
const { hasRole } = require("../auth/token_validation");
const {
  insertSolicitud,
  getSolicitudesEmitidas,
  getSolicitudesPagadas,
  getSolicitudesPagadasValidadas,
  getSolicitudesRegistradas,
  getSolicitudesRiesgosEvaluados,
  getSolicitudesValidadas,
  modificar_registro_constancia_pago,
  modificar_solicitud_inspeccion,
  obtener_consultas_tasa,
  obtener_datos_colicitud_contribuyentes_establecimiento,
  obtener_datos_solicitud_contri_establecimiento,
  obtener_lista_solicitud_pago_registrados,
  obtener_lista_solicitud_pendiente_evaluarRiesgo,
  obtener_lista_solicitudes_pendientes_validados,
  obtener_listas_solicitud_con_pago,
  obtener_pago_validado,
  obtener_voucher_pago_nivelriesgo_tasa,
  validarSolicitud,
  getSolicitudesByCodigo,
  getSolicitudByCodigoEvaluada,
  getSolicitudByCodigoPagada,
  validarPago,
  rechazarSolicitud,
  getSolicitudesInspeccion,
  rechazarPago,
} = require("../controllers/solicitud.controller");

solicitudRouter.post("/insertSolicitud", insertSolicitud);

solicitudRouter.get(
  "/obtener_lista_solicitud_pendientes_validados",
  obtener_lista_solicitudes_pendientes_validados
);
solicitudRouter.get(
  "/obtener_datos_solicitud_contribuyentes_establecimiento",
  obtener_datos_colicitud_contribuyentes_establecimiento
);
solicitudRouter.get("/obtener_consultas_tasa", obtener_consultas_tasa);
solicitudRouter.get(
  "/obtener_listas_solicitud_pago",
  obtener_listas_solicitud_con_pago
);
solicitudRouter.get(
  "/obtener_voucher_pago_nivelRiesgo_tasa",
  obtener_voucher_pago_nivelriesgo_tasa
);
solicitudRouter.get("/obtener_pago_validado", obtener_pago_validado);
solicitudRouter.get(
  "/obtener_datos_solicitud_contri_establecimiento",
  obtener_datos_solicitud_contri_establecimiento
);
solicitudRouter.get(
  "/obtene_lista_solicitud_pago_registrados",
  obtener_lista_solicitud_pago_registrados
);
solicitudRouter.get(
  "/obtener_lista_solicitud_pendiente_evaluarRiesgo",
  obtener_lista_solicitud_pendiente_evaluarRiesgo
);

solicitudRouter.put(
  "/modificar_registro_constancia_pago",
  modificar_registro_constancia_pago
);
solicitudRouter.put(
  "/modificar_solicitud_inspeccion",
  modificar_solicitud_inspeccion
);
solicitudRouter.get("/registradas", getSolicitudesRegistradas);
solicitudRouter.get("/validadas", getSolicitudesValidadas);
solicitudRouter.get("/riesgos_evaluados", getSolicitudesRiesgosEvaluados);
solicitudRouter.get("/pagadas", getSolicitudesPagadas);
solicitudRouter.get("/pagadas_validadas", getSolicitudesPagadasValidadas);
solicitudRouter.get("/inspeccion", getSolicitudesInspeccion);

solicitudRouter.get("/emitidas", getSolicitudesEmitidas);
solicitudRouter.put("/validar", validarSolicitud);
solicitudRouter.put("/validar_pago", validarPago);
solicitudRouter.put("/rechazar/:id_solicitud", rechazarSolicitud);
solicitudRouter.put("/pago/:codigo_solicitud", rechazarPago);

solicitudRouter.get("/codigo/:codigo", getSolicitudesByCodigo);
solicitudRouter.get("/codigo/:codigo/evaluada", getSolicitudByCodigoEvaluada);
solicitudRouter.get("/codigo/:codigo/pagada", getSolicitudByCodigoPagada);

module.exports = solicitudRouter;
