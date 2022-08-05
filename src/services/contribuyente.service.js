const pool = require("../database");

class ContribuyenteService {
  constructor() {}
  async insertContribuyente(data) {
    const {
      tipoContribuyente,
      ruc,
      razonSocial,
      provincia,
      departamento,
      distrito,
      direccion,
      telefono,
      email,
      regimenTributario,
    } = data;
    const { rows } = await pool.query(
      `insert into contribuyente (tipo_contribuyente, ruc, razon_social, direccion, 
                      distrito, provincia, departamento, reg_tributario, correo, telefono)
                      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id_contribuyente;`,
      [
        tipoContribuyente,
        ruc,
        razonSocial,
        direccion,
        distrito,
        provincia,
        departamento,
        regimenTributario,
        email,
        telefono,
      ]
    );

    return rows[0].id_contribuyente;
  }
}

module.exports = ContribuyenteService;
