const pool = require("../database");
// const helpers = require('../libs/helpers');

//insertar solicitud documento
const solicitudDocumentoCtr = {};

//Insertar solicitudes de documentos
solicitudDocumentoCtr.insertSolicitud_Documentos = async (req, res) => {
  try {
    const { id_solicitud, id_tipodoc, link_file } = req.body;
    const response = await pool.query(
      `insert into solicitud_documentos (id_solicitud, id_tipodoc, link_file, estado)
                values ($1,$2,$3,'1') returning id_documento;`,
      [id_solicitud, id_tipodoc, link_file]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//lISTA DE DOCUMENTOS
solicitudDocumentoCtr.obtener_lista_Documentos = async (req, res) => {
  try {
    const { idsolicitud } = req.params;
    const response = await pool.query(
      `select * 
                from solicitud_documentos sd 
                where sd.id_solicitud  = $1;`,
      [idsolicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//Actualizaciones de estados de los documentos
solicitudDocumentoCtr.modificar_estado_Documentos = async (req, res) => {
  try {
    const { estado, observaciones, id_usuariorev, id_solicitud } = req.body;
    const response = await pool.query(
      `update solicitud_documentos 
                set estado = $1, observaciones = $2, id_usuariorev = $3
                where id_solicitud = $4;`,
      [estado, observaciones, id_usuariorev, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

//Subir Voucher
solicitudDocumentoCtr.SubirVoucher = async (req, res) => {
  try {
    const voucher = req.file.originalname;
    console.log(voucher);
    const { id_solicitud } = req.params;
    const response = await pool.query(
      `update solicitud 
                set voucher = $1
                where id_solicitud = $2;`,
      [voucher, id_solicitud]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

solicitudDocumentoCtr.obtener_tipo_documentos = async (req, res, next) => {
  try {
    const response = await pool.query(`select * from solicitud_tipodoc;`);
    return res.status(200).json(response.rows);
  } catch (e) {
    next(e);
  }
};

solicitudDocumentoCtr.getDocumentosBySolicitud = async (req, res, next) => {
  try {
    const { id_solicitud } = req.params;
    const response = await pool.query(
      `select sd.id_documento,st.nombre,sd.link_file,sd.observaciones from solicitud_documentos sd join solicitud_tipodoc st on (sd.id_tipodoc = st.id_tipodoc) where sd.id_solicitud = $1 
    `,
      [id_solicitud]
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = solicitudDocumentoCtr;
