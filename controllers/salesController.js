const Sales = require('../services/salesService');

// requisito 08

const getSales = async (req, res) => {
  const salesList = await Sales.getSales();

  if (!salesList) return res.status(404).json({ message: 'No sales found' });

  return res.status(200).json(salesList);
};

module.exports = {
  getSales,
};
