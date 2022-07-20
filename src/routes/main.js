const apiRouter = require("express").Router();

const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const establecimientoRouter = require("./establecimiento.router");
const contribuyenteRouter = require("./contribuyente.router");
const solicitudRouter = require("./solicitud.router");
const solicitudHistoricoRouter = require("./solicitud.historico.router");
const solicitudDocumentoRouter = require("./solicitud.documento.router");
const actividadEconomicaRouter = require("./actividad.economica.router");
const inspeccionRouter = require("./inspeccion.router");
const fileRouter = require("./file.router");
const establecimientoPisosRouter = require("./establecimiento.pisos.router");
const licenciaRouter = require("./licencia.router");

apiRouter.use("/solicitud", solicitudRouter);
apiRouter.use("/contribuyente", contribuyenteRouter);
apiRouter.use("/establecimiento", establecimientoRouter);
apiRouter.use("/solicitudhistorico", solicitudHistoricoRouter);
apiRouter.use("/solicitud_documento", solicitudDocumentoRouter);
apiRouter.use("/solicitud_actividad_economico", actividadEconomicaRouter);
apiRouter.use("/inspeccion", inspeccionRouter);
apiRouter.use("/licencias", licenciaRouter);
apiRouter.use("/files", fileRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/establecimientoPisos", establecimientoPisosRouter);

module.exports = apiRouter;
