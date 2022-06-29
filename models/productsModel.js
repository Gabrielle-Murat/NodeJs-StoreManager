const connection = require('./connection');

// requisito 1

const getProducts = async () => {
  const productsQuery = `
    SELECT * FROM StoreManager.products
  `;

  const [productsList] = await connection.execute(productsQuery);

  return productsList;
};

module.exports = {
  getProducts,
};
