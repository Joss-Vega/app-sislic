const pool = require("../database");
const { sendSolicitudCodeEmail } = require("../libs/mailer");
class SolicitudService {
  constructor() {}
  makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  async insertSolicitud(data) {
    const {
      id_contribuyente,
      id_establecimiento,
      tipoTramite,
      tipoLicencia,
      direccionNotificacion,
      distritoNotificacion,
      email,
      telefono,
    } = data;
    const codigo_solicitud = this.makeid(10);
    const { rows } = await pool.query(
      `insert into solicitud (id_contribuyente, id_establecimiento, tipotramite, tipolicencia,notif_direccion, notif_distrito, correo, telefono, anexo_02, declaracion_jurada,
                  fecha_reg, codigo_solicitud, id_solestado)
                  values ($1,$2,$3,$4,$5,$6,$7,1,1,now(),$8,1) returning id_solicitud;`,
      [
        id_contribuyente,
        id_establecimiento,
        tipoTramite,
        tipoLicencia,
        direccionNotificacion,
        distritoNotificacion,
        email,
        telefono,
        codigo_solicitud,
      ]
    );

    sendSolicitudCodeEmail(email, codigo_solicitud);

    return {
      id_solicitud: rows[0].id_solicitud,
      codigo_solicitud,
    };
  }
}
module.exports = SolicitudService;
