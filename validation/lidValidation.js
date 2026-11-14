const Joi = require("joi");

const createLidValidationSchema = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string()
    .required()
    .pattern(/^\+998\d{9}$/),
  lid_stage_id: Joi.number().required(),
  test_date: Joi.string().optional(),
  trial_lesson_date: Joi.string().optional(),
  trial_lesson_time: Joi.string().optional(),
  trial_lesson_group_id: Joi.number().optional(),
  lid_status_id: Joi.number().optional(),
  cancel_reason_id: Joi.number().optional(),
});

const updateLidValidationSchema = Joi.object({
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).optional(),
  test_date: Joi.string().optional(),
  trial_lesson_date: Joi.string().optional(),
  trial_lesson_time: Joi.string().optional(),

});

module.exports = {
  createLidValidationSchema,
  updateLidValidationSchema,
};