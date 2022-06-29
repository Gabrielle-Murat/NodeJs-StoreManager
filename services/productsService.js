const Products = require('../models/productsModel');

// requisito 1

const getProducts = async () => {
  const productsList = await Products.getProducts();

  return productsList;
};

const getProductById = async (id) => {
  const product = await Products.getProductById(id);

  // if (!product) return null;

  return product;
};

module.exports = {
  getProducts,
  getProductById,
};
