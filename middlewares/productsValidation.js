const productsData = require('../schemas/productsValidation');

function productsValidation(req, res, next) {
  const { error } = productsData.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

module.exports = productsValidation;
