const { Router } = require("express");
const inspeccionRouter = Router();

const { insertInspeccion } = require("../controllers/inspeccion.controller");

inspeccionRouter.post("/", insertInspeccion);

module.exports = inspeccionRouter;
