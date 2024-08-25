// schema.js
const Joi = require("joi");

const requestSchema = Joi.object({
  data: Joi.array().items(Joi.string().required()).required(),
});

module.exports = { requestSchema };
