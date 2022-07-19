const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", function (req, res) {
  res.send("Bienvenido a la API de SISLIC");
});

app.use("/api", require("./routes/main"));

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
