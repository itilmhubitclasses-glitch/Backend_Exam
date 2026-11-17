const Joi = require("joi");

const createStuffRole3ValidationSchema = Joi.object({
  role_id: Joi.string().required().trim(),
  stuff_id: Joi.string().required().trim(),
});

const updateStuffRole3ValidationSchema = Joi.object({
  role_id: Joi.string().optional().trim(),
  stuff_id: Joi.string().optional().trim(),
});

module.exports = {
  createStuffRole3ValidationSchema,
  updateStuffRole3ValidationSchema,
  createStuff_role3ValidationSchema: createStuffRole3ValidationSchema,
  updateStuff_role3ValidationSchema: updateStuffRole3ValidationSchema,
};
