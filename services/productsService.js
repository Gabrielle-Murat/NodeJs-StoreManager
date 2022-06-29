const Products = require('../models/productsModel');

// requisito 1

const getProducts = async () => {
  const productsList = await Products.getProducts();

  return productsList;
};

module.exports = {
  getProducts,
};
