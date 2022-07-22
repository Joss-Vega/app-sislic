const { Router } = require("express");

const router = Router();

const {
  DeletePisosEstablecimiento,
  getPisosEstablecimiento,
  insertPisosEstablecimiento,
} = require("../controllers/establecimiento.pisos.controller");

router.get("/establecimiento/:id_establecimiento", getPisosEstablecimiento);
router.post("/establecimiento/:id_establecimiento", insertPisosEstablecimiento);

router.delete(
  "/delete_datos_pisos_establecimiento",
  DeletePisosEstablecimiento
);

module.exports = router;
