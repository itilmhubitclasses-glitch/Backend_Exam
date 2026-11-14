const { Schema, model } = require("mongoose");

const {Lid} = require("./lidSchema")

const studentSchema = new Schema({
  lid_id: { type: Schema.Types.ObjectId, ref: Lid, default: null },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  birthday: { type: String },
  gender: { type: String },
});

const Student = model("student", studentSchema);

module.exports = { Student };
