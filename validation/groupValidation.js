const Joi = require("joi");

const createGroup6ValidationSchema = Joi.object({
  group_name: Joi.string().required().trim(),
  lesson_start_time: Joi.string().required().trim(),
  lesson_continuous: Joi.string().required().trim(),
  lesson_week_day: Joi.string().required().trim(),
  group_stage_idint: Joi.number().required(),
  room_number: Joi.string().required().trim(),
  room_floor: Joi.number().required(),
  branch_id: Joi.string().required().trim(),
  lessons_quant: Joi.number().required(),
  is_active: Joi.boolean(),
});

const updateGroup6ValidationSchema = Joi.object({
  group_name: Joi.string().optional().trim(),
  lesson_start_time: Joi.string().optional().trim(),
  lesson_continuous: Joi.string().optional().trim(),
  lesson_week_day: Joi.string().optional().trim(),
  group_stage_idint: Joi.number().optional(),
  room_number: Joi.string().optional().trim(),
  room_floor: Joi.number().optional(),
  branch_id: Joi.string().optional().trim(),
  lessons_quant: Joi.number().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = {
  createGroup6ValidationSchema,
  updateGroup6ValidationSchema,
};