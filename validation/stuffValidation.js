const Joi = require("joi");

const createStuff2ValidationSchema = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string()
    .required()
    .pattern(/^\+998\d{9}$/),
  login: Joi.string().required().trim(),
  parol: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    ),
  is_active: Joi.boolean().optional(),
});

const updateStuff2ValidationSchema = Joi.object({
  phone_number: Joi.string()
    .optional()
    .pattern(/^\+998\d{9}$/),
  login: Joi.string().optional().trim(),
  parol: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    ),
  is_active: Joi.boolean().optional(),
});

module.exports = {
  createStuff2ValidationSchema,
  updateStuff2ValidationSchema,
};
