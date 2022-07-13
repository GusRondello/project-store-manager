const Joi = require('joi');

const validateBody = (req, res, next) => {
  const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required().messages({ 'any.required': '"productId" is required' }),
    quantity: Joi.number().greater(0).required().messages({
      'number.greater': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
  }));
  const { error } = schema.validate(req.body);
  if (error) {
    if (error.details[0].type.includes('.greater')) {
      return res.status(422).json({ message: error.details[0].message });
    }
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateBody };