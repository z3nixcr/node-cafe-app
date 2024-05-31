const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

// API GET
const usersGet = async (req, res = response) => {
  const query = { estado: true };
  const { from = 0, limit = 3 } = req.query;

  const [users, total] = await Promise.all([
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    total,
    users,
  });
};

// API PUT
const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...rest } =
    req.body;

  if (password) {
    // Encriptar password
    rest.password = bcryptjs.hashSync(password, 10);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.status(201).json({
    user,
  });
};

// API POST
const usersPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  // Encriptar la contraseña
  user.password = bcryptjs.hashSync(password, 10);

  // Guardar el usuario en la base de datos
  await user.save();

  res.status(201).json({
    user,
  });
};

// API DELETE
const usersDelete = async (req, res = response) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, { estado: false }).select("nombre");

  res.json({
    msg: `${user.nombre} has been deleted`,
  });
};

// API PATCH
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
