const Products = require('../services/productsService');

// requisito 1

const getProducts = async (_req, res) => {
  const productsList = await Products.getProducts();

  if (!productsList) return res.status(404).json({ message: 'No products found' });

  return res.status(200).json(productsList);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.getProductById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

// requisito 3

const createProduct = async (req, res) => {
  const { name } = req.body;

  const product = await Products.createProduct(name);

  return res.status(201).json(product);
};

// requisito 10

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const product = await Products.updateProduct(name, id);

  if (product === 'not found') return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

// requisito 12

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Products.deleteProduct(id);

  if (product === 'not found') return res.status(404).json({ message: 'Product not found' });

  return res.status(204).end();
};

// requisito 18

const getProductByTerm = async (req, res) => {
  const { q: queryTerm } = req.query;

  const response = await Products.getProductByTerm(queryTerm);

  if (response.length === 0) return response;

  return res.status(200).json(response);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByTerm,
};
