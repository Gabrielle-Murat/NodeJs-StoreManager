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

module.exports = {
  getSales,
  getSalesById,
};
