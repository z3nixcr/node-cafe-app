const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"]
    // enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
});


module.exports = model('Rol', RoleSchema);