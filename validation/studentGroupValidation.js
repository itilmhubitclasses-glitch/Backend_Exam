const Joi = require("joi");

const createStudentGroup13ValidationSchema = Joi.object({
  student_id: Joi.string().required().trim(),
  group_id: Joi.string().required().trim(),
});

const updateStudentGroup13ValidationSchema = Joi.object({
  student_id: Joi.string().optional().trim(),
  group_id: Joi.string().optional().trim(),
});

module.exports = {
  createStudentGroup13ValidationSchema,
  updateStudentGroup13ValidationSchema,
};