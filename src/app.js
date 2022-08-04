const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());
app.get("/", function (req, res) {
  res.send("Bienvenido a la API de SISLIC");
});

app.get("/test", (req, res) => {
  res.send("Hola mundo");
});

app.use("/api", require("./routes/main"));

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
