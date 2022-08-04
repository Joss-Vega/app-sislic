const pool = require("../database");
// const helpers = require('../libs/helpers');
const { sendSolicitudCodeEmail } = require("../libs/mailer");
//insertar establecimiento
const solicitudCtr = {};
const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getSolicitudByEstadoQuery = (estado, condition = "") => {
  return `select e.id_establecimiento,
  s.id_solicitud,
  c.tipo_contribuyente,
  c.ruc,
  c.razon_social,
  c.direccion direccion_contribuyente,
  c.distrito,
  c.provincia,
  c.departamento,
  c.reg_tributario,
  s.notif_direccion,
  s.notif_distrito,
  s.correo,
  s.telefono,
  e.direccion direccion_establecimiento,
  e.numero,
  e.letra,
  e.interior,
  e.interior_let,
  e.mz,
  e.lote,
  e.bloque,
  e.dpto,
  e.urb,
  e.tipo_predio,
  e.clasificacion,
  e.zonificacion,
  e.nombre_comercial,
  e.area_local,
  e.aforo,
  e.antiguedad,
  e.referencia,
  e.empleados,
  e.pisos,
  s.codigo_solicitud,
  s.id_solestado,
  s.tipotramite
from solicitud s
  join contribuyente c on (s.id_contribuyente = c.id_contribuyente)
  join solicitud_estado se on (se.id_solestado = s.id_solestado)
  join establecimiento e on (e.id_establecimiento = s.id_establecimiento) 
  where s.id_solestado=${estado} ${condition};`;
};

