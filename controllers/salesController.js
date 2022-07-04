const Sales = require('../services/salesService');

// requisito 08

const getSales = async (_req, res) => {
  const salesList = await Sales.getSales();

  if (!salesList) return res.status(404).json({ message: 'No sales found' });

  return res.status(200).json(salesList);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.getSalesById(id);

  if (!sales) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sales);
};

module.exports = {
  getSales,
  getSalesById,
};
