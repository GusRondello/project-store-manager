const Joi = require('joi');
// https://softchris.github.io/pages/joi.html#introducing-joi

const validateBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    if (error.details[0].type.includes('.min')) {
      res.status(422);
      return res.json({
        message: error.details[0].message,
      });
    }
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = { validateBody };