const connection = require('./connection');

// requisito 1

const getProducts = async () => {
  const productsQuery = `
    SELECT * FROM StoreManager.products
  `;

  const [productsList] = await connection.execute(productsQuery);

  return productsList;
};

const getProductById = async (id) => {
  const productIdQuery = `
    SELECT * FROM StoreManager.products AS prod WHERE id = ? ORDER BY id;
  `;

  const [productsArray] = await connection.execute(productIdQuery, [id]);

  // if (productsArray.length === 0) return null;
  return productsArray[0];
};

// requisito 3

const createProduct = async (productName) => {
  const createProductQuery = `
    INSERT INTO StoreManager.products (name) VALUES (?);
  `;

  const [products] = await connection.execute(createProductQuery, [productName]);

  return { id: products.insertId, name: productName };
};

// requisito 10

const updateProduct = async (productName, productId) => {
  const updateProductQuery = `
    UPDATE StoreManager.products SET name = ? WHERE id = ?;
  `;

  await connection.execute(updateProductQuery, [productName, productId]);

  return { id: productId, name: productName };
};

// requisito 12

const deleteProduct = async (productId) => {
  const deleteProductQuery = `
    DELETE FROM StoreManager.products WHERE id = ?;
  `;

  await connection.execute(deleteProductQuery, [productId]);
};

// requisito 18

const getProductByTerm = async (queryTerm) => {
  const getProductByTermQuery = `
    SELECT * FROM StoreManager.products
    WHERE name LIKE CONCAT('%', ?, '%');
  `;

  const [productsList] = await connection.execute(getProductByTermQuery, [queryTerm]);

  return productsList;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByTerm,
};
