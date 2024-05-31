const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = (req, res = response) => {
  const { query, nombre, apikey } = req.query;
  res.json({
    msg: "Get API - Controller",
    query,
    nombre,
    apikey,
  });
};

const usersPut = async(req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...rest } = req.body;

  // TODO: Validar contra base de datos
  if (password) {
    // Encriptar password
    rest.password = bcryptjs.hashSync(password, 10);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.status(201).json({
    msg: "Put API - Controller",
    user,
  });
};

const usersPost = async(req, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  const user = new User({nombre, correo, password, rol});

  // Encriptar la contraseña
  user.password = bcryptjs.hashSync(password, 10);

  // Guardar el usuario en la base de datos
  await user.save();

  res.status(201).json({
    msg: "Post API - Controller",
    user
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "Delete API - Controller",
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "Patch API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
};
