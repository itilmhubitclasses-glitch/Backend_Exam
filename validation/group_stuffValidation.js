const Joi = require("joi");

const createGroupStuff7ValidationSchema = Joi.object({
  group_id: Joi.string().required().trim(),
  stuff_id: Joi.string().required().trim(),
});

const updateGroupStuff7ValidationSchema = Joi.object({
  group_id: Joi.string().optional().trim(),
  stuff_id: Joi.string().optional().trim(),
});

module.exports = {
  createGroupStuff7ValidationSchema,
  updateGroupStuff7ValidationSchema,
}