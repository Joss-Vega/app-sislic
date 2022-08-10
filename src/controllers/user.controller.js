const {
  NetworkAccessProfileContext,
} = require("twilio/lib/rest/supersim/v1/networkAccessProfile");
const pool = require("../database");
const { encryptPassword, matchPassword } = require("../libs/helpers");

const userCtr = {};

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
    pool
      .query("delete from usuario where id_usuario = $1 ", [id_user])
      .then((data) => {
        return res
          .status(200)
          .json(`Usuario ${id_user} eliminado correctamente...!`);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = userCtr;
