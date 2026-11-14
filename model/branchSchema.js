const { Schema, model } = require("mongoose");

const branchSchema = new Schema({
  nameb: { type: String, required: true, trim: true },
  address: { type: String, required: true},
  call_number: { type: String, required: true, trim: true },
});

const Branch = model("branch", branchSchema);
module.exports = { Branch };
