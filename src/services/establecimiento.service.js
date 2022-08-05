const pool = require("../database");

class EstablecimientoService {
  async insertEstablecimiento(data) {
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
    } = data;

    const { rows } = await pool.query(
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

    return rows[0].id_establecimiento;
  }

  async insertPisosEstablecimiento(data) {
    const { pisos, id_establecimiento } = data;

    const { rowCount } = await pool.query(
      this.getQueryPisos(pisos.length),
      pisos
        .map((e, i) => [id_establecimiento, i + 1, e])
        .join()
        .split(",")
        .map((e) => parseInt(e))
    );
    return rowCount;
  }
  getQueryPisos = (n) => {
    let query = `insert into establecimiento_pisos (id_establecimiento,piso,m2) values ($1,$2,$3)`;
    let c = 4;

    for (let i = 2; i <= n; i++) {
      query += `, ($${c},$${++c},$${++c})`;
      c++;
    }
    return query;
  };
}

module.exports = EstablecimientoService;
