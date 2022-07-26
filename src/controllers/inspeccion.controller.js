const pool = require('../database')
// const helpers = require('../libs/helpers');

//Inspeccionar pagos registrados
const inspeccionCtr = {}

//Ingreso de pagos registrados
inspeccionCtr.insertInspeccion = async (req, res) => {
    try {
        const { id_solicitud, id_establecimiento, comentario, inspeccion, id_usuarioreg } = req.body;
        const response = await pool.query(
            `insert into inspeccion (id_solicitud, id_establecimiento, comentario, link_file, fecha_registro,id_usuarioreg)
                values ($1,$2,$3,$4,now(),$5) returning id_inspeccion;` ,
            [id_solicitud, id_establecimiento, comentario, inspeccion, id_usuarioreg]
        );
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

module.exports = inspeccionCtr