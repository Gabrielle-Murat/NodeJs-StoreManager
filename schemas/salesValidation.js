const Joi = require('joi');

module.exports = Joi.array().items(
  Joi.object({
    productId: Joi.number()
      .required()
      .messages({
        'any.required': '400|"productId" is required',
        'number.base': '422|"productId" must be a number',
      }),
    
    quantity: Joi.number()
      .min(1)
      .required()
      .messages({
        'any.required': '400|"quantity" is required',
        'number.base': '422|"quantity" must be a number',
        'number.min': '422|"quantity" must be greater than or equal to 1',
      }),
  }),
);