const { Router } = require("express");
const { sendSolicitudCodeEmail,sendSolicitudRechazada, sendPagoRechazado } = require("../libs/mailer");
const mailerRouter = Router();

mailerRouter.get("/", (req, res) => {
  sendPagoRechazado("jezerrazuri@upeu.edu.pe");

  res.json({
    message: "sended",
  });
});

module.exports = mailerRouter;
