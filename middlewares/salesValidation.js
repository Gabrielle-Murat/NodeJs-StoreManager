const salesData = require('../schemas/salesValidation');

function salesValidation(req, res, next) {
  const { error } = salesData.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

module.exports = salesValidation;
