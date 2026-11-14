const { Schema, model } = require("mongoose");

const reason_lid = new Schema({
  reason_lid: { type: String, required: true},
});

const Reason_lid = model("reason_lid", reason_lid);
module.exports = { Reason_lid };
