const { Router } = require("express");

const solicitudDocumentoRouter = Router();

const {
  SubirVoucher,
  insertSolicitud_Documentos,
  modificar_estado_Documentos,
  obtener_lista_Documentos,
  obtener_tipo_documentos,
} = require("../controllers/solicitud.documento.controller");
const { uploadVoucher } = require("../libs/upload");

solicitudDocumentoRouter.post(
  "/subir_voucher/:id_solicitud",
  uploadVoucher,
  SubirVoucher
);

solicitudDocumentoRouter.post(
  "/insertSolicitud_Documentos",
  insertSolicitud_Documentos
);

solicitudDocumentoRouter.get(
  "/obtener_lista_documentos/:idsolicitud",
  obtener_lista_Documentos
);

solicitudDocumentoRouter.put(
  "/modificar_estado_documentos",
  modificar_estado_Documentos
);

solicitudDocumentoRouter.get(
  "/obtener_tipo_documentos",
  obtener_tipo_documentos
);

module.exports = solicitudDocumentoRouter;
