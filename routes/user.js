const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/user");
const { check } = require("express-validator");
const { fieldsValidation } = require("../middlewares/fields-validation");
const {
  isValidRol,
  emailExists,
  isValidUserId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(isValidUserId),
    check("rol").custom(isValidRol),
    fieldsValidation,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y require mínimo de 6 caracteres"
    )
      .notEmpty()
      .isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "Rol incorrecto o no válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("correo").custom( emailExists ),
    check("rol").custom( isValidRol ),
    fieldsValidation
  ],
  usersPost
);

router.delete("/:id",[
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(isValidUserId),
  fieldsValidation
], usersDelete);

router.patch("/", usersPatch);

module.exports = router;
