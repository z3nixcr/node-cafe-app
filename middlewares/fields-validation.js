const { validationResult } = require("express-validator");

const fieldsValidation = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  fieldsValidation,
};
