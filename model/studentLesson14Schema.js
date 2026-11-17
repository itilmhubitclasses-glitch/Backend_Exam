const { Schema, model } = require("mongoose");

const {Student} = require("./studentsSchema")
const {Lesson} = require("./lessonSchema")

const studentLesson14Schema = new Schema({
  lesson_id: { type: Schema.Types.ObjectId, ref: Lesson, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: Student, required: true },
  is_there: { type: Boolean, default: false },
  reason: { type: String, default: "", trim: true },
  be_paid: { type: Boolean, default: false },
});

const StudentLesson14 = model("student_lesson14", studentLesson14Schema);
module.exports = { StudentLesson14 };