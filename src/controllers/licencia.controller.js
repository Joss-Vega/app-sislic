const pool = require("../database");
const licenciaCtr = {};
licenciaCtr.ObtenerLicencias = async (req, res) => {
  try {
    const {
      id_establecimiento,
      id_solicitud,
      id_usuarioemi,
      nro_licencia,
      link_file,
      comentario,
    } = req.body;
    const response = await pool.query(
      `insert into licencia (id_establecimiento,id_solicitud,id_usuarioemi,nro_licencia,fecha_emision,link_file,comentario)
            values ($1,$2,$3,$4,now(),$5,$6);`,
      [
        id_establecimiento,
        id_solicitud,
        id_usuarioemi,
        nro_licencia,
        link_file,
        comentario,
      ]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};
licenciaCtr.generarLicencia = async (req, res, next) => {
  try {
    const {
        nro_licencia
    } = req.body;
  } catch (error) {
    next(error);
  }
};

module.exports = licenciaCtr;
