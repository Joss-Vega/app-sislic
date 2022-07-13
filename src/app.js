const express = require("express");
const morgan = require("morgan");

const userRoutes = require("./routes/user.routes");

const authRoutes = require("./routes/auth.routes");
const establecimientoRoutes = require("./routes/establecimiento.router");
const contribuyenteRoutes = require("./routes/contribuyente.router");
const solicitudRoutes = require("./routes/solicitud.router");
const solicitudhistoricoRoutes = require("./routes/solicitudhistorico.router");
const solicitud_documentoRoutes = require("./routes/solicitud.documento.router");
const ActividadEconomicoRoutes = require("./routes/actividad.economico.router");
const inspeccionRoutes = require("./routes/inspeccion.router");

const app = express();
var cors = require("cors");
const { encryptPassword } = require("./libs/helpers");

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.get("/", function (req, res, next) {
  res.send("Backend Oído Amigo Funciona Correctamente...!");
});

// app.use('/api/auth', authRoutes);
// app.use('/api/auth/users', userRoutes);

//nuestre rutas
app.use("/api/solicitud", solicitudRoutes);
app.use("/api/contribuyente", contribuyenteRoutes);
app.use("/api/establecimiento", establecimientoRoutes);
app.use("/api/solicitudhistorico", solicitudhistoricoRoutes);
app.use("/api/solicitud_documento", solicitud_documentoRoutes);
app.use("/api/solicitud_actividad_economico", ActividadEconomicoRoutes);
app.use("/api/inspeccion", inspeccionRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;