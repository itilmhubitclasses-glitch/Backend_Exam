const Joi = require("joi");

const createPayment15ValidationSchema = Joi.object({
  student_id: Joi.string().required().trim(),
  payment_last_date: Joi.date().required(),
  payment_date: Joi.date().required(),
  price: Joi.number().required(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().required(),
});

const updatePayment15ValidationSchema = Joi.object({
  student_id: Joi.string().optional().trim(),
  payment_last_date: Joi.date().optional(),
  payment_date: Joi.date().optional(),
  price: Joi.number().optional(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().optional(),
});

module.exports = {
  createPayment15ValidationSchema,
  updatePayment15ValidationSchema,
};