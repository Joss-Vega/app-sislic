const pool = require("../database");
// const helpers = require('../libs/helpers');

//insertar establecimiento
const establecimientoCtr = {};

establecimientoCtr.insertEstablecimiento = async (req, res) => {
  try {
    const {
      id_contribuyente,
      direccionEstablecimiento,
      numeroEstablecimiento,
      letraEstablecimiento,
      intEstablecimiento,
      letintEstablecimiento,
      mzEstablecimiento,
      loteEstablecimiento,
      bloqueEstablecimiento,
      dptoEstablecimiento,
      nucleoEstablecimiento,
      tipoEstablecimiento,
      clasificacionEstablecimiento,
      zonificacionEstablecimiento,
      areaEstablecimiento,
      aforoEstablecimiento,
      antiguedadEstablecimiento,
      nomComercialEstablecimiento,
      nEmpleadosEstablecimiento,
      referenciaEstablecimiento,
      nPisosEstablecimiento,
    } = req.body;
    const response = await pool.query(
      `insert into establecimiento (id_contribuyente, direccion, numero, letra, interior, interior_let, mz, lote, bloque, dpto, urb, 
                tipo_predio, clasificacion, zonificacion, area_local, aforo, antiguedad, nombre_comercial, empleados,referencia, 
                pisos)
                values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) returning id_establecimiento;`,
      [
        id_contribuyente,
        direccionEstablecimiento,
        numeroEstablecimiento,
        letraEstablecimiento,
        intEstablecimiento,
        letintEstablecimiento,
        mzEstablecimiento,
        loteEstablecimiento,
        bloqueEstablecimiento,
        dptoEstablecimiento,
        nucleoEstablecimiento,
        tipoEstablecimiento,
        clasificacionEstablecimiento,
        zonificacionEstablecimiento,
        areaEstablecimiento,
        aforoEstablecimiento,
        antiguedadEstablecimiento,
        nomComercialEstablecimiento,
        nEmpleadosEstablecimiento,
        referenciaEstablecimiento,
        nPisosEstablecimiento,
      ]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//insertar datos en el establecimiento
establecimientoCtr.obtener_datos_Establecimiento = async (req, res) => {
  try {
    const response = await pool.query(
      `select id_acteconomico
            from establecimiento_actividad ea
            inner join establecimiento e on ea.id_establecimiento = e.id_establecimiento
            inner join solicitud s  on e.id_establecimiento  = s.id_establecimiento 
            where s.id_solicitud = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//insert actividades de establecimiento
establecimientoCtr.insert_actividades_de_establecimiento = async (req, res) => {
  try {
    const { id_establecimiento, id_acteconomico } = req.body;
    const response = await pool.query(
      `insert into establecimiento_actividad (id_establecimiento,id_acteconomico)
            values ($1,$6); returning id_establecimiento`,
      [id_establecimiento, id_acteconomico]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//insert datos de actividad en el establecimiento
establecimientoCtr.obtener_datos_de_actividad_de_establecimiento = async (
  req,
  res
) => {
  try {
    const response = await pool.query(
      `select id_acteconomico
            from establecimiento_actividad ea
            inner join establecimiento e on ea.id_establecimiento = e.id_establecimiento
            inner join solicitud s  on e.id_establecimiento  = s.id_establecimiento 
            where s.id_solicitud = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};
establecimientoCtr.getActividadesByEstablecimientoId = async (
  req,
  res,
  next
) => {
  try {
    const { id_establecimiento } = req.params;
    const response = await pool.query(
      "select codigo,nombre,tipo_actividad from  establecimiento_actividad ea join actividad_economica ae on (ea.id_acteconomico=ae.id_acteconomico) where ea.id_establecimiento=$1",
      [id_establecimiento]
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = establecimientoCtr;
