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

// requisito 06

const createSale = async (req, res) => {
  const saleArray = req.body;

  const newSale = await Sales.createSale(saleArray);

  if (newSale === 'not found') return res.status(404).json({ message: 'Product not found' });

  return res.status(201).json(newSale);
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};
