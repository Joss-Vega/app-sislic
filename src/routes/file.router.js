const { Router } = require("express");

const fileRouter = Router();

const filesIDS = ["1", "2", "3", "4"];

const multer = require("multer");
const fileCB = (req, file, cb) => {
  // console.log("----------------AQUI EMPIEZA---------------");
  // console.log(req);

  // console.log("----------------AQUI TERMINA---------------");
  cb(null, true);
  // filesIDS.every((id) => Object.keys(req.files).includes(id)) ? cb(null, true): cb(null, false);
};

const upload = multer({
  dest: "uploads/",
  fileFilter: fileCB,
  limits: { fileSize: 5000000 },
});

fileRouter.post(
  "/voucher/:id_solicitud",
  upload.single("voucher"),
  (req, res, next) => {
    console.log(req.files);
    res.json({
      status: "hola",
    });
  }
);

fileRouter.post(
  "/documentos/:id_solicitud",
  upload.fields([
    { name: "1", maxCount: 1 },
    { name: "2", maxCount: 1 },
    { name: "3", maxCount: 1 },
    { name: "4", maxCount: 1 },
  ]),
  (req, res, next) => {
    try {
      if (Object.keys(req.files).length != 0) {
        return res.json({
          status: "uploaded",
        });
      }

      throw new Error("No se encontraron archivos");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = fileRouter;
