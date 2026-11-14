const Joi = require("joi");

const createBranch5ValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  call_number: Joi.string().required().pattern(/^\+998\d{9}$/),
});

const updateBranch5ValidationSchema = Joi.object({
  name: Joi.string().optional().trim(),
  address: Joi.string().optional().trim(),
  call_number: Joi.string().optional().pattern(/^\+998\d{9}$/),
});

module.exports = {
  createBranch5ValidationSchema,
  updateBranch5ValidationSchema,
};