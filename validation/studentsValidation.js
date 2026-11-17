const Joi = require("joi");

const createStudent12ValidationSchema = Joi.object({
  lid_id: Joi.string().required().trim(),
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string().required().trim(),
  birthday: Joi.alternatives().try(Joi.string().trim(), Joi.date()).required(),
  gender: Joi.string().required().trim(),
});

const updateStudent12ValidationSchema = Joi.object({
  lid_id: Joi.string().optional().trim(),
  first_name: Joi.string().optional().trim(),
  last_name: Joi.string().optional().trim(),
  phone_number: Joi.string().optional().trim(),
  birthday: Joi.alternatives().try(Joi.string().trim(), Joi.date()).optional(),
  gender: Joi.string().optional().trim(),
});

module.exports = {
  createStudent12ValidationSchema,
  updateStudent12ValidationSchema,
};