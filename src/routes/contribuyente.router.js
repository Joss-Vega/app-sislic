const { Router } = require("express");

const contribuyenteRouter = Router();

const {
  insertContribuyente,
  getContibruyenteFromAPI,
  getCaptcha,
  getSolicitudesByRuc,
} = require("../controllers/contribuyente.controller");

contribuyenteRouter.post("/insertContribuyente", insertContribuyente);
contribuyenteRouter.get("/ruc/:ruc", getContibruyenteFromAPI);
contribuyenteRouter.get("/captcha", getCaptcha);
contribuyenteRouter.get("/solicitudes/:ruc", getSolicitudesByRuc);
module.exports = contribuyenteRouter;
