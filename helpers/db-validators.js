const Rol = require("../models/rol");
const User = require("../models/user");

const isValidRol = async (rol = "") => {
  const validRol = await Rol.findOne({ rol });

  if (!validRol) {
    throw new Error(`El rol ${rol} no está registrado`);
  }
};

const emailExists = async (correo = "") => {
  const userEmail = await User.findOne({ correo }).select("correo");
  if (userEmail) {
    throw new Error(`El correo ${userEmail.correo} ya existe`);
  }
};

const isValidUserId = async (id = "") => {
  const validId = await User.findById(id);
  if (!validId) {
    throw new Error(`El id ${id} no está registrado`);
  }
}

module.exports = {
  isValidRol,
  emailExists,
  isValidUserId
};
