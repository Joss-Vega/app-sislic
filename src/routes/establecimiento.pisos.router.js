const { Router } = require("express");

const router = Router();

const {
  DeletePisosEstablecimiento,
  ObtenerDatosPisosEstablecimiento,
} = require("../controllers/establecimiento.pisos.controller");

router.get(
  "/obtener_datos_pisos_establecimiento",
  ObtenerDatosPisosEstablecimiento
);

router.delete(
  "/delete_datos_pisos_establecimiento",
  DeletePisosEstablecimiento
);

module.exports = router;
