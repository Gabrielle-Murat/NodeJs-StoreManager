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

module.exports = {
  getProducts,
  getProductById,
};
