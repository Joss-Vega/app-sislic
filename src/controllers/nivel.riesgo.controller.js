const pool = require("../database");

nivelRiesgoController = {};

nivelRiesgoController.getNivelRiesgo = (req, res, next) => {
  try {
    pool.query("select * from nivel_riesgo").then((result) => {
      return res.json(result.rows);
    });
  } catch (error) {
    next(error);
  }
};

nivelRiesgoController.evaluarRiesgo = (req, res, next) => {
  const { id_riesgo } = req.body;
  const { id_solicitud } = req.params;
  try {
    pool
      .query(
        "update solicitud set id_riesgo = $1, id_solestado = 3 where id_solicitud = $2",
        [id_riesgo, id_solicitud]
      )
      .then((data) => {
        res.json(data.rows);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = nivelRiesgoController;
