const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const establecimientoRoutes = require("./routes/establecimiento.router");
const contribuyenteRoutes = require("./routes/contribuyente.router");
const solicitudRoutes = require("./routes/solicitud.router");
const solicitudhistoricoRoutes = require("./routes/solicitudhistorico.router");
const solicitud_documentoRoutes = require("./routes/solicitud.documento.router");
const ActividadEconomicoRoutes = require("./routes/actividad.economico.router");
const inspeccionRoutes = require("./routes/inspeccion.router");
const imgRouter = require("./routes/image.router");
const establecimientoPisosRouter = require("./routes/establecimiento.pisos.router");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("Bienvenido a la API de SISLIC");
});

//nuestre rutas
app.use("/api/solicitud", solicitudRoutes);
app.use("/api/contribuyente", contribuyenteRoutes);
app.use("/api/establecimiento", establecimientoRoutes);
app.use("/api/solicitudhistorico", solicitudhistoricoRoutes);
app.use("/api/solicitud_documento", solicitud_documentoRoutes);
app.use("/api/solicitud_actividad_economico", ActividadEconomicoRoutes);
app.use("/api/inspeccion", inspeccionRoutes);
app.use("/api/upload", imgRouter );
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/establecimientoPisos", establecimientoPisosRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;