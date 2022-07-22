const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path")
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
console.log();
app.use("/uploads", express.static(path.join(__dirname, "..","uploads")));

app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("IP:", ip);
  next();
});

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
