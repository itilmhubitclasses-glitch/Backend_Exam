const Joi = require("joi");

const createLesson8ValidationSchema = Joi.object({
  lesson_theme: Joi.string().required().trim(),
  lesson_number: Joi.number().required(),
  group_id: Joi.string().required().trim(),
  lesson_date: Joi.date().required(),
});

const updateLesson8ValidationSchema = Joi.object({
  lesson_theme: Joi.string().optional().trim(),
  lesson_number: Joi.number().optional(),
  group_id: Joi.string().optional().trim(),
  lesson_date: Joi.date().optional(),
});

module.exports = {
  createLesson8ValidationSchema,
  updateLesson8ValidationSchema,
};