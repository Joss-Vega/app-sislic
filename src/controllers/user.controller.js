const {
  NetworkAccessProfileContext,
} = require("twilio/lib/rest/supersim/v1/networkAccessProfile");
const pool = require("../database");
const { encryptPassword, matchPassword } = require("../libs/helpers");

const userCtr = {};

userCtr.getAccess = async (req, res, next) => {
  try {
    const { rows } = await pool.query("select * from acceso");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

userCtr.getAccessByIdRol = async (req, res, next) => {
  try {
    const { id_rol } = req.params;

    const { rows } = await pool.query(
      "select r.id_rol, r.nombre rol, a.id_acceso , a.nombre nombre  from acceso a join rol_acceso ra on (ra.id_acceso = a.id_acceso) join rol r on (ra.id_rol = r.id_rol) where ra.id_rol = $1",
      [id_rol]
    );
    const [rol_acceso] = rows;
    res.json(
      rol_acceso
        ? {
          id_rol: rol_acceso.id_rol,
          rol: rol_acceso.rol,
          accesos: rows.map((e) => ({
            id_acceso: e.id_acceso,
            nombre: e.nombre,
          })),
        }
        : rows
    );
  } catch (error) {
    next(error);
  }
};
userCtr.createRole = async (req, res, next) => {
  try {
    const { rol, accesos } = req.body;
    console.log(accesos)
    const {
      rows: [new_rol],
    } = await pool.query(
      "insert into rol(nombre,estado,fecha_creacion) values($1,1,now()) returning id_rol",
      [rol]
    );
    const parsedAccess = accesos
      .map((e) => [new_rol.id_rol, e])
      .flat();
    const query = `insert into rol_acceso(id_rol,id_acceso) values ${parsedAccess
      .map((e, i) => {
        return (i + 1) % 2 > 0 ? `($${i + 1},` : i < parsedAccess.length - 1 ? `$${i + 1}),` : `$${i + 1})`;
      })
      .join("")}`;
    console.log(query, parsedAccess);
    const {
      rowCount
    } = await pool.query(query, parsedAccess);
    res.json({
      status: "Rol creado correctamente",
      code: rowCount,
    });
  } catch (error) {
    next(error);
  }
};

userCtr.deleteRoleById = async (req, res, next) => {
  try {
    const { id_rol } = req.params;
    await pool.query("delete from rol_acceso where id_rol = $1", [id_rol]);
    await pool.query("delete from rol where id_rol = $1", [id_rol]);

    res.status(200).json({
      status: "Rol eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

userCtr.getAccessFromRoleName = async (req, res, next) => {
  try {
    const { role } = req.user;

    const response = await pool.query(
      "SELECT a.id_acceso,a.nombre, a.ruta FROM ROL R JOIN ROL_ACCESO RA ON (R.ID_ROL = RA.ID_ROL) JOIN ACCESO A ON (A.ID_ACCESO = RA.ID_ACCESO) WHERE R.NOMBRE   =$1",
      [role]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    next(e);
  }
};

//Crear nuevos usuarios
userCtr.createUser = async (req, res, next) => {
  try {
    const { username, password, idrol } = req.body;
    const password2 = await encryptPassword(password);
    const response = await pool.query(
      "insert into usuario(usuario, clave, id_rol,fecha_creacion,estado) values($1,$2,$3,now(),1)",
      [username, password2, idrol ? idrol : 5]
    );
    return res.status(201).json({
      status: "Usuario creado",
      data: response.rows,
    });
  } catch (e) {
    return next(e);
  }
};

//Modificar los usuarios
userCtr.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from usuario where id_usuario = $1",
      [id]
    );
    if (response.rows.length != 0) {
      const { usuario, clave, id_rol } = req.body;
      const encryptedPassword = await encryptPassword(clave);
      await pool.query(
        "update usuario set usuario=$1, clave=$2,id_rol =$3 where id_usuario=$4",
        [usuario, encryptedPassword, id_rol, id]
      );
      return res.status(200).json(`Usuario ${id} modificado correctamente...!`);
    }
  } catch (e) {
    next(e);
  }
};

userCtr.getAllUsers = async (req, res, next) => {
  try {
    const response = await pool.query(
      "select id_usuario,usuario,id_rol from usuario"
    );
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

userCtr.getAllRoles = async (req, res, next) => {
  try {
    const response = await pool.query("select id_rol,nombre from rol");
    return res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

userCtr.deleteUser = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    await pool.query("delete from usuario where id_usuario = $1 ", [id_user])

    return res.json(`Usuario ${id_user} eliminado correctamente`);
  } catch (error) {
    next(error);
  }
};

module.exports = userCtr;
