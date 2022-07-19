const pool = require("../database");

const solicitudEstadoCtr = {};

//CU05
//Consultar estado
solicitudEstadoCtr.obtener_consultas_estado = async (req, res) => {
  try {
    const response = await pool.query(
      `select se.nombre , codigo_solicitud  
                  from solicitud  s inner join solicitud_estado se on s.id_solestado = se.id_solestado 
                  where s.codigo_solicitud = '000001';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudEstadoCtr.modificar_actualizaciones_estado_solicitud = async (
  req,
  res
) => {
  try {
    const { id_solestado, nivel_riesgo, tasa, id_solicitud } = req.body;
    const response = await pool.query(
      `update solicitud
                  set id_solestado  = $1, nivel_riesgo = $2, tasa = $3
                  where id_solicitud = $4;`,
      [id_solestado, nivel_riesgo, tasa, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudEstadoCtr.modificar_actualizaciones_validados_estado_solicitud =
  async (req, res) => {
    try {
      const { id_solestado, id_solicitud } = req.body;
      const response = await pool.query(
        `update solicitud
                  set id_solestado  = $1
                  where id_solicitud = $2;`,
        [id_solestado, id_solicitud]
      );
      return res.status(200).json(response.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Internal Server error...!");
    }
  };

//CU07 ---- VALIDAR PAGO
//Cambiar estado de solicitudes

solicitudEstadoCtr.modificar_estado_solicitud = async (req, res) => {
  try {
    const { id_solestado, id_solicitud } = req.body;
    const response = await pool.query(
      `update solicitud 
                  set id_solestado = $1
                  where id_solicitud = $2;`,
      [id_solestado, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

module.exports = solicitudEstadoCtr;
