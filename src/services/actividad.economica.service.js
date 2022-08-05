const pool = require("../database");

class ActividadEconomicaService {
  constructor() {}

  async insertActividadesEconomicas(data) {
    const { actividadesEconomicas, id_establecimiento } = data;
    console.log(id_establecimiento, actividadesEconomicas);

    const { rowCount } = await pool.query(
      this.getQueryAc(actividadesEconomicas.length),
      actividadesEconomicas
        .map((e) => [id_establecimiento, e])
        .join()
        .split(",")
    );
    return rowCount;
  }

  getQueryAc = (n) => {
    let query = `insert into establecimiento_actividad (id_establecimiento,id_acteconomico) values ($1,$2)`;
    let c = 3;
    for (let i = 2; i <= n; i++) {
      query += `, ($${c},$${++c})`;
      c++;
    }
    return query;
  };
}

module.exports = ActividadEconomicaService;
