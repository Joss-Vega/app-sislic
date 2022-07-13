const pool = require("../database");
const axios = require("axios").default;
const captcha = require("svg-captcha")

// const helpers = require('../libs/helpers');

//insertar datos en el contribuyente
const contribuyenteCtr = {};

//Insertar datos contribuyentes

contribuyenteCtr.insertContribuyente = async (req, res) => {
  try {
    const {
      tipo_contribuyente,
      ruc,
      razon_social,
      direccion,
      distrito,
      provincia,
      departamento,
      reg_tributario,
      correo,
      telefono,
    } = req.body;
    const response = await pool.query(
      `insert into contribuyente (tipo_contribuyente, ruc, razon_social, direccion, 
                distrito, provincia, departamento, reg_tributario, correo, telefono)
                values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id_contribuyente;`,
      [
        tipo_contribuyente,
        ruc,
        razon_social,
        direccion,
        distrito,
        provincia,
        departamento,
        reg_tributario,
        correo,
        telefono,
      ]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error...!");
  }
};

contribuyenteCtr.getContibruyenteFromAPI = async (req, res, next) => {
  try {
    const apiToken = "apis-token-2453.xHyiLPDJvNLNTnnNwg0wB5bY7Le3NFmh";

    const { ruc } = req.params;
    if (!ruc || ruc.length < 11) {
      throw new Error("El RUC debe tener 11 digitos");
    }

    const response = await axios.get(
      `https://api.apis.net.pe/v1/ruc?numero=${ruc}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const { nombre, direccion, distrito, provincia, departamento } =
      await response.data;

    return res
      .status(200)
      .json({ nombre, direccion, distrito, provincia, departamento });
  } catch (e) {
    next(e);
  }
};

contribuyenteCtr.getCaptcha = async (req, res, next) => {
  try {
    const createdCaptcha = captcha.create()
    console.log(createdCaptcha.text)
    
    res.json(createdCaptcha)
  } catch (e) {
    next(e);
  }
};
module.exports = contribuyenteCtr;
