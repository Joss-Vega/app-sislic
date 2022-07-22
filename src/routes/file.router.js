const { Router } = require("express");
const fileRouter = Router();
const pool = require("../database");
const filesIDS = ["1", "2", "3", "4"];
const { v4 } = require("uuid");
const multer = require("multer");
const { firebaseStorage, uploadFile } = require("../firebase/firebase.config");
const fileCB = (req, file, cb) => {
  // console.log("----------------AQUI EMPIEZA---------------");
  // console.log(req);

  // console.log("----------------AQUI TERMINA---------------");
  cb(null, true);
  // filesIDS.every((id) => Object.keys(req.files).includes(id)) ? cb(null, true): cb(null, false);
};

const upload = multer({
  fileFilter: fileCB,
  limits: { fileSize: 5000000 },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      file.originalname = `${v4()}.${ext}`;

      cb(null, file.originalname);
    },
  }),
});

const bufferUpload = multer({
  storage: multer.memoryStorage(),
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
  "/documentos/:id_solicitud/:codigo",
  bufferUpload.fields([
    { name: "1", maxCount: 1 },
    { name: "2", maxCount: 1 },
    { name: "3", maxCount: 1 },
    { name: "4", maxCount: 1 },
  ]),
  (req, res, next) => {
    try {
      const { id_solicitud, codigo } = req.params;
      console.log(req.files);
      if (Object.keys(req.files).length != 0 && id_solicitud) {
        const files = Object.keys(req.files).map((e) => {
          return [
            id_solicitud,
            req.files[e][0]["fieldname"],
            getUniqueFile(req.files[e][0]["originalname"]),
          ];
        });

        const query = getFileQuery(files.length);
        const fd = files.join().split(",");
        console.log(query, fd, files);
        Promise.all(
          files.map((e) => {
            return uploadFile(e[2], codigo, req.files[e[1]][0]["buffer"]);
          })
        ).then((data) => {
          console.log(data);
          pool.query(query, fd).then((data) => {
            console.log(data);
            return res.json({
              count: data.rowCount,
              status: "uploaded",
            });
          });
        });
        //
      } else {
        throw new Error("No se encontraron archivos");
      }
    } catch (error) {
      next(error);
    }
  }
);

fileRouter.post(
  "/firebase",
  bufferUpload.single("a"),
  async (req, res, next) => {
    uploadFile(getUniqueFile(req.file.originalname), "uploads").then((data) => {
      res.json({
        status: "hola",
      });
    });
  }
);

const getUniqueFile = (filename) => {
  return `${v4()}.${filename.split(".")[filename.split(".").length - 1]}`;
};

const getFileQuery = (n) => {
  let query = `insert into solicitud_documentos(id_solicitud,id_tipodoc,link_file) values ($1,$2,$3)`;
  let c = 4;
  for (let i = 2; i <= n; i++) {
    query += `, ($${c},$${++c},$${++c})`;
    c++;
  }
  return query;
};

module.exports = fileRouter;
