const { Router } = require("express");
const solicitudHistoricoRouter = Router();

const {
  insertSolicitud_Historico,
} = require("../controllers/solicitudhistorico.controller");

solicitudHistoricoRouter.post(
  "/insert_Solicitud_historico",
  insertSolicitud_Historico
);

module.exports = solicitudHistoricoRouter;
