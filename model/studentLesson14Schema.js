const { Schema, model } = require("mongoose");

const studentLesson14Schema = new Schema({
  lesson_id: { type: Schema.Types.ObjectId, ref: "lesson8", required: true },
  student_id: { type: Schema.Types.ObjectId, ref: "student12", required: true },
  is_there: { type: Boolean, default: false },
  reason: { type: String, default: "", trim: true },
  be_paid: { type: Boolean, default: false },
});

const StudentLesson14 = model("student_lesson14", studentLesson14Schema);
module.exports = { StudentLesson14 };