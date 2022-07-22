const pool = require("../database");

const establecimientoPisosCtr = {};
//insertar datos de pisos en el establecimiento
establecimientoPisosCtr.insertPisosEstablecimiento = async (req, res, next) => {
  try {
    const { pisos } = req.body;
    const { id_establecimiento } = req.params;
    console.log(
      getQueryPisos(pisos.length),
      pisos
        .map((e, i) => [id_establecimiento, i + 1, e])
        .join()
        .split(",")
        .map((e) => parseInt(e))
    );
    const response = await pool.query(
      getQueryPisos(pisos.length),
      pisos
        .map((e, i) => [id_establecimiento, i + 1, e])
        .join()
        .split(",")
        .map((e) => parseInt(e))
    );

    res.json({
      message: "Pisos guardados correctamente",
      count: response.rowCount,
    });
  } catch (error) {
    next(error);
  }
};
establecimientoPisosCtr.getPisosEstablecimiento = async (req, res) => {
  try {
    const { id_establecimiento } = req.params;
    const response = await pool.query(
      `select e.id_establecimiento,ep.piso,ep.m2 from establecimiento e join establecimiento_pisos ep on (e.id_establecimiento = ep.id_establecimiento) where e.id_establecimiento = ${id_establecimiento}`
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

establecimientoPisosCtr.DeletePisosEstablecimiento = async (req, res) => {
  try {
    const id = parseint(req.params.id);
    await pool.query("delete from establecimiento_pisos where id_piso=$1", [
      id,
    ]);

    return res
      .status(200)
      .json("Establecimiento_pisos ${id} eliminado correctamente....!");
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error....!");
  }
};

const getQueryPisos = (n) => {
  let query = `insert into establecimiento_pisos (id_establecimiento,piso,m2) values ($1,$2,$3)`;
  let c = 4;

  for (let i = 2; i <= n; i++) {
    query += `, ($${c},$${++c},$${++c})`;
    c++;
  }
  return query;
};

module.exports = establecimientoPisosCtr;
