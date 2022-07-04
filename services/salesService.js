const Sales = require('../models/salesModel');

// requisito 08

const getSales = async () => {
  const salesList = await Sales.getSales();

  return salesList;
};

module.exports = {
  getSales,
};
