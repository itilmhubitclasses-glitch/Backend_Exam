const Joi = require("joi");

const createStatus9ValidationSchema = Joi.object({
  status: Joi.string().required().trim(),
});

const updateStatus9ValidationSchema = Joi.object({
  status: Joi.string().optional().trim(),
});

module.exports = {
  createStatus9ValidationSchema,
  updateStatus9ValidationSchema,
};
