const Sales = require('../models/salesModel');

// requisito 08

const getSales = async () => {
  const salesList = await Sales.getSales();

  return salesList;
};

const getSalesById = async (id) => {
  const sales = await Sales.getSalesById(id);

  return sales;
};

module.exports = {
  getSales,
  getSalesById,
};
