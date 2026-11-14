const Joi = require("joi");

const createReasonlid10Validation = Joi.object({
  reasonlid: Joi.string().required().trim(),
});

const updateReasonlid10Validation = Joi.object({
  reasonlid: Joi.string().required().trim(),
});

module.exports = {
  createReasonlid10Validation,
  updateReasonlid10Validation,
};
