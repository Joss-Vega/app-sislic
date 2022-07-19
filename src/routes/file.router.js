const { Router } = require("express");

const fileRouter = Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

fileRouter.post(
  "/voucher/:id_solicitud",
  upload.single("voucher"),
  (req, res, next) => {
    console.log(req.file);
    res.json({
      status: "hola",
    });
  }
);

module.exports = fileRouter;
