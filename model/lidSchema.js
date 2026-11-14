const { Schema, model } = require("mongoose");

const lidSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  lid_stage_id: { type: Number, required: true },
  test_date: { type: String },
  trial_lesson_date: { type: String },
  trial_lesson_time: { type: String },
  trial_lesson_group_id: { type: Number },
  lid_status_id: { type: Number },
  cancel_reason_id: { type: Number },
});

const Lid = model("lid", lidSchema);
module.exports = { Lid };