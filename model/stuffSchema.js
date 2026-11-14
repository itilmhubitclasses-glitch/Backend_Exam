const { Schema, model } = require("mongoose");

const stuffSchema = new Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  login: { type: String, required: true, unique: true, trim: true },
  parol: { type: String, required: true },
  is_active: { type: String, required: true },
});
const Stuff = model("stuff", stuffSchema);
module.exports = { Stuff };