//Insertar Solicitudes
solicitudCtr.insertSolicitud = async (req, res) => {
  try {
    const {
      id_contribuyente,
      id_establecimiento,
      tipoTramite,
      direccionNotificacion,
      distritoNotificacion,
      email,
      telefono,
    } = req.body;
    const codigo_solicitud = makeid(10);
    pool
      .query(
        `insert into solicitud (id_contribuyente, id_establecimiento, tipotramite, notif_direccion, notif_distrito, correo, telefono, anexo_02, declaracion_jurada,
                fecha_reg, codigo_solicitud, id_solestado)
                values ($1,$2,$3,$4,$5,$6,$7,1,1,now(),$8,1) returning id_solicitud;`,
        [
          id_contribuyente,
          id_establecimiento,
          tipoTramite,
          direccionNotificacion,
          distritoNotificacion,
          email,
          telefono,
          codigo_solicitud,
        ]
      )
      .then(({ rows }) => {
        sendSolicitudCodeEmail(email, codigo_solicitud);

        return res.status(200).json({
          id_solicitud: rows[0].id_solicitud,
          codigo_solicitud,
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudCtr.obtener_lista_solicitudes_pendientes_validados = async (
  req,
  res
) => {
  try {
    const response = await pool.query(
      `select 
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite, 
                c.ruc, c.razon_social, 
                case when c.reg_tributario = '1' then 'R�GIMEN GENERAL' end regimen_tributario,
                e.tipo_predio,  e.clasificacion, e.zonificacion, e.direccion, s.fecha_reg 
                from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente 
                where s.id_solestado = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudCtr.obtener_datos_colicitud_contribuyentes_establecimiento = async (
  req,
  res
) => {
  try {
    const response = await pool.query(
      `select
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite,
                --Datos de contribuyente
                c.ruc, c.razon_social, c.direccion, c.distrito, c.provincia, c.departamento, c.correo, c.telefono,
                --Datos de establecimiento
                e.nombre_comercial, e.tipo_predio, e.clasificacion, e.zonificacion, e.direccion, e.referencia, e.area_local, e.aforo,
                e.antiguedad, e.pisos
                from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente
                where s.id_solicitud  = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU06
//Consultas de tasa
solicitudCtr.obtener_consultas_tasa = async (req, res) => {
  try {
    const response = await pool.query(
      `select 
                case when nivel_riesgo = '1' then 'Riesgo bajo' end, 
                tasa from solicitud s
                where s.codigo_solicitud = '000001';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU06
//Registrar constancia de pago
solicitudCtr.modificar_registro_constancia_pago = async (req, res) => {
  try {
    const { voucher, pago, id_solestado, id_solicitud } = req.body;
    const response = await pool.query(
      `update solicitud 
                set voucher  = $1, pago  = $2, id_solestado = $3
                where id_solicitud = $4;`,
      [voucher, pago, id_solestado, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU07 ---- VALIDAR PAGO
//Listar solicitud con pago registrados(pagados)
solicitudCtr.obtener_listas_solicitud_con_pago = async (req, res) => {
  try {
    const response = await pool.query(
      `select se.nombre estado,
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite, 
                c.ruc, c.razon_social, 
                case when c.reg_tributario = '1' then 'R�GIMEN GENERAL' end regimen_tributario,
                e.tipo_predio,  e.clasificacion, e.zonificacion, e.direccion, s.fecha_reg from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente 
                inner join solicitud_estado se on s.id_solestado  = se.id_solestado 
                where s.id_solestado = '4';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU07 ---- VALIDAR PAGO
//Voucher de pago, nivel de riesgo y tasa
solicitudCtr.obtener_voucher_pago_nivelriesgo_tasa = async (req, res) => {
  try {
    const response = await pool.query(
      `select voucher, nivel_riesgo, tasa from solicitud s 
                where id_solicitud = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU07 ---- VALIDAR PAGO
//Validar pago
solicitudCtr.obtener_pago_validado = async (req, res) => {
  try {
    const response = await pool.query(
      `update solicitud 
                set id_solestado = '5'
                where id_solicitud = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU10 ------ USUARIOS
//Obtener datos de solicitud, contribuyente y establecimiento
solicitudCtr.obtener_datos_solicitud_contri_establecimiento = async (
  req,
  res
) => {
  try {
    const response = await pool.query(
      `select
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite,
                --Datos de contribuyente
                c.ruc, c.razon_social, c.direccion, c.distrito, c.provincia, c.departamento, c.correo, c.telefono,
                --Datos de establecimiento
                e.nombre_comercial, e.tipo_predio, e.clasificacion, e.zonificacion, e.direccion, e.referencia, e.area_local, e.aforo,
                e.antiguedad, e.pisos
                from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente
                where s.id_solicitud  = '1';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU08 ---------- INSPECCION
//Obtener lista de solicitudes con pago registrados(pagados)
solicitudCtr.obtener_lista_solicitud_pago_registrados = async (req, res) => {
  try {
    const response = await pool.query(
      `select se.nombre estado,
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite, 
                c.ruc, c.razon_social, 
                case when c.reg_tributario = '1' then 'R�GIMEN GENERAL' end regimen_tributario,
                e.tipo_predio,  e.clasificacion, e.zonificacion, e.direccion, s.fecha_reg 
                from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente 
                inner join solicitud_estado se on s.id_solestado  = se.id_solestado 
                where s.id_solestado = '5' and s.nivel_riesgo in ('3','4') and s.inspeccion is null;`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU08 -------- INSPECCION
//Modificar solicitudes de inspeccion
solicitudCtr.modificar_solicitud_inspeccion = async (req, res) => {
  try {
    const { inspeccion, id_solicitud } = req.body;
    const response = await pool.query(
      `update solicitud 
                set inspeccion = $1 
                where id_solicitud = $2;`,
      [inspeccion, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//CU04 ------- EVALUAR RIESGO
//Obtener lista de solicitudes pendientes de evaluacion riesgo(validadas)
solicitudCtr.obtener_lista_solicitud_pendiente_evaluarRiesgo = async (
  req,
  res
) => {
  try {
    const response = await pool.query(
      `select 
                case when s.tipotramite = '1' then 'SOLO LIC. DE FUNCIONAMIENTO' end tipo_tramite, 
                c.ruc, c.razon_social, 
                case when c.reg_tributario = '1' then 'R�GIMEN GENERAL' end regimen_tributario,
                e.tipo_predio,  e.clasificacion, e.zonificacion, e.direccion, s.fecha_reg 
                from solicitud s 
                inner join establecimiento e on s.id_contribuyente = e.id_contribuyente
                inner join contribuyente c on s.id_contribuyente  = c.id_contribuyente 
                where s.id_solestado = '2';`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudCtr.getSolicitudesRegistradas = async (req, res, next) => {
  try {
    const response = await pool.query(getSolicitudByEstadoQuery(1));
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudesValidadas = async (req, res, next) => {
  try {
    const response = await pool.query(getSolicitudByEstadoQuery(2));
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudesRiesgosEvaluados = async (req, res, next) => {
  try {
    const response = await pool.query(getSolicitudByEstadoQuery(3));
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};
solicitudCtr.getSolicitudesPagadas = async (req, res, next) => {
  try {
    const response = await pool.query(getSolicitudByEstadoQuery(4));
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};
solicitudCtr.getSolicitudesPagadasValidadas = async (req, res, next) => {
  try {
    const response = await pool.query(
      getSolicitudByEstadoQuery(
        5,
        "and s.id_riesgo in (1,2) or (s.id_solestado=5 and  s.inspeccion is not null and s.id_riesgo in (3,4))"
      )
    );
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};
solicitudCtr.getSolicitudesInspeccion = async (req, res, next) => {
  try {
    const response = await pool.query(
      getSolicitudByEstadoQuery(
        5,
        "and s.id_riesgo in (3,4) and s.inspeccion is null"
      )
    );
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudesEmitidas = async (req, res, next) => {
  try {
    const response = await pool.query(getSolicitudByEstadoQuery(6));
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};
solicitudCtr.validarSolicitud = async (req, res, next) => {
  try {
    const response = await pool.query(
      `update solicitud set id_solestado = 2 where id_solicitud=$1;
    `,
      [req.body.id_solicitud]
    );

    res.json({
      message: "Solicitud validada correctamente",
      data: response.rows,
    });
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudesByCodigo = (req, res, next) => {
  try {
    const { codigo } = req.params;
    console.log(codigo);
    pool
      .query(
        "select * from solicitud s join solicitud_estado se on (s.id_solestado = se.id_solestado) where codigo_solicitud=$1",
        [codigo]
      )
      .then((data) => {
        res.json(data.rows);
      });
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudByCodigoEvaluada = (req, res, next) => {
  try {
    const { codigo } = req.params;
    pool
      .query(
        "select s.codigo_solicitud,s.tipotramite,se.nombre estado_nombre, nr.nombre riesgo_nombre,nr.tasa from solicitud s join solicitud_estado se on (s.id_solestado = se.id_solestado) join nivel_riesgo nr on (nr.id_riesgo = s.id_riesgo) where codigo_solicitud=$1 and s.id_solestado = 3",
        [codigo]
      )
      .then((data) => {
        const [s] = data.rows;
        res.json(s || {});
      });
  } catch (error) {
    next(error);
  }
};

solicitudCtr.getSolicitudByCodigoPagada = (req, res, next) => {
  try {
    const { codigo } = req.params;
    pool
      .query(
        "select s.codigo_solicitud,s.tipotramite,s.voucher,se.nombre estado_nombre, nr.nombre riesgo_nombre,nr.tasa from solicitud s join solicitud_estado se on (s.id_solestado = se.id_solestado) join nivel_riesgo nr on (nr.id_riesgo = s.id_riesgo) where codigo_solicitud=$1 and s.id_solestado = 4",
        [codigo]
      )
      .then((data) => {
        const [s] = data.rows;
        res.json(s || {});
      });
  } catch (error) {
    next(error);
  }
};
solicitudCtr.validarPago = (req, res, next) => {
  try {
    const { codigo } = req.body;
    console.log(codigo);
    pool
      .query(
        "update solicitud set id_solestado = 5 where codigo_solicitud=$1;",
        [codigo]
      )
      .then((data) => {
        res.json(data.rows);
      });
  } catch (error) {
    next(error);
  }
};
solicitudCtr.rechazarSolicitud = (req, res, next) => {
  try {
    const { id_solicitud } = req.params;
    const { motivo } = req.body;
    console.log(id_solicitud, motivo);
    pool
      .query(
        `update solicitud set id_solestado = 0, motivo_rechazo = $2  where id_solicitud=$1;`,
        [id_solicitud, motivo]
      )
      .then((data) => {
        res.json(data.rows);
      });
  } catch (error) {
    next(error);
  }
};
module.exports = solicitudCtr;
