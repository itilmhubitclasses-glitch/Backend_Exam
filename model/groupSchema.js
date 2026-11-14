const { Schema, model } = require("mongoose");
const { Branch } = require("./branchSchema");

const userSchema = new Schema({
  group_name: { type: String, required: true, unique: true },
  lesson_start_time: { type: String, required: true },
  lesson_continious: { type: String, default: "" },
  lesson_week_day: { type: String, default: "" },
  group_stage_idint: { type: String, default: "" },
  room_number: { type: String, default: "" },
  room_floor: { type: String, default: "" },
  branch_id: { type: Schema.Types.ObjectId, ref: Branch, default: null },
  lessons_quant: { type: String, default: "" },
  is_active: { type: Boolean },
});

const Group = model("group", userSchema);
module.exports = { Group };
