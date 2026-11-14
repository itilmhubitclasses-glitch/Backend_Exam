const { Schema, model } = require("mongoose");
const { Student } = require("./studentsSchema");
const { Group } = require("./groupSchema");

const student_groupSchema = new Schema({
  students_id: { type: Schema.Types.ObjectId, ref: Student, default: null },
  group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
});

const Student_group = model("student_group", student_groupSchema);
module.exports = { Student_group };
