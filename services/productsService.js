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

// requisito 3

const createProduct = async (productName) => {
  const product = await Products.createProduct(productName);

  return product;
};

// requisito 10

const updateProduct = async (productName, productId) => {
  const checkExistance = await Products.getProductById(productId);

  if (!checkExistance) return 'not found';

  const response = await Products.updateProduct(productName, productId);

  return response;
};

// requisito 12

const deleteProduct = async (productId) => {
  const checkExistance = await Products.getProductById(productId);

  if (!checkExistance) return 'not found';

  await Products.deleteProduct(productId);
};

// requisito 18

const getProductByTerm = async (queryTerm) => {
  const products = await Products.getProductByTerm(queryTerm);

  if (products.length === 0) return [];

  return products;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByTerm,
};
