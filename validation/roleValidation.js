const Joi = require("joi");

const createRoleValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
});

const updateRoleValidationSchema = Joi.object({
  name: Joi.string().optional().trim(),
});

module.exports = {
  createRoleValidationSchema,
  updateRoleValidationSchema,
};
