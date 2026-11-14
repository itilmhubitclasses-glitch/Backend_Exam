const Joi = require("joi");

const createStage4ValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
});

const updateStage4ValidationSchema = Joi.object({
  name: Joi.string().optional().trim(),
});

module.exports = {
  createStage4ValidationSchema,
  updateStage4ValidationSchema,
};