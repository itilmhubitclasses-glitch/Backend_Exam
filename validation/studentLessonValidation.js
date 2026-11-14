const Joi = require("joi");

const createStudentLesson14ValidationSchema = Joi.object({
  lesson_id: Joi.string().required().trim(),
  student_id: Joi.string().required().trim(),
  is_there: Joi.boolean().optional(),
  reason: Joi.string().optional().allow("").trim(),
  be_paid: Joi.boolean().optional(),
});

const updateStudentLesson14ValidationSchema = Joi.object({
  lesson_id: Joi.string().optional().trim(),
  student_id: Joi.string().optional().trim(),
  is_there: Joi.boolean().optional(),
  reason: Joi.string().optional().allow("").trim(),
  be_paid: Joi.boolean().optional(),
});

module.exports = {
  createStudentLesson14ValidationSchema,
  updateStudentLesson14ValidationSchema,
};