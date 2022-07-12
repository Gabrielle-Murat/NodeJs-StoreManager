const connection = require('./connection');

// conversão de snake_case para camel_case, course dia 23.1
const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  productId: saleData.product_id,
  quantity: saleData.quantity,
  date: saleData.date,
});

// requisito 08

const getSales = async () => {
  const getSalesQuery = `
    SELECT
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales AS s
        INNER JOIN
      StoreManager.sales_products AS sp ON s.id = sp.sale_id;
  `;

  const [salesList] = await connection.execute(getSalesQuery);
  
  return salesList.map(serialize);
};

const getSalesById = async (id) => {
  const salesIdQuery = `
    SELECT
      s.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales_products AS sp
        INNER JOIN
      StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE
      s.id = ?
    ORDER BY
      sp.sale_id ASC,
      sp.product_id ASC;
  `;

  const [salesArray] = await connection.execute(salesIdQuery, [id]);

  if (salesArray.length === 0) return null;
  return salesArray.map(serialize);
};

// requisito 06

const createSaleOnTableSales = async () => {
  const createSaleQuery = `
    INSERT INTO StoreManager.sales
      (date)
    VALUES
      (NOW());
  `;

  const [newSale] = await connection.execute(createSaleQuery);

  return newSale;
};

const createSaleOnTableSalesProducts = async (saleId, productId, productQuantity) => {
  const createSalesProductsQuery = `
    INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?);
  `;

  const [response] = await connection
    .execute(createSalesProductsQuery, [saleId, productId, productQuantity]);
  
  return response;
};

// requisito 14

const deleteSaleOnTableSalesProducts = async (saleId) => {
  const deleteSalesProductsQuery = `
    DELETE FROM StoreManager.sales_products WHERE sale_id = ?;
  `;

  await connection.execute(deleteSalesProductsQuery, [saleId]);
};

const deleteSaleOnTableSales = async (id) => {
  const deleteSalesQuery = `
    DELETE FROM StoreManager.sales WHERE id = ?;
  `;

  await connection.execute(deleteSalesQuery, [id]);
};

// requisito 16

const updateSale = async (productId, saleId, productQuantity) => {
  const updateSaleQuery = `
    UPDATE StoreManager.sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?;
  `;

  await connection
    .execute(updateSaleQuery, [productQuantity, saleId, productId]);
};

module.exports = {
  getSales,
  getSalesById,
  createSaleOnTableSales,
  createSaleOnTableSalesProducts,
  deleteSaleOnTableSalesProducts,
  deleteSaleOnTableSales,
  updateSale,
};
