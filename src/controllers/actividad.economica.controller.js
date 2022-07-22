const pool = require("../database");
// const helpers = require('../libs/helpers');

//Actividades Economicas
const ActividadEconomicaCtr = {};

//Listar actividades Economicas
ActividadEconomicaCtr.obtener_lista_actividad_economico = async (
  req,
  res,
  next
) => {
  try {
    const response = await pool.query(
      `select * from actividad_economica order by codigo;`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

ActividadEconomicaCtr.insertActividadesEconomicas = async (req, res, next) => {
  try {
    const { actividadesEconomicas } = req.body;
    const { id_establecimiento } = req.params;
    console.log(id_establecimiento, actividadesEconomicas);
    if (actividadesEconomicas.length > 0 && id_establecimiento) {
      await pool.query(
        getQueryAc(actividadesEconomicas.length),
        actividadesEconomicas
          .map((e) => [id_establecimiento, e])
          .join()
          .split(",")
      );

     return res.json({
        message: "Actividades Economicas insertadas correctamente",
      });
    }

    throw new Error("Datos Faltantes")

  } catch (error) {
    next(error);
  }
};

const getQueryAc = (n) => {
  let query = `insert into establecimiento_actividad (id_establecimiento,id_acteconomico) values ($1,$2)`;
  let c = 3;
  for (let i = 2; i <= n; i++) {
    query += `, ($${c},$${++c})`;
    c++;
  }
  return query;
};

module.exports = ActividadEconomicaCtr;
