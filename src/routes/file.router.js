const { Router } = require("express");
const fileRouter = Router();
const pool = require("../database");
const filesIDS = ["1", "2", "3", "4"];
const { v4 } = require("uuid");
const multer = require("multer");
const { uploadFile } = require("../firebase/firebase.config");
const { sendEmisionLicencia } = require("../libs/mailer");
const acceptedFileTypes = ["application/pdf", "image/png", "image/jpeg"];
const ContribuyenteService = require("../services/contribuyente.service");
const EstablecimientoService = require("../services/establecimiento.service");
const ActividadEconomicaService = require("../services/actividad.economica.service");
const SolicitudService = require("../services/solicitud.service");
const passport = require("passport");
const contribuyenteService = new ContribuyenteService();
const establecimientoService = new EstablecimientoService();
const actividadEconomicaService = new ActividadEconomicaService();
const solicitudService = new SolicitudService();

require("../auth/strategies/jwt.strategy");

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
  limits: { fileSize: 5000000 },
});

fileRouter.post(
  "/voucher/:codigo",
  bufferUpload.single("voucher"),
  (req, res, next) => {
    try {
      const { codigo } = req.params;

      const { originalname, buffer } = req.file;
      const newName = getUniqueFile(originalname);
      uploadFile(newName, `vouchers/${codigo}`, buffer).then((result) => {
        pool
          .query(
            "update solicitud set id_solestado = 4,voucher =$1 where codigo_solicitud = $2",
            [newName, codigo]
          )
          .then((result) => {
            res.json({
              ok: true,
              message: "Archivo subido correctamente",
              file: newName,
            });
          });
      });
    } catch (error) {
      next(error);
    }
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
  async (req, res, next) => {
    try {
      const pisos = [...req.body.pisos.split(",")].map(Number);

      console.log(req.body);
      const id_contribuyente = await contribuyenteService.insertContribuyente(
        req.body
      );
      const id_establecimiento =
        await establecimientoService.insertEstablecimiento({
          ...req.body,
          id_contribuyente,
          areaEstablecimiento: pisos.reduce((a, b) => a + b, 0),
        });

      await establecimientoService.insertPisosEstablecimiento({
        pisos,
        id_establecimiento,
      });

      await actividadEconomicaService.insertActividadesEconomicas({
        id_establecimiento,
        actividadesEconomicas: [
          ...req.body.selectedActividadesEconomicas.split(","),
        ],
      });
      const { id_solicitud, codigo_solicitud } =
        await solicitudService.insertSolicitud({
          ...req.body,
          id_contribuyente,
          id_establecimiento,
        });

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
            return uploadFile(
              e[2],
              codigo_solicitud,
              req.files[e[1]][0]["buffer"]
            );
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
      console.log(error)
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

fileRouter.post(
  "/inspeccion",
  passport.authenticate("jwt", { session: false }),
  bufferUpload.single("inspeccion"),
  async (req, res, next) => {
    try {
      const { id: id_usuario } = req.user;
      const { originalname, buffer } = req.file;

      const { id_solicitud, id_establecimiento, comentario, codigo_solicitud } =
        req.body;

      const newName = getUniqueFile(originalname);
      uploadFile(newName, `inspecciones/${codigo_solicitud}`, buffer).then(
        (result) => {
          pool
            .query(
              `insert into inspeccion (id_solicitud, id_establecimiento, comentario, link_file, fecha_registro,id_usuarioreg)
                  values ($1,$2,$3,$4,now(),$5) returning id_inspeccion;`,
              [
                id_solicitud,
                id_establecimiento,
                comentario,
                newName,
                id_usuario,
              ]
            )
            .then((data) => {
              pool
                .query(
                  "update solicitud set inspeccion = 1 where id_solicitud = $1",
                  [id_solicitud]
                )
                .then((data) => {
                  res.json({
                    ok: true,
                    message: "Archivo subido correctamente",
                    file: newName,
                  });
                });
            });
        }
      );
    } catch (e) {
      next(e);
    }
  }
);

fileRouter.post(
  "/licencia",
  passport.authenticate("jwt", { session: false }),
  bufferUpload.single("licencia"),
  (req, res, next) => {
    try {
      const { id: id_usuario } = req.user;
      const { originalname, buffer } = req.file;

      const {
        id_solicitud,
        id_establecimiento,
        numero_licencia,
        comentario,
        codigo_solicitud,
        correo,
      } = req.body;

      const newName = getUniqueFile(originalname);
      uploadFile(newName, `licencias/${codigo_solicitud}`, buffer).then(
        (result) => {
          pool
            .query(
              "insert into licencia (id_establecimiento,id_solicitud,id_usuarioemi,nro_licencia,fecha_emision,link_file,comentario) values($1,$2,$3,$4,now(),$5,$6)",
              [
                id_establecimiento,
                id_solicitud,
                id_usuario,
                numero_licencia,
                newName,
                comentario,
              ]
            )
            .then((result) => {
              console.log(result);
              pool
                .query(
                  "update solicitud set id_solestado = 6 where id_solicitud = $1",
                  [id_solicitud]
                )
                .then((result) => {
                  console.log(result);
                  sendEmisionLicencia({
                    codigo_solicitud,
                    numero_licencia,
                    correo,
                    comentario,
                    archivo: newName,
                  });
                  res.json({
                    ok: true,
                    message: "Archivo subido correctamente",
                    file: newName,
                  });
                });
            });
        }
      );
    } catch (error) {
      next(error);
    }
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